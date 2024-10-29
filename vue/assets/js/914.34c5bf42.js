"use strict";(self["webpackChunkbeyond_books_vue"]=self["webpackChunkbeyond_books_vue"]||[]).push([[914],{7914:(e,t,n)=>{n.r(t),n.d(t,{default:()=>P});var r=n(4048),a=n(388),s=(n(2675),n(9463),n(8706),n(1629),n(4114),n(6099),n(3500),n(641)),c=n(33),o=n(953),l=n(6278),i=n(5220),u=n(5246),d=n(6992),p=n(3019),f=n(6083);n(4423);const g={__name:"GameTag",props:{type:{type:String,default:"default",validator:function(e){return["combat","wits","story","puzzle","persuade","romance","default"].includes(e)}},size:{type:String,default:"default",validator:function(e){return["sm","default"].includes(e)}}},setup:function(e){var t={sm:"text-xs px-1.5 py-0.5 h-5",default:"text-xs px-2 py-1 h-6"},n={combat:"bg-tech-tag-combat-bg text-tech-tag-combat-text",wits:"bg-tech-tag-wits-bg text-tech-tag-wits-text",story:"bg-tech-tag-story-bg text-tech-tag-story-text",puzzle:"bg-tech-tag-puzzle-bg text-tech-tag-puzzle-text",persuade:"bg-tech-tag-persuade-bg text-tech-tag-persuade-text",romance:"bg-tech-tag-romance-bg text-tech-tag-romance-text",default:"bg-tech-tag-default-bg text-tech-tag-default-text"};return function(r,a){return(0,s.uX)(),(0,s.CE)("span",{class:(0,c.C4)(["inline-flex items-center justify-center rounded-full",[t[e.size],n[e.type]||n["default"]]])},[(0,s.RG)(r.$slots,"default")],2)}}},v=g,h=v;var k={class:"min-h-screen bg-white"},x={class:"container mx-auto px-4 py-8 max-w-4xl"},m={class:"flex items-center justify-between mb-8"},y={class:"text-2xl font-bold text-tech-primary"},w={class:"space-y-8"},b={class:"text-xl font-semibold text-tech-secondary border-b pb-2"},L={class:"grid gap-4 md:grid-cols-2"},_={key:0,class:"bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200 hover:border-tech-primary transition-colors duration-300 h-full"},C={class:"flex flex-col gap-4"},z={class:"relative w-full aspect-ratio-container"},A=["src","alt"],S={class:"flex-1"},E={class:"flex items-center justify-between"},X={class:"font-medium text-gray-500"},W={class:"text-sm text-tech-primary opacity-75"},j={class:"flex flex-wrap gap-2 mt-2"},R={class:"text-sm text-gray-500 mt-2"},F={key:1,class:"bg-white rounded-lg p-4 space-y-3 border border-gray-200 hover:border-tech-primary transition-colors duration-300 shadow-sm h-full"},H={class:"flex flex-col gap-4"},M={class:"relative w-full aspect-ratio-container"},I=["src","alt"],B={class:"flex-1"},V={class:"font-medium text-tech-primary"},K={class:"flex flex-wrap gap-2 mt-2"},T={class:"text-sm text-gray-500 mt-2"},D={class:"flex gap-3"},G={key:2,class:"bg-gray-100 rounded-lg p-4 text-center text-gray-500 border border-gray-200 h-full flex flex-col justify-center"};const N=Object.assign({name:"SectionsView"},{__name:"SectionsView",setup:function(e){var t=(0,l.Pj)(),n=(0,i.rd)(),g=(0,d.s9)(),v=g.t,N=(0,s.EW)((function(){return t.state.sections.chapters})),Q=function(e){return!(e>=7)&&t.getters["sections/isSectionUnlocked"](e)},O=function(e){return!(e>=7)&&t.getters["sections/isSectionCompleted"](e)},P=function(e){return"".concat((0,p.D)()).concat(e)},U=function(){var e=(0,a.A)((0,r.A)().mark((function e(a){return(0,r.A)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.dispatch("sections/loadSection",a);case 3:n.push("/story"),e.next=10;break;case 6:e.prev=6,e.t0=e["catch"](0),console.error("加载章节失败:",e.t0),(0,u.dj)().error(v("game.loadSectionError"));case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=(0,a.A)((0,r.A)().mark((function e(a){return(0,r.A)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.dispatch("sections/loadSection",a);case 2:n.push("/story");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=function(){var e=(0,a.A)((0,r.A)().mark((function e(n){return(0,r.A)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.dispatch("sections/skipSection",n);case 2:(0,u.dj)().success(v("game.sectionSkipped"));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(){confirm(v("game.confirmReturn"))&&n.push("/")},Y=function(e){return t.getters["sections/getSectionTypeText"](e)};return(0,s.sV)((0,a.A)((0,r.A)().mark((function e(){var n;return(0,r.A)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.dispatch("save/loadSave");case 2:if(0!==N.value.length){e.next=5;break}return e.next=5,t.dispatch("sections/loadSectionsIndex");case 5:n=t.getters["save/saveData"],n.unlockedSections.length>0&&n.unlockedSections.forEach((function(e){t.dispatch("sections/unlockSection",e)}));case 7:case"end":return e.stop()}}),e)})))),function(e,t){return(0,s.uX)(),(0,s.CE)("div",k,[(0,s.Lk)("div",x,[(0,s.Lk)("div",m,[(0,s.bF)(f.A,{type:"ghost",onClick:J,class:"min-w-[120px]"},{icon:(0,s.k6)((function(){return t[0]||(t[0]=[(0,s.Lk)("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z","clip-rule":"evenodd"})],-1)])})),default:(0,s.k6)((function(){return[(0,s.eW)(" "+(0,c.v_)((0,o.R1)(v)("common.returnToMenu")),1)]})),_:1}),(0,s.Lk)("h2",y,(0,c.v_)((0,o.R1)(v)("game.chooseSection")),1)]),(0,s.Lk)("div",w,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(N.value,(function(e){return(0,s.uX)(),(0,s.CE)("div",{key:e.title,class:"bg-white rounded-lg shadow-tech p-6 space-y-4"},[(0,s.Lk)("h3",b,(0,c.v_)(e.title),1),(0,s.Lk)("div",L,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(e.sections,(function(e){return(0,s.uX)(),(0,s.CE)("div",{key:e.id,class:"relative"},[O(e.id)?((0,s.uX)(),(0,s.CE)("div",_,[(0,s.Lk)("div",C,[(0,s.Lk)("div",z,[(0,s.Lk)("img",{src:P(e.image),alt:e.title,class:"absolute inset-0 w-full h-full object-cover rounded-lg shadow-sm border border-gray-200 opacity-75"},null,8,A)]),(0,s.Lk)("div",S,[(0,s.Lk)("div",E,[(0,s.Lk)("h4",X,(0,c.v_)(e.title),1),(0,s.Lk)("span",W,(0,c.v_)((0,o.R1)(v)("game.completed")),1)]),(0,s.Lk)("div",j,[(0,s.bF)(h,{type:e.type||"default",size:"default"},{default:(0,s.k6)((function(){return[(0,s.eW)((0,c.v_)(e.type?Y(e.type):(0,o.R1)(v)("game.typeNone")),1)]})),_:2},1032,["type"]),e.tags?((0,s.uX)(!0),(0,s.CE)(s.FK,{key:0},(0,s.pI)(e.tags,(function(e){return(0,s.uX)(),(0,s.Wv)(h,{key:e,type:e,size:"sm"},{default:(0,s.k6)((function(){return[(0,s.eW)((0,c.v_)(Y(e)),1)]})),_:2},1032,["type"])})),128)):(0,s.Q3)("",!0)]),(0,s.Lk)("p",R,(0,c.v_)(e.description),1)])]),(0,s.bF)(f.A,{type:"secondary",class:"w-full min-h-[40px]",onClick:function(t){return $(e.file)}},{icon:(0,s.k6)((function(){return t[1]||(t[1]=[(0,s.Lk)("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z","clip-rule":"evenodd"})],-1)])})),default:(0,s.k6)((function(){return[(0,s.eW)(" "+(0,c.v_)((0,o.R1)(v)("game.replay")),1)]})),_:2},1032,["onClick"])])):Q(e.id)?((0,s.uX)(),(0,s.CE)("div",F,[(0,s.Lk)("div",H,[(0,s.Lk)("div",M,[(0,s.Lk)("img",{src:P(e.image),alt:e.title,class:"absolute inset-0 w-full h-full object-cover rounded-lg shadow-sm border border-gray-200"},null,8,I)]),(0,s.Lk)("div",B,[(0,s.Lk)("h4",V,(0,c.v_)(e.title),1),(0,s.Lk)("div",K,[(0,s.bF)(h,{type:e.type||"default",size:"default"},{default:(0,s.k6)((function(){return[(0,s.eW)((0,c.v_)(e.type?Y(e.type):(0,o.R1)(v)("game.typeNone")),1)]})),_:2},1032,["type"]),e.tags?((0,s.uX)(!0),(0,s.CE)(s.FK,{key:0},(0,s.pI)(e.tags,(function(e){return(0,s.uX)(),(0,s.Wv)(h,{key:e,type:e,size:"sm"},{default:(0,s.k6)((function(){return[(0,s.eW)((0,c.v_)(Y(e)),1)]})),_:2},1032,["type"])})),128)):(0,s.Q3)("",!0)]),(0,s.Lk)("p",T,(0,c.v_)(e.description),1)])]),(0,s.Lk)("div",D,[(0,s.bF)(f.A,{type:"primary",class:"flex-[2]",onClick:function(t){return U(e.file)}},{icon:(0,s.k6)((function(){return t[2]||(t[2]=[(0,s.Lk)("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1)])})),default:(0,s.k6)((function(){return[(0,s.eW)(" "+(0,c.v_)((0,o.R1)(v)("game.start")),1)]})),_:2},1032,["onClick"]),(0,s.bF)(f.A,{type:"ghost",class:"flex-1",onClick:function(t){return q(e.file)}},{icon:(0,s.k6)((function(){return t[3]||(t[3]=[(0,s.Lk)("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1)])})),default:(0,s.k6)((function(){return[(0,s.eW)(" "+(0,c.v_)((0,o.R1)(v)("game.skip")),1)]})),_:2},1032,["onClick"])])])):((0,s.uX)(),(0,s.CE)("div",G,[t[4]||(t[4]=(0,s.Lk)("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-8 w-8 mx-auto mb-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[(0,s.Lk)("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})],-1)),(0,s.eW)(" "+(0,c.v_)((0,o.R1)(v)("game.locked")),1)]))])})),128))])])})),128))])])])}}});var Q=n(6262);const O=(0,Q.A)(N,[["__scopeId","data-v-669f5d16"]]),P=O}}]);