/* Prompt-driven MindIE lab card. The progress is a visual demo, not a host operation. */
(() => {
  if (!location.pathname.endsWith('/learn.html') || new URLSearchParams(location.search).get('course') !== 'mindie') return;
  const assistant = window.AscendCompanion;
  const panel = document.getElementById('unifiedCompanion');
  if (!assistant || !panel) return;

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL('../css/mindie-prompt-lab.css?v=6', document.currentScript.src).href;
  document.head.append(stylesheet);

  const check = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="m6 16 7 7L27 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const loading = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M26 12a11 11 0 0 0-18-5M6 12a11 11 0 0 0 18 13M26 20a11 11 0 0 0 1-8M6 20a11 11 0 0 0 0-8" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>';
  const waiting = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="10" y="10" width="12" height="12" rx="3" stroke="currentColor" stroke-width="2.5"/></svg>';
  const steps = ['环境准备', '模型权重与镜像一键获取', '模型推理配置', '实验执行'];
  let activeRun = 0;
  const esc=value=>String(value??'').replace(/[&<>\"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[char]));

  function matchesPrompt(value) {
    const prompt = value.replace(/[\s，。、“”‘’!！?？]/g, '').toLowerCase();
    return prompt.includes('实验手册') && prompt.includes('逐步引导') && prompt.includes('mindie') && prompt.includes('文本生成实验');
  }

  const stepBodies=[
    `<section><h4>获取并检查实验环境</h4><p>申请 HiDevLab 算力 → 创建 CANN 环境 → 开机 → 检查主机。</p><ul><li>申请 HiDevLab 100 卡时 A3 算力</li><li>创建 CANN 环境</li><li>启动 CANN 实验环境</li><li>检查 NPU 与 Docker</li></ul><p class="lab-detail-result">环境获取与主机检查的演示完成后，可在左侧查看环境脚本。</p></section>`,
    `<section><h4>下载并上传模型权重</h4><p>下载 Qwen2-7B → 上传到 /home/lgy/Qwen2-7B/ → 查看文件清单。</p><ul><li>下载 Qwen2-7B 模型权重</li><li>上传权重到 /home/lgy/Qwen2-7B/</li><li>检查模型配置与权重文件清单</li></ul></section><section><h4>获取 MindIE 镜像</h4><p>核对历史实验镜像与设备架构；已有本地镜像可直接复用。</p><dl><dt>模型</dt><dd>Qwen2-7B</dd><dt>权重目录</dt><dd>/home/lgy/Qwen2-7B/</dd><dt>镜像处理</dt><dd>优先复用与当前设备、架构匹配的 MindIE 镜像</dd><dt>预览场景</dt><dd>正常回显</dd></dl></section>`,
    `<section><h4>启动容器</h4><p>把设备、驱动与只读权重挂载到指定容器。</p><dl><dt>容器处理方式</dt><dd>创建新容器</dd><dt>容器名</dt><dd>qwen</dd><dt>主机 NPU 编号</dt><dd>4</dd><dt>只读挂载</dt><dd>/home/lgy/Qwen2-7B/ → /home/weights/</dd><dt>实验配置说明</dt><dd>privileged 高权限与主机网络仅用于手册中的隔离实验场景。</dd><dt>预览场景</dt><dd>正常回显</dd></dl></section><section><h4>模型推理配置</h4><p>初始化当前容器会话，合并模型配置片段，保留原文件其他字段。</p><dl><dt>模型名称</dt><dd>qwen2-7b</dd><dt>模型权重路径</dt><dd>/home/weights/</dd><dt>单卡配置</dt><dd>worldSize=1</dd><dt>配置字段</dt><dd>httpsEnabled=false · trustRemoteCode=false</dd></dl></section><section><h4>启动 MindIE 服务</h4><p>沿用当前容器会话启动服务，检查服务日志与 1025 端口，随后进入实验执行。</p></section>`
  ];
  function card(id, phase) {
    return `<section class="mindie-prompt-lab" data-mindie-prompt-lab="${id}" aria-label="MindIE 文本生成实验进度">
      <h3>MindIE 文本生成实验</h3>
      <div class="mindie-prompt-lab-card"><div class="mindie-prompt-lab-heading"><span aria-hidden="true">⌘</span><b>实验 1 - 基于 MindIE 文本生成实验</b><span aria-hidden="true">⌃</span></div>
      <ol>${steps.map((label, index) => {
        const state = index < phase ? 'done' : index === phase && phase < 3 ? 'loading' : 'waiting';
        const icon = state === 'done' ? check : state === 'loading' ? loading : waiting;
        return `<li class="${state} lab-step-with-details"><details ${index===phase?'open':''}><summary aria-label="${label}：${state==='done'?'已完成':state==='loading'?'正在准备':'待开始'}"><span class="mindie-prompt-lab-status">${icon}</span><span class="mindie-prompt-lab-label">${label}</span><span class="mindie-prompt-lab-chevron" aria-hidden="true">⌄</span></summary>${index<3?`<div class="lab-step-body">${stepBodies[index]}</div>`:'<p class="lab-step-body">按下方命令示例发送文本生成请求，并核验返回结果。</p>'}</details></li>`;
      }).join('')}</ol>
      ${phase >= 2 ? `<div class="mindie-prompt-lab-detail"><p><b>实验目标：</b><br>向执行请求所在实验环境的 127.0.0.1:1025/generate 发一次请求。</p><p><b>执行要点：</b><br>1、确认提示词与生成参数<br>2、发送一次请求<br>3、展示文本与检查响应</p><div class="mindie-prompt-command-head"><b>命令示例：</b><button type="button" data-mindie-insert-command>一键置入</button></div><pre>${esc(window.MindIELab?.steps?.[7]?.code||'')}</pre><div class="mindie-prompt-acceptance"><div class="mindie-prompt-check-head"><b>达标结果</b><button type="button" data-mindie-check-result>一键检测</button></div><p>您能看到一段介绍Qwen2-7B功能的文字，它常以“介绍下Qwen2-7B 的参数和功能特点。Qwen2-7B是一款基于GPT-2模型的大型语言模型，具有以下参数和功能特点”开头。即为实验<strong class="mindie-success-word">成功</strong>。</p><p class="mindie-result-feedback" role="status" aria-live="polite" hidden></p></div></div>` : ''}
      </div>
    </section>`;
  }

  function submit(event) {
    if (event.target.id !== 'uacForm') return;
    const input = event.target.querySelector('#uacQuestion');
    const prompt = input?.value.trim() || '';
    if (!matchesPrompt(prompt)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    start(prompt);
  }

  function start(prompt='请按照实验手册逐步引导我完成 MindIE 文本生成实验') {
    window.MindIEExperimentWorkspace?.progress(-1);
    document.querySelector('.fixed1030-footer [data-fixed-view="ide"]')?.click();
    const id = String(++activeRun);
    const messageId = assistant.beginIsolatedTool(prompt, card(id, 0));
    window.MindIEExperimentWorkspace?.progress(0);
    const session = assistant.getSessionId();
    const advance = (phase, delay) => setTimeout(() => {
      if (id !== String(activeRun) || assistant.getSessionId() !== session || !panel.querySelector(`[data-mindie-prompt-lab="${id}"]`)) return;
      assistant.updateToolMessage(messageId, card(id, phase));
      window.MindIEExperimentWorkspace?.progress(phase);
    }, delay);
    advance(1, 1200);
    advance(2, 2800);
    advance(3, 4600);
  }

  window.MindIEPromptLab={start,preview:()=>{activeRun++;assistant.showHome();window.MindIEExperimentWorkspace?.progress(-1);}};

  let stopCelebration=null;
  function celebrate(){
    stopCelebration?.();
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const canvas=document.createElement('canvas');canvas.className='mindie-celebration';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
    const context=canvas.getContext('2d');if(!context){canvas.remove();return;}
    const width=innerWidth,height=innerHeight,dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=width*dpr;canvas.height=height*dpr;context.scale(dpr,dpr);
    const colors=['#6d7cff','#aa7df5','#53c8bf','#ffd166','#fa8caa'];
    const particles=Array.from({length:100},()=>({x:Math.random()*width,y:-40-Math.random()*height*.6,vx:(Math.random()-.5)*65,vy:85+Math.random()*100,size:5+Math.random()*5,angle:Math.random()*Math.PI,spin:(Math.random()-.5)*5,color:colors[Math.floor(Math.random()*colors.length)]}));
    let frame,last=performance.now(),started=last;
    const cleanup=()=>{cancelAnimationFrame(frame);canvas.remove();stopCelebration=null;};stopCelebration=cleanup;
    function draw(now){
      const delta=Math.min((now-last)/1000,.05);last=now;context.clearRect(0,0,width,height);
      const opacity=Math.min(1,(4200-(now-started))/800);
      particles.forEach(p=>{p.x+=p.vx*delta;p.y+=p.vy*delta;p.angle+=p.spin*delta;context.save();context.globalAlpha=Math.max(0,opacity);context.translate(p.x,p.y);context.rotate(p.angle);context.fillStyle=p.color;context.fillRect(-p.size/2,-p.size/4,p.size,p.size/2);context.restore();});
      if(now-started<4200)frame=requestAnimationFrame(draw);else cleanup();
    }
    frame=requestAnimationFrame(draw);
  }
  function resetExecution(root){
    stopCelebration?.();
    const step=root.closest('.mindie-prompt-lab-card')?.querySelector('ol>li:last-child');if(!step)return;
    step.classList.remove('done','loading');step.classList.add('waiting');step.querySelector('.mindie-prompt-lab-status').innerHTML=waiting;step.querySelector('summary').setAttribute('aria-label','实验执行：待核验');
  }
  function checkResult(button){
    resetExecution(button);
    const card=button.closest('.mindie-prompt-acceptance'),feedback=card.querySelector('.mindie-result-feedback');
    const output=document.querySelector('.ex-console-content .expert-terminal-response');
    feedback.hidden=false;card.removeAttribute('data-result');
    if(!output){feedback.textContent='尚未输出结果，请先一键置入命令，并在终端敲击回车。';return;}
    let text='';
    try{const copy=output.cloneNode(true);copy.querySelector('.expert-terminal-output-label')?.remove();const response=JSON.parse(copy.textContent.trim());if(Array.isArray(response))text=response.map(item=>typeof item.text==='string'?item.text:'').join('\n');}catch{}
    const passed=text.startsWith('介绍下Qwen2-7B 的参数和功能特点。')&&text.includes('Qwen2-7B')&&text.includes('参数：')&&text.includes('功能特点：');
    card.dataset.result=passed?'pass':'fail';
    feedback.textContent=passed?'检测通过，文本生成结果符合本次实验的达标要求！':'检测未通过，请检查终端是否返回完整的 Qwen2-7B 参数与功能介绍。';
    if(passed){const step=button.closest('.mindie-prompt-lab-card').querySelector('ol>li:last-child');step.classList.remove('waiting','loading');step.classList.add('done');step.querySelector('.mindie-prompt-lab-status').innerHTML=check;step.querySelector('summary').setAttribute('aria-label','实验执行：已完成');celebrate();}
  }

  panel.addEventListener('click',event=>{
    const checkButton=event.target.closest('[data-mindie-check-result]');if(checkButton){checkResult(checkButton);return;}
    const button=event.target.closest('[data-mindie-insert-command]');if(!button)return;
    resetExecution(button);
    const acceptance=button.closest('.mindie-prompt-lab-detail').querySelector('.mindie-prompt-acceptance');acceptance.removeAttribute('data-result');acceptance.querySelector('.mindie-result-feedback').hidden=true;
    const fixture=window.MindIEExpertSample;
    if(!fixture)return;
    document.querySelector('.ide-tabs [data-mindie-step="7"]')?.click();
    window.MindIEExpertShowTerminal?.(fixture,{pending:true});

  });
  panel.addEventListener('submit', submit, true);
})();
