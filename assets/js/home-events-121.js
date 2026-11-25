/* 方案探索121：开发者活动与日程。 */
(() => {
 const root=document.getElementById('events');if(!root)return;
 let year=2026,month=9,selected=10,kind='全部',mode='month';
 const items=[
 {day:2,title:'Ascend C 算子开发训练营',kind:'训练营',time:'2 PM–4 PM',place:'线上训练营',description:'从基础算子实现到性能分析，动手完成开发实践'},
 {day:3,title:'昇腾算力与 MindSpore 实践',kind:'活动',time:'2 PM–3:30 PM',place:'线上活动',description:'交流模型训练与昇腾开发实践'},
 {day:3,title:'训练开发认证 ACDA',kind:'认证',time:'10 AM–12 PM',place:'线上学习',description:'训练开发认证学习与实践'},
 {day:5,title:'CANN Developer Day 2026',kind:'活动',time:'2 PM–3:30 PM',place:'线下活动',description:'开发者技术分享、社区共建与现场交流'},
 {day:6,title:'MindSpore 开发者交流',kind:'训练营',time:'2 PM–4 PM',place:'线上交流',description:'模型训练与开发实践交流'},
 {day:9,title:'昇腾算力与 MindSpore 实践',kind:'活动',time:'2 PM–3:30 PM',place:'线上活动',description:'交流模型训练与昇腾开发实践'},
 {day:10,title:'CANN SIG 会议',kind:'会议',time:'9 AM–10 AM',place:'线上会议',description:'CANN 算子开发与社区议题交流'},
 {day:10,title:'CANN Developer Day 2026',kind:'活动',time:'2 PM–3:30 PM',place:'线下活动',description:'开发者技术分享、社区共建与现场交流'},
 ...[13,29].map(day=>({day,title:'CANN Developer Day 2026',kind:'活动',time:'2 PM–3:30 PM',place:'线下活动',description:'开发者技术分享、社区共建与现场交流'})),
 ...[15,18,27].map(day=>({day,title:'训练开发认证 ACDA',kind:'认证',time:'10 AM–12 PM',place:'线上学习',description:'训练开发认证学习与实践'})),
 ...[19,24].map(day=>({day,title:'MindSpore 开发者交流',kind:'训练营',time:'2 PM–4 PM',place:'线上交流',description:'模型训练与开发实践交流'}))];
 const color=k=>({'会议':'blue','活动':'green','训练营':'purple','认证':'orange'}[k]);
 const events=day=>items.filter(e=>e.day===day&&(kind==='全部'||e.kind===kind));
 root.innerHTML='<h2 id="eventsTitle">开发者活动</h2><p class="section-intro">提供面向开发者的系列技术活动，涵盖动手训练营、专家讲座与实战答疑，在实操和互动中快速进阶</p><div class="events121-layout"><aside class="events121-sidebar" aria-live="polite"></aside><section class="events121-calendar" aria-label="开发者活动日历"><header class="events121-toolbar"><div><button type="button" data-month="-1" aria-label="上个月">‹</button><strong data-month-label></strong><button type="button" data-month="1" aria-label="下个月">›</button></div><label><span class="events121-sr">活动筛选</span><select aria-label="活动筛选"><option>全部</option><option>会议</option><option>活动</option><option>训练营</option><option>认证</option></select></label><nav aria-label="日历视图"><button type="button" data-mode="week">周视图</button><button type="button" data-mode="month" aria-pressed="true">月视图</button></nav></header><div class="events121-weekdays" aria-hidden="true">'+['日','一','二','三','四','五','六'].map(d=>'<span>'+d+'</span>').join('')+'</div><div class="events121-grid"></div></section></div>';
 function render(){
  const date=new Date(year,month,selected),dayName=['周日','周一','周二','周三','周四','周五','周六'][date.getDay()],list=events(selected),todo=list.filter(e=>e.kind==='会议'||e.kind==='认证'),activities=list.filter(e=>e.kind!=='会议'&&e.kind!=='认证');
  const card=(title,data)=>`<section class="events121-side-card"><h3>${title}</h3>${data.length?data.map(e=>`<div class="events121-side-event"><span class="events121-badge ${color(e.kind)}">${e.title}</span><div class="events121-time">${e.time} <span>${e.place}</span>${e.kind==='会议'?'<button type="button" data-join>加入会议 ›</button>':''}</div><p>活动内容：　${e.description}<br>参与方式：　${e.place}<br>日程说明：　正式活动以社区公告为准。</p></div>`).join(''):'<p class="events121-empty">当日暂无安排</p>'}</section>`;
  root.querySelector('.events121-sidebar').innerHTML=`<section class="events121-side-card events121-date"><h3><span aria-hidden="true">▦</span> 日历</h3><div><strong>${selected}</strong><button type="button" data-today>今天</button></div><p>${dayName}，${month+1}月${selected}日</p><small>0 项截止</small> <small>${list.length} 个任务</small></section>${card('今日待办',todo)}${card('今日活动',activities)}<section class="events121-side-card"><h3>已完成</h3><p class="events121-empty">完成的任务会显示在这里</p></section>`;
  root.querySelector('[data-month-label]').textContent=`${year}年${month+1}月`;root.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
  const first=new Date(year,month,1).getDay(),days=new Date(year,month+1,0).getDate(),count=Math.ceil((first+days)/7)*7;let cells=[];
  const weekStart=Math.floor((first+selected-1)/7)*7;
  for(let i=0;i<count;i++){if(mode==='week'&&(i<weekStart||i>=weekStart+7))continue;const raw=i-first+1,d=new Date(year,month,raw),outside=d.getMonth()!==month,day=d.getDate();cells.push(`<button type="button" class="events121-day ${outside?'outside':''} ${!outside&&day===selected?'selected':''}" data-date="${d.getFullYear()}-${d.getMonth()}-${day}" aria-label="${d.getMonth()+1}月${day}日${outside?'':`，${events(day).length}项活动`}" aria-pressed="${!outside&&day===selected}"><span class="events121-day-number">${day}</span><div>${outside?'':events(day).map(e=>`<span class="events121-badge ${color(e.kind)}" title="${e.title} | ${e.time}">${e.title}${day===selected?' | '+e.time:''}</span>`).join('')}</div></button>`);}
  root.querySelector('.events121-grid').innerHTML=cells.join('');root.querySelector('.events121-grid').classList.toggle('week',mode==='week');
 }
 root.addEventListener('click',e=>{let b=e.target.closest('button');if(!b)return;if(b.dataset.month){const d=new Date(year,month+Number(b.dataset.month),1);year=d.getFullYear();month=d.getMonth();selected=Math.min(selected,new Date(year,month+1,0).getDate());}else if(b.dataset.date){[year,month,selected]=b.dataset.date.split('-').map(Number);}else if(b.dataset.mode){mode=b.dataset.mode;}else if(b.hasAttribute('data-today')){const d=new Date();year=d.getFullYear();month=d.getMonth();selected=d.getDate();}else if(b.hasAttribute('data-join')){b.textContent='会议入口待社区公告';return;}else return;render();});
 root.querySelector('select').addEventListener('change',e=>{kind=e.target.value;render();});render();
})();
