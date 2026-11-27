/* Expert walkthrough content: seven knowledge frames, eight board pages, and one practice entry. */
(() => {
  if(new URLSearchParams(location.search).get('course')!=='mindie')return;
  document.title='文本生成推理课程 · 沉浸式学习';
  const root='assets/images/mindie-theory/';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const knowledge=[
    ['什么是生成式AI？','生成式 AI 根据学习到的规律，基于输入生成文本、图像等内容。'],
    ['如何与生成式AI交互？','Prompt 是引导模型输出主题、形式与内容的输入。'],
    ['传统AI与生成式AI','传统 AI 偏向按预设目标执行；生成式 AI 根据提示生成新内容。'],
    ['从PGC到UGC再到生成式AI','从专业生产、用户生产走向 AI 辅助与内容生成。'],
    ['生成式AI的优势','灵活应用、辅助创新，并提升部分内容任务的效率。'],
    ['从GAN到Transformer','生成模型经历多种技术路线；Transformer 支撑大语言模型。'],
    ['变分自编码器','VAE 通过概率分布描述潜在空间，学习生成数据。']
  ];
  const boards=[
    {title:'什么是生成式AI？',lines:[
      '生成式AI（Generative Artificial Intelligence，生成式人工智能），是人工智能的一个分支，可以根据已经学习的内容生成新的内容。即当用户输入问题，生成式AI根据用户需求自动生成内容来回答问题。',
      '从广义上看，一切运用AI技术生成的内容都可视为生成式AI。',
      '从技术角度来看，生成式学习模型被用于文本、图像、语音等内容的智能生成，学术界将其定义为“生成式AI”。'
    ],diagram:'diagram-1.webp',alt:'文本生成与图像生成示意图'},
    {title:'如何与生成式AI交互？',lines:[
      '在人工智能领域，采用提示词（Prompt）与生成式AI模型交互。',
      'Prompt本身是一种用于引导用户提供输入的对话框或提示框。',
      '在生成式AI中，Prompt作为一种与大模型进行交互的输入，它可以是一个问题、一段文字描述或任何形式的文本输入，用于指导大模型生成特定类型、主题或格式的输出内容。'
    ],diagram:'diagram-2.webp',alt:'提示词进入大模型并生成内容的示意图'},
    {title:'传统AI与生成式AI',lines:[
      '传统AI：根据预定义指令或策略执行特定任务的系统。包括预设规则、训练算法、预测和模型分析。',
      '生成式AI：根据用户提示创建新内容的人工智能。包括文本生成、图像生成和代码生成。'
    ],diagram:'diagram-3.webp',alt:'传统AI与生成式AI的对照图'},
    {title:'从PGC到UGC再到生成式AI',lines:[
      'PGC，指专业生成内容，由专业的内容创作者或团队进行创作、编辑和发布的内容。起源于传统媒体时代，如报纸、杂志、电视等，在数字时代，PGC已应用到网站、应用程序、短视频和音乐等领域。',
      'UGC，指用户生成内容，由普通用户或受众参与创作、编辑和发布的内容。由Web2.0时代引起，随着社交网络和博客的出现而流行，UGC应用在社交网络、在线论坛、博客、知识共享平台等。'
    ],diagram:'diagram-4.webp',alt:'PGC、UGC、AI 协同与生成式AI的演进图'},
    {title:'生成式AI的优势',lines:[
      '高度灵活性：生成式AI具有高度灵活性，可以应用于不同的领域和场景。只要训练模型的数据足够丰富，就可以实现各种形式的生成任务。',
      '强大的创新能力：生成式AI能够从大量的数据中学习并提取有用的信息，然后在这些信息的基础上进行创新。这使得生成式AI能够产生独特的、新颖的想法和解决方案。',
      '提高效率：通过使用生成式AI，可以大大提高各种任务的自动化程度，从而提高工作效率。例如，在内容创作领域，使用生成式AI可以快速生成大量的高质量内容。'
    ],diagram:'node-5.webp',alt:'生成式AI优势原始课件截图',fullSlide:true},
    {title:'生成式AI核心技术：从GAN到Transformer',lines:[
      '生成对抗网络（GAN）在2014年提出，通过生成器和判别器之间的博弈学习，在图像生成领域取得了显著的成功。',
      'Transformer通过其强大的并行处理能力和自注意力机制，在自然语言处理和多模态生成任务中取得了突破性进展。',
      '变分自编码器和自回归模型在生成数据时通过对输入数据进行概率建模，提供了生成数据的新方式。',
      '扩散模型是一类基于概率生成模型的深度学习方法，近年来在图像生成、语音合成、文本生成等领域取得了显著的成果。'
    ],diagram:'node-6.webp',alt:'GAN、Transformer、变分自编码器和扩散模型示意图',fullSlide:true},
    {title:'变分自编码器',lines:[
      '变分自编码器（Variational Auto-Encoders，简称VAE），是由Kingma等人于2014年提出的基于变分贝叶斯推断的生成式网络结构，是自编码器的一种变体。',
      'VAE与传统自编码器通过数值的方式描述潜在空间不同，它以概率的方式描述对潜在空间的观察，将给定输入的每个潜在特征表示为概率分布。'
    ],diagram:'node-7.webp',alt:'变分自编码器及潜在属性的原始课件示意图',fullSlide:true},
    {title:'文本生成实验 · 命令示例',lines:[
      '在实验环境中，向 127.0.0.1:1025/generate 发送请求，提示词为“介绍下Qwen2-7B”，max_tokens 设置为 500。',
      '提交后在 Terminal 中检查返回的文本，并根据实验手册核验结果。'
    ],diagram:'command-example.png',alt:'MindIE 文本生成实验命令示例',fullSlide:true}
  ];
  let typing=0,currentBoardPage=0;
  const visibleBoardViewport=document.querySelector('.iv-board-viewport');
  if(visibleBoardViewport){
    const pagination=document.createElement('nav');
    pagination.className='expert-board-pagination';
    pagination.setAttribute('aria-label','白板页面');
    pagination.innerHTML='<button type="button" data-expert-board-prev aria-label="上一页白板">‹</button><span data-expert-board-page aria-live="polite">1 / 8</span><button type="button" data-expert-board-next aria-label="下一页白板">›</button>';
    const tools=document.querySelector('.iv-canvas-tools');
    const headerTools=document.createElement('div');headerTools.className='expert-canvas-controls';tools.before(headerTools);headerTools.append(pagination,tools);
    pagination.querySelector('[data-expert-board-prev]').addEventListener('click',()=>window.AscendLearning?.renderBoardPage(currentBoardPage-1));
    pagination.querySelector('[data-expert-board-next]').addEventListener('click',()=>window.AscendLearning?.renderBoardPage(currentBoardPage+1));
  }
  function showBoard(index){
    const page=Math.max(0,Math.min(boards.length-1,Number(index)||0)),data=boards[page],sections=[...document.querySelectorAll('[data-board-page]')],token=++typing;
    currentBoardPage=page;
    sections.forEach((section,i)=>{section.hidden=i!==0;section.classList.toggle('media-ready',i===0);});
    const el=sections[0];
    const markup=window.MindIEThreeBoard?.markup(page)||`<div class="expert-board-copy iv-board-selectable"><h2 data-type-text="${esc(data.title)}" aria-label="${esc(data.title)}"></h2><ul>${data.lines.map(line=>`<li data-type-text="${esc(line)}" aria-label="${esc(line)}"></li>`).join('')}</ul><figure class="expert-board-figure${data.fullSlide?' expert-board-full-slide':''}"><img src="${root+data.diagram}" alt="${esc(data.alt)}"></figure></div>`;
    el.innerHTML=markup;
    const visibleBoard=document.querySelector('.iv-board-art');if(visibleBoard)visibleBoard.innerHTML=markup;
    document.getElementById('boardPageValue').textContent=`${page+1} / ${boards.length}`;
    document.getElementById('previousBoardPage').disabled=page===0;
    document.getElementById('nextBoardPage').disabled=page===boards.length-1;
    const pagination=document.querySelector('.expert-board-pagination');
    if(pagination){pagination.querySelector('[data-expert-board-page]').textContent=`${page+1} / ${boards.length}`;pagination.querySelector('[data-expert-board-prev]').disabled=page===0;pagination.querySelector('[data-expert-board-next]').disabled=page===boards.length-1;}
    document.querySelector('.learning-anchor>span').lastChild.textContent=`板书 ${String(page+1).padStart(2,'0')} · ${data.title}`;
    document.getElementById('boardSubtitle').textContent=data.title;
    el.scrollTop=0;
    if(page<7&&window.MindIEThreeBoard){window.MindIEThreeBoard.render([el,visibleBoard].filter(Boolean),page,()=>token===typing);return;}
    const boardsToType=[el,visibleBoard].filter(Boolean),figures=boardsToType.map(board=>board.querySelector('figure'));
    figures.forEach(figure=>figure.hidden=true);
    const fill=()=>{boardsToType.forEach(board=>board.querySelectorAll('[data-type-text]').forEach(item=>item.textContent=item.dataset.typeText));figures.forEach(figure=>figure.hidden=false)};
    if(document.body.dataset.fixedView!=='board'||matchMedia('(prefers-reduced-motion: reduce)').matches){fill();return;}
    (async()=>{const texts=[data.title,...data.lines];for(let i=0;i<texts.length;i++){const targets=boardsToType.map(board=>board.querySelectorAll('[data-type-text]')[i]);for(const char of Array.from(texts[i])){if(token!==typing)return;targets.forEach(item=>item.textContent+=char);await new Promise(done=>setTimeout(done,i===0?42:13));}}if(token===typing)figures.forEach(figure=>figure.hidden=false);})();
  }
  showBoard.pageCount=boards.length;
  window.MindIERenderBoard=showBoard;
  window.AscendLearning?.renderBoardPage(0);
  new MutationObserver(()=>{if(document.body.dataset.fixedView==='board')window.AscendLearning?.renderBoardPage(currentBoardPage)}).observe(document.body,{attributes:true,attributeFilter:['data-fixed-view']});
  document.querySelectorAll('.lesson-directory-trigger strong').forEach(el=>el.textContent='文本生成推理快速入门');
  const stage=document.querySelector('#videoWorkspace .video-stage');
  const image=stage?.querySelector('img');
  const subtitle=stage?.querySelector('.teacher-subtitle');
  const playbackDuration=1120;
  const knowledgeTimes=[0,95,230,355,525,710,880];
  const nodeAt=i=>5+knowledgeTimes[i]/playbackDuration*92;
  const nearestNode=percent=>knowledgeTimes.reduce((best,_,i)=>Math.abs(nodeAt(i)-percent)<Math.abs(nodeAt(best)-percent)?i:best,0);
  let playbackSeconds=0,playbackRunning=false;
  const formatTime=seconds=>`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
  function updatePlayback(){document.querySelectorAll('[data-expert-time]').forEach(el=>el.textContent=`${formatTime(playbackSeconds)} / ${formatTime(playbackDuration)}`);document.querySelectorAll('[data-expert-play]').forEach(el=>{el.innerHTML=playbackRunning?'<svg viewBox="0 0 20 20"><path d="M6 4v12M14 4v12"/></svg>':'<svg viewBox="0 0 20 20"><path d="m6 3 11 7-11 7Z"/></svg>';el.setAttribute('aria-label',playbackRunning?'暂停':'播放');el.setAttribute('aria-pressed',String(playbackRunning));});}
  function showKnowledge(index){
    if(!image)return;
    const n=Math.max(0,Math.min(6,index));
    currentBoardPage=n;playbackSeconds=knowledgeTimes[n];updatePlayback();
    if(document.body.dataset.fixedView==='board'){window.AscendLearning?.renderBoardPage(n);if(visibleBoardViewport)visibleBoardViewport.scrollTop=0;}
    image.src=`${root}node-${n+1}.webp`;
    image.alt=`知识节点 ${n+1}：${knowledge[n][0]} · 来源于提供的课件截图`;
    if(subtitle)subtitle.textContent=`知识 ${String(n+1).padStart(2,'0')} / 07 · ${knowledge[n][0]}`;
    document.getElementById('timelineCurrentTime').textContent=`节点 ${String(n+1).padStart(2,'0')}`;
    document.getElementById('videoPlayed').style.width=`${nodeAt(n)}%`;
    const iv=document.querySelector('.iv-video-art');
    if(iv){for(const img of iv.querySelectorAll('img')){img.src=`${root}node-${n+1}.webp`;img.alt=`知识节点 ${n+1}：${knowledge[n][0]}`;img.hidden=false;}}
    const ivTime=document.querySelector('.iv-player-controls time');if(ivTime)ivTime.textContent=`${formatTime(playbackSeconds)} / ${formatTime(playbackDuration)}`;
    const cursor=document.querySelector('.iv-timeline-cursor');if(cursor){cursor.style.left=`${nodeAt(n)}%`;cursor.querySelector('small').textContent=knowledge[n][0];}
    document.querySelectorAll('[data-expert-iv-node]').forEach(button=>button.classList.toggle('is-current',Number(button.dataset.expertIvNode)===n));
  }
  showKnowledge(0);
  document.querySelector('.iv-course-name')?.replaceChildren(document.createTextNode('文本生成推理课程'));
  const ivPart=document.querySelector('.iv-part-title');if(ivPart)ivPart.textContent='Part 1. 生成式AI基础知识';
  document.querySelector('.iv-video-frame')?.setAttribute('aria-label','文本生成推理课程知识视频');
  document.querySelector('.iv-board-viewport')?.setAttribute('aria-label','生成式AI基础知识白板');
  const ivBack=document.querySelector('.iv-course-back');if(ivBack)ivBack.href='course-preview.html?course=inference';
  const experimentTitle=document.querySelector('.ex-course [data-ex-directory]');
  if(experimentTitle)experimentTitle.innerHTML='文本生成推理课程 <span class="ex-icon ex-chevron" aria-hidden="true"></span>';
  const track=document.querySelector('.mindie-glass-progress .mindie-board-track');
  const line=document.querySelector('.mindie-glass-progress .mindie-progress-line');
  if(track){
    const icon='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 6h5l2 2 2-2h5v8h-5l-2 2-2-2H3zM10 8v6"/></svg>';
    track.innerHTML='<i aria-hidden="true"></i>'+knowledge.map((k,i)=>`<button type="button" class="expert-node knowledge" style="left:${nodeAt(i)}%" data-expert-node="${i}" aria-label="知识节点 ${i+1}：${esc(k[0])}" aria-describedby="expertNodePreview">${icon}</button>`).join('')+'<button type="button" class="expert-node note" style="left:84%" data-expert-note aria-label="笔记节点：记录学习要点">✎</button><button type="button" class="expert-node practice" style="left:98%" data-expert-practice aria-label="实践节点：进入 MindIE 文本生成实验">⚑</button>';
    document.getElementById('learningNodePreview')?.remove();
    const preview=document.createElement('aside');preview.id='expertNodePreview';preview.className='expert-node-preview';preview.hidden=true;document.body.append(preview);
    const hide=()=>{preview.hidden=true};
    const place=button=>{const r=button.getBoundingClientRect();preview.style.left=`${Math.max(12,Math.min(innerWidth-320,r.left-145))}px`;preview.style.bottom=`${Math.max(85,innerHeight-r.top+10)}px`;};
    for(const button of track.querySelectorAll('[data-expert-node]')){
      const i=Number(button.dataset.expertNode);
      button.addEventListener('pointerenter',()=>{preview.innerHTML=`<img src="${root}node-${i+1}.webp" alt=""><div><strong>${esc(knowledge[i][0])}</strong><p>${esc(knowledge[i][1])}</p></div>`;preview.hidden=false;place(button)});
      button.addEventListener('focus',()=>{preview.innerHTML=`<img src="${root}node-${i+1}.webp" alt=""><div><strong>${esc(knowledge[i][0])}</strong><p>${esc(knowledge[i][1])}</p></div>`;preview.hidden=false;place(button)});
      button.addEventListener('pointerleave',hide);button.addEventListener('blur',hide);
      button.addEventListener('click',()=>{showKnowledge(i);track.querySelector('i').style.width=`${nodeAt(i)}%`;hide();window.AscendLearning?.setView('video');window.AscendLearning?.setVideoPerspective('teacher');});
    }
    track.querySelector('[data-expert-note]').addEventListener('click',()=>{window.AscendCompanion?.launch('notes')});
    track.querySelector('[data-expert-practice]').addEventListener('click',enterPractice);
    let dragging=false;
    line?.addEventListener('pointerdown',event=>{if(event.target.closest('button'))return;dragging=true;line.setPointerCapture(event.pointerId)});
    line?.addEventListener('pointerup',event=>{if(!dragging)return;dragging=false;const r=line.getBoundingClientRect(),fraction=(event.clientX-r.left)/r.width;if(fraction>=.94)enterPractice();else showKnowledge(nearestNode(fraction*100))});
  }
  const ivTimeline=document.querySelector('.iv-timeline');
  if(ivTimeline){
    ivTimeline.innerHTML=`<div class="iv-timeline-background"></div><span class="iv-timeline-duration"><button type="button" data-expert-play aria-label="播放"></button><time data-expert-time></time></span>${knowledge.map((item,i)=>`<button type="button" class="iv-node iv-node-knowledge" style="--at:${nodeAt(i)}%" data-expert-iv-node="${i}" aria-label="知识节点 ${i+1}：${esc(item[0])}"><span class="iv-node-label" ${i?'hidden':''}>知识</span><i></i><span class="iv-source iv-knowledge" aria-hidden="true"></span></button>`).join('')}<button type="button" class="iv-node iv-node-note" style="--at:84%" data-expert-iv-note aria-label="笔记：记录本节知识"><span class="iv-node-label">笔记</span><i></i><span class="iv-source iv-note" aria-hidden="true"></span></button><button type="button" class="iv-node iv-node-practice" style="--at:97%" data-expert-iv-practice aria-label="实践：进入文本生成实验"><span class="iv-node-label">实践</span><i></i><span class="iv-source iv-practice" aria-hidden="true"></span></button><span class="iv-timeline-cursor" style="left:5%"><i></i><small>${esc(knowledge[0][0])}</small></span>`;
    const nodeTrack=document.createElement('div');nodeTrack.className='expert-timeline-track';ivTimeline.append(nodeTrack);ivTimeline.querySelectorAll('.iv-node,.iv-timeline-cursor').forEach(node=>nodeTrack.append(node));
    const card=document.createElement('aside');card.className='expert-node-preview expert-iv-preview';card.hidden=true;document.body.append(card);
    const show=(button,i)=>{card.innerHTML=`<img src="${root}node-${i+1}.webp" alt=""><div><strong>${esc(knowledge[i][0])}</strong><p>${esc(knowledge[i][1])}</p></div>`;card.hidden=false;const r=button.getBoundingClientRect();card.style.left=`${Math.max(12,Math.min(innerWidth-320,r.left-145))}px`;card.style.bottom=`${Math.max(110,innerHeight-r.top+10)}px`;};
    for(const button of ivTimeline.querySelectorAll('[data-expert-iv-node]')){const i=Number(button.dataset.expertIvNode);button.addEventListener('pointerenter',()=>show(button,i));button.addEventListener('focus',()=>show(button,i));button.addEventListener('pointerleave',()=>card.hidden=true);button.addEventListener('blur',()=>card.hidden=true);button.addEventListener('click',()=>{showKnowledge(i);card.hidden=true});}
    ivTimeline.querySelector('[data-expert-iv-note]').addEventListener('click',()=>window.AscendCompanion?.launch('notes'));
    ivTimeline.querySelector('[data-expert-iv-practice]').addEventListener('click',enterPractice);
    let dragStart=null;
    ivTimeline.addEventListener('pointerdown',event=>{if(event.target.closest('[data-expert-play],.iv-timeline-duration,.expert-timeline-actions'))return;
      dragStart={x:event.clientX,onButton:!!event.target.closest('button')};
      if(!dragStart.onButton)ivTimeline.setPointerCapture(event.pointerId);
    });
    ivTimeline.addEventListener('pointerup',event=>{
      if(!dragStart)return;
      const wasDrag=Math.abs(event.clientX-dragStart.x)>8;
      const wasButton=dragStart.onButton;
      dragStart=null;
      if(wasButton&&!wasDrag)return;
      const r=nodeTrack.getBoundingClientRect(),p=(event.clientX-r.left)/r.width;
      if(p>=.94)enterPractice();
      else showKnowledge(nearestNode(p*100));
    });
    ivTimeline.addEventListener('pointercancel',()=>{dragStart=null});
  }
  document.querySelector('.iv-surface')?.addEventListener('click',event=>{const button=event.target.closest('[data-expert-play],[data-iv-play]');if(!button)return;event.preventDefault();event.stopImmediatePropagation();if(playbackSeconds>=playbackDuration)playbackSeconds=0;playbackRunning=!playbackRunning;updatePlayback();},true);
  const videoPlay=document.querySelector('[data-iv-play]');if(videoPlay){videoPlay.removeAttribute('data-iv-play');videoPlay.setAttribute('data-expert-play','');}
  const videoTime=document.querySelector('.iv-player-controls time');if(videoTime)videoTime.setAttribute('data-expert-time','');
  const legacyControls=document.querySelector('.iv-player-controls');
  if(legacyControls&&ivTimeline){
    const auxiliary=document.createElement('div');auxiliary.className='expert-timeline-actions';auxiliary.setAttribute('aria-label','播放辅助控制');
    legacyControls.querySelectorAll('[data-iv-sound],[data-iv-transcript],[data-iv-fullscreen]').forEach(button=>{const key=button.hasAttribute('data-iv-sound')?'sound':button.hasAttribute('data-iv-transcript')?'caption':'fullscreen';button.innerHTML=`<img src="assets/images/player-line/${key}.svg" alt="" width="20" height="20">`;auxiliary.append(button);});
    ivTimeline.append(auxiliary);
    legacyControls.querySelectorAll('[data-expert-play],time').forEach(el=>el.remove());
    legacyControls.hidden=true;
  }
  updatePlayback();
  setInterval(()=>{if(!playbackRunning||!['video','board'].includes(document.body.dataset.fixedView))return;const next=Math.min(playbackDuration,playbackSeconds+1),node=knowledgeTimes.reduce((found,time,i)=>next>=time?i:found,0);if(node!==currentBoardPage)showKnowledge(node);playbackSeconds=next;if(next===playbackDuration)playbackRunning=false;updatePlayback();},1000);
  function enterPractice(){
    window.AscendLearning?.setView('experiment');
    window.MindIEPromptLab?.preview();
    const input=document.getElementById('uacQuestion');
    if(input){input.value='';}
  }
  const sampleText=`介绍下Qwen2-7B 的参数和功能特点。
Qwen2-7B是一款基于GPT-2模型的大型语言模型，具有以下参数和功能特点：
参数：
- 7B参数量，即模型参数数量为76亿个。
- 12层Transformer编码器，每个编码器包含12个注意力头。
- 16个Transformer解码器，每个解码器包含16个注意力头。
- 16个Transformer编码器和解码器的隐藏层大小为1024。
- 16个Transformer编码器和解码器的头数为16。
- 16个Transformer编码器和解码器的注意力大小为128。
- 16个Transformer编码器和解码器的前馈神经网络大小为4096。
- 16个Transformer编码器和解码器的dropout率为0.1。
- 16个Transformer编码器和解码器的激活函数为GELU。
功能特点：
- 支持自然语言处理任务，如文本生成、文本分类、问答系统等。
- 支持多语言处理，包括中文、英文、法语、德语、西班牙语等。
- 支持对话系统，可以与用户进行自然语言交互。
- 支持知识图谱，可以处理结构化数据和非结构化数据。
- 支持多模态处理，可以处理图像、音频、视频等多媒体数据。
- 支持分布式训练，可以利用多台机器进行大规模训练。
- 支持模型压缩和剪枝，可以减小模型大小和计算量。
- 支持模型微调和迁移学习，可以针对特定任务进行优化。`;
  const sampleResponse=JSON.stringify([{text:sampleText}]);
  const code=window.MindIELab?.steps?.[7]?.code;
  window.MindIEExpertSample={code,response:sampleResponse};
  let commandPlaced=false;
  let pendingCommand=false;
  let terminalFixture=null;
  function showExperimentTerminal(fixture=terminalFixture||window.MindIEExpertSample,options={}){
    if(!fixture?.code)return;
    commandPlaced=true;
    terminalFixture=fixture;
    if(options.pending!==undefined)pendingCommand=options.pending;
    const surface=document.querySelector('.ex-surface');
    const tab=surface?.querySelector('[data-ex-console="Terminal"]');
    const output=surface?.querySelector('.ex-console-content');
    if(!tab||!output)return;
    surface.querySelectorAll('[data-ex-console]').forEach(button=>{const selected=button===tab;button.classList.toggle('active',selected);button.setAttribute('aria-selected',String(selected));});
    output.tabIndex=0;
    output.setAttribute('aria-label','实验终端，敲击回车显示结果');
    output.innerHTML=`<div class="expert-terminal-session"><pre class="expert-terminal-command"><span class="expert-terminal-prompt">mindie@lab:~$</span> ${esc(fixture.code)}</pre>${pendingCommand?'<p class="expert-terminal-enter-hint">敲击回车显示结果 <span aria-hidden="true">↵</span></p>':`<pre class="expert-terminal-response"><span class="expert-terminal-output-label">output 结果</span> ${esc(fixture.response)}</pre>`}</div>`;
    requestAnimationFrame(()=>{output.scrollTop=pendingCommand?0:output.querySelector('.expert-terminal-command')?.offsetHeight||0;if(pendingCommand)output.focus({preventScroll:true});});
  }
  document.querySelector('.ex-console-content')?.addEventListener('keydown',event=>{
    if(event.key!=='Enter'||!pendingCommand||event.isComposing)return;
    event.preventDefault();event.stopPropagation();pendingCommand=false;showExperimentTerminal();
  });

  window.MindIEExpertShowTerminal=showExperimentTerminal;
  document.querySelector('.ex-surface')?.addEventListener('click',event=>{if(commandPlaced&&event.target.closest('[data-ex-console="Terminal"]'))queueMicrotask(()=>showExperimentTerminal());});
  // Direct IDE links use the same ready-to-send entry as the practice node.
  if(new URLSearchParams(location.search).get('mode')==='ide')enterPractice();
})();
