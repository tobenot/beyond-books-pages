// reviewHandler.js

const REVIEW_KEY = "reviewRecords";
async function storeSectionReview(sectionId, conversationHistory, storyHtmlContent) {
    const section = sectionsIndex.chapters.flatMap(chapter => chapter.sections).find(sect => sect.id === sectionId);

    if (!section) {
        return;
    }

    const chapter = sectionsIndex.chapters.find(chap => chap.sections.includes(section));

    if (!chapter) {
        return;
    }

    const reviewRecord = conversationHistory.map(record => {
        const role = record.role === 'user' ? '你' : record.role === 'assistant' ? '系统' : record.role;
        return `${role}: ${record.content}`;
    }).join('\n');

    const newReview = {
        id: new Date().getTime(),
        review_title: section.title,
        chapter_title: chapter.title,
        content: storyHtmlContent,
        full_record: reviewRecord,
        timestamp: new Date().toISOString(),
        size: `${(new Blob([storyHtmlContent]).size / 1024).toFixed(2)}KB`
    };

    addReview(newReview);
}

// 读取桥段回顾记录
function loadReviews() {
    const rawReviews = localStorage.getItem(REVIEW_KEY);
    return rawReviews ? JSON.parse(rawReviews) : { reviewRecords: [] };
}

// 保存桥段回顾记录
function saveReviews(data) {
    localStorage.setItem(REVIEW_KEY, JSON.stringify(data));
}

// 新增桥段回顾记录
function addReview(record) {
    const reviews = loadReviews();
    reviews.reviewRecords.push(record);
    saveReviews(reviews);
}

// 删除桥段回顾记录
function deleteReview(id) {
    const reviews = loadReviews();
    reviews.reviewRecords = reviews.reviewRecords.filter(record => record.id !== id);
    saveReviews(reviews);
    showReviewRecords();
}

// 更新桥段回顾记录
function updateReview(id, updatedRecord) {
    const reviews = loadReviews();
    const index = reviews.reviewRecords.findIndex(record => record.id === id);
    if (index !== -1) {
        reviews.reviewRecords[index] = { ...reviews.reviewRecords[index], ...updatedRecord };
        saveReviews(reviews);
    }
}

// 显示回顾记录列表
function showReviewRecords() {
    const reviews = loadReviews();
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = `
        <h2>桥段回顾列表（纯本地存储）</h2>
        <button class="button" onclick="hideReviewRecords()">返回主菜单</button>
    `;

    if (reviews.reviewRecords.length === 0) {
        reviewContainer.innerHTML += '<p>暂无桥段回顾记录。</p>';
    } else {
        const list = document.createElement('ul');
        
        reviews.reviewRecords.slice().reverse().forEach(record => {
            const listItem = document.createElement('li');
            const localTimeString = new Date(record.timestamp).toLocaleString();
            listItem.innerHTML = `
                <span><b>${record.review_title}<br>(${localTimeString})<br>(${record.size})</b></span>
                <button class="button" onclick="renameReview(${record.id})">重命名</button>
                <button class="button" onclick="deleteReview(${record.id})">删除</button>
                <button class="button" onclick="viewReviewDetail(${record.id})">查看详情</button>
            `;
            list.appendChild(listItem);
        });
        reviewContainer.appendChild(list);
    }

    document.getElementById('menu').style.display = 'none';
    reviewContainer.style.display = 'block';
}

// 隐藏回顾记录列表
function hideReviewRecords() {
    document.getElementById('reviewContainer').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
}

// 重命名桥段回顾记录
function renameReview(id) {
    const reviews = loadReviews();
    const review = reviews.reviewRecords.find(record => record.id === id);
    if (!review) {
        alert('未找到指定的记录。');
        return;
    }

    let newTitle = prompt('请输入新的标题', review.review_title).trim();
    if (!newTitle) {
        alert('标题不能为空。');
        return;
    }
    if (newTitle.length > 128) {
        alert('标题长度不能超过128个字符。');
        return;
    }
    
    review.review_title = newTitle;
    saveReviews(reviews);
    showReviewRecords();
}

function viewReviewDetail(id) {
    const reviews = loadReviews();
    const review = reviews.reviewRecords.find(record => record.id === id);
    if (!review) return;

    const reviewDetailContainer = document.getElementById('reviewDetailContainer');
    reviewDetailContainer.innerHTML = `
        <h2>${review.review_title}</h2>
        <button class="button" onclick="hideReviewDetails()">返回回顾列表</button>
        <button class="button" onclick="exportReviewAsHTML(${id}, '${review.review_title}')">导出为HTML</button>
        <button class="button" onclick="exportReviewAsImage(${id}, '${review.review_title}')">导出为长图</button>
        <button class="button" onclick="exportReviewAsMultipleImages(${id}, '${review.review_title}')">导出为多图</button>
        <div id="reviewStoryContent">${review.content}</div>
        <div style="display: none;" id="fullRecord">${review.full_record}</div>
    `;

    document.getElementById('reviewContainer').style.display = 'none';
    reviewDetailContainer.style.display = 'block';
}

// 隐藏回顾详情页
function hideReviewDetails() {
    document.getElementById('reviewDetailContainer').style.display = 'none';
    document.getElementById('reviewContainer').style.display = 'block';
}

// 导出回顾为HTML
function exportReviewAsHTML(id, title) {
    showAlert();
    const reviews = loadReviews();
    const review = reviews.reviewRecords.find(record => record.id === id);
    if (!review) return;

    const reviewStoryContent = document.getElementById('reviewStoryContent').innerHTML;

    const updatedContent = reviewStoryContent.replace(/<img src="(.+?)"/g, (match, p1) => {
        if (p1.startsWith('http')) {
            return match;
        } else {
            const imageUrl = "https://tobenot.github.io/Beyond-Books/" + p1;
            return `<img src="${imageUrl}"`;
        }
    });

    const htmlContent = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                p { margin: 1em 0; }
                .user { color: blue; }
                .assistant { color: black; }
                .special-term { font-weight: bold; color: red; }
            </style>
        </head>
        <body>
            ${updatedContent}
            <div style="display: none;">
                ${review.full_record.replace(/\n/g, '<br>')}
            </div>
        </body>
        </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const filename = `${title.substring(0, 50)}.html`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

// 导出回顾为长图
async function exportReviewAsImage(id, title) {
    showAlert();
    const generateImage = async () => {
        const reviewStoryContent = document.getElementById('reviewStoryContent');

        const originalMaxHeight = reviewStoryContent.style.maxHeight;
        const originalOverflowY = reviewStoryContent.style.overflowY;
        reviewStoryContent.style.maxHeight = 'none';
        reviewStoryContent.style.overflowY = 'visible';

        const canvas = await html2canvas(reviewStoryContent, {
            windowWidth: reviewStoryContent.scrollWidth,
            windowHeight: reviewStoryContent.scrollHeight
        });

        const url = canvas.toDataURL('image/png');

        const filename = `${title.substring(0, 50)}.png`;

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        reviewStoryContent.style.maxHeight = originalMaxHeight;
        reviewStoryContent.style.overflowY = originalOverflowY;
    };

    if (typeof html2canvas === 'undefined') {
        try {
            await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.3.2/dist/html2canvas.min.js');
            generateImage();
        } catch (error) {
            console.log('html2canvas library failed to load', error);
        }
    } else {
        generateImage();
    }
}

async function exportReviewAsMultipleImages(id, title) {
    showAlert();

    const generateImages = async () => {
        const reviewStoryContent = document.getElementById('reviewStoryContent');

        const originalMaxHeight = reviewStoryContent.style.maxHeight;
        const originalOverflowY = reviewStoryContent.style.overflowY;
        reviewStoryContent.style.maxHeight = 'none';
        reviewStoryContent.style.overflowY = 'visible';

        const canvas = await html2canvas(reviewStoryContent, {
            useCORS: true,
            logging: true
        });

        const totalHeight = canvas.height;
        const viewportHeight = window.innerHeight;
        const images = [];

        for (let currentY = 0; currentY < totalHeight; currentY += viewportHeight) {
            const sliceCanvas = document.createElement('canvas');
            sliceCanvas.width = canvas.width;
            sliceCanvas.height = viewportHeight;

            const sliceContext = sliceCanvas.getContext('2d');
            sliceContext.drawImage(
                canvas,
                0, currentY, canvas.width, viewportHeight,
                0, 0, canvas.width, viewportHeight
            );

            const url = sliceCanvas.toDataURL('image/png');
            images.push(url);
        }

        reviewStoryContent.style.maxHeight = originalMaxHeight;
        reviewStoryContent.style.overflowY = originalOverflowY;

        for (let i = 0; i < images.length; i++) {
            const url = images[i];
            const response = await fetch(url);
            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);
    
            const filename = `${title.substring(0, 50)}_${i + 1}.png`;
            const a = document.createElement('a');
            a.href = objectURL;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
    
            URL.revokeObjectURL(objectURL);
        }
    };

    if (typeof html2canvas === 'undefined') {
        try {
            await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.3.2/dist/html2canvas.min.js');
            generateImages();
        } catch (error) {
            console.log('html2canvas library failed to load', error);
        }
    } else {
        generateImages();
    }
}

function showAlert() {
    const warningMessage = `
    注意：
    桌上剧团（跑团）中，玩家和主持人一样都是创作者。

    您正在导出游戏中的桥段记录。由于游戏中涉及的对话是由玩家输入和大语言模型生成的，开发者无法完全控制或监控所有生成的内容。如果您在正常游戏中发现任何不适当的内容，请随时与我们联系（B站私信或者找QQ群群主）。

    1. 大模型生成的内容不代表开发者的立场。
    2. 请尽量避免在对话中输入不符合设定的内容。
    
    感谢您的理解与合作，祝您游戏愉快！
    `;

    alert(warningMessage);
}