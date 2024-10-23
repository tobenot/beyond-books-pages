class GameManager {
    constructor() {
        this.moderator = null;
        this.aiPlayers = {};
        this.mainPlayer = null;
        this.currentContext = "";
        this.debugMode = isCarrotTest();
        this.concurrencyLimit = 10;
        this.semaphore = new Semaphore(this.concurrencyLimit);
        this.characterTagBase = null;
        this.playerInfo = null;
        this.turnCount = 0; // 添加回合计数器
        this.plotTriggers = [];
    }

    log(message, data = null) {
        if (this.debugMode) {
            console.log(`[DEBUG] ${message}`, data);
        }
    }

    async loadCharacterTagBase() {
        try {
            const response = await fetch('data/characterTagBase.json?v=' + new Date().getTime());
            this.characterTagBase = await response.json();
            console.log('加载角色标签库:', this.characterTagBase);
        } catch (error) {
            console.error('加载角色标签库时出错:', error);
            throw error;
        }
    }

    async initializeGame(section) {
        if (!this.characterTagBase) {
            await this.loadCharacterTagBase();
        }

        this.aiPlayers = {};
        section.characters.forEach(character => {
            if (character.isAI) {
                this.aiPlayers[character.name] = new AIPlayer(
                    character, 
                    section.commonKnowledge, 
                    section.startEvent,
                    character.sectionGuidance,
                    this.characterTagBase
                );
            } else {
                this.mainPlayer = character;
            }
        });

        this.initializePlotTriggers(section.plotTriggers);

        this.currentContext = section.backgroundInfo;
        if (!this.mainPlayer.isAI) {
            this.playerInfo = this.createPlayerInfo(this.mainPlayer);
        }
        this.moderator = new Moderator(
            section.startEvent,
            section.commonKnowledge,
            section.GMDetails,
            this.playerInfo,
            section.objective // 添加桥段目标
        );
    }

    initializePlotTriggers(triggers) {
        this.plotTriggers = triggers.map(trigger => ({
            ...trigger,
            consumed: false,
            memoryCharacter: trigger.memoryCharacter || null // 添加目标角色属性
        }));
    }

    createPlayerInfo(playerCharacter) {
        let info = `角色：${playerCharacter.name}\n`;
        info += `描述：${playerCharacter.description}\n`;
        playerCharacter.characterTags.forEach(tagKey => {
            const tagValue = this.getCharacterTag(tagKey);
            if (tagValue) {
                info += `- ${tagKey}: ${tagValue}\n`;
            }
        });
        return info;
    }

    async processMainPlayerAction(action, updateOptimizedHistoryCallback) {
        this.log("主玩家操作:", action);
        updateInteractionStage("能力", "你可以做到吗...");

        const validationResult = await this.moderator.validateAction(action);
        this.log("操作验证结果:", validationResult);
        
        if (!validationResult.isValid) {
            let feedback = `<i style="color: red;">你的行动不可行。原因：${validationResult.reason}`;
            if (validationResult.suggestion && validationResult.suggestion.trim() !== '') {
                feedback += `\n建议：${validationResult.suggestion}`;
            } else {
                feedback += '\n暂无具体建议。';
            }
            feedback += '</i>';
            this.log("操作不可行，返回反馈:", feedback);
            hideInteractionStage();
            return { feedback, isValid: false };
        }
        this.turnCount++; // 每次处理主玩家动作时增加回合计数

        const specificAction = validationResult.specificAction;
        this.log("玩家的行为:", specificAction);
        updateInteractionStage("反应", "其他人怎么想呢...");

        updateOptimizedHistoryCallback(specificAction);

        const aiResponses = await this.getAIPlayersResponses(specificAction);
        this.log("AI玩家响应:", aiResponses);
        updateInteractionStage("总结", "那么究竟是...");

        const actionSummary = await this.moderator.summarizeActions(specificAction, aiResponses, this.plotTriggers, this.turnCount);
        this.log("行动总结:", actionSummary);

        // 更新已触发的剧情触发器
        const triggeredPlots = this.updateTriggeredPlots(actionSummary.triggerChecks);

        updateInteractionStage("叙述", "好的，现在...");
        const finalResult = await this.moderator.generateFinalResult(actionSummary, specificAction, aiResponses, triggeredPlots);
        this.log("最终结果:", finalResult);

        this.updateContext(finalResult);

        if (actionSummary.endSectionFlag) {
            this.moderator.endSectionFlag = true;
        }

        hideInteractionStage();
        return { finalResult, isValid: true };
    }

    updateContext(finalResult) {
        this.currentContext += `\n${finalResult.display}`;
    }
    
    async getAIPlayersResponses(action) {
        const responsePromises = Object.entries(this.aiPlayers).map(async ([name, aiPlayer]) => {
            await this.semaphore.acquire();
            try {
                this.log(`获取 ${name} 的响应`, { action });
                const response = await aiPlayer.getResponse(action);
                return [name, response];
            } finally {
                this.semaphore.release();
            }
        });

        const responses = await Promise.all(responsePromises);
        return Object.fromEntries(responses);
    }

    getCharacterTag(key) {
        return this.characterTagBase ? this.characterTagBase[key] : null;
    }

    updateTriggeredPlots(triggerChecks) {
        const triggeredPlots = [];
        triggerChecks.forEach(check => {
            const trigger = this.plotTriggers.find(t => t.id === check.id);
            if (trigger && check.isTriggered && !trigger.consumed) {
                trigger.consumed = true;
                triggeredPlots.push(trigger);
                
                // 如果有指定目标角色，将内容添加到其私人想法中
                if (trigger.memoryCharacter && this.aiPlayers[trigger.memoryCharacter]) {
                    this.aiPlayers[trigger.memoryCharacter].addPrivateThought(trigger.content);
                }
            }
        });
        return triggeredPlots;
    }
}

class Semaphore {
    constructor(max) {
        this.max = max;
        this.count = 0;
        this.queue = [];
    }

    async acquire() {
        if (this.count < this.max) {
            this.count++;
            return Promise.resolve();
        }

        return new Promise(resolve => this.queue.push(resolve));
    }

    release() {
        this.count--;
        if (this.queue.length > 0) {
            this.count++;
            const next = this.queue.shift();
            next();
        }
    }
}

const gameManager = new GameManager();