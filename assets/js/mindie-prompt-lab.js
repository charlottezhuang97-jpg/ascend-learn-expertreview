/* Prompt-driven MindIE lab card. The progress is a visual demo, not a host operation. */
(() => {
  if (!location.pathname.endsWith('/learn.html') || new URLSearchParams(location.search).get('course') !== 'mindie') return;
  const assistant = window.AscendCompanion;
  const panel = document.getElementById('unifiedCompanion');
  if (!assistant || !panel) return;

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL('../css/mindie-prompt-lab.css?v=3', document.currentScript.src).href;
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

  function card(id, phase) {
    return `<section class="mindie-prompt-lab" data-mindie-prompt-lab="${id}" aria-label="MindIE 文本生成实验进度">
      <h3>MindIE 文本生成实验</h3>
      <div class="mindie-prompt-lab-card"><div class="mindie-prompt-lab-heading"><span aria-hidden="true">⌘</span><b>实验 1 - 基于 MindIE 文本生成实验</b><span aria-hidden="true">⌃</span></div>
      <ol>${steps.map((label, index) => {
        const state = index < phase ? 'done' : index === phase && phase < 3 ? 'loading' : 'waiting';
        const icon = state === 'done' ? check : state === 'loading' ? loading : waiting;
        return `<li class="${state}" aria-label="${label}：${state === 'done' ? '演示完成' : state === 'loading' ? '正在准备' : '待开始'}"><span class="mindie-prompt-lab-status">${icon}</span><span class="mindie-prompt-lab-label">${label}</span><span class="mindie-prompt-lab-chevron" aria-hidden="true">›</span></li>`;
      }).join('')}</ol>
      ${phase >= 2 ? `<div class="mindie-prompt-lab-detail"><p><b>实验目标：</b><br>向执行请求所在实验环境的 127.0.0.1:1025/generate 发一次请求。</p><p><b>执行要点：</b><br>1、确认提示词与生成参数<br>2、发送一次请求<br>3、展示文本与检查响应</p><div class="mindie-prompt-acceptance"><b>达标结果</b><p>您能看到一段介绍Qwen2-7B功能的文字，它常以“介绍下Qwen2-7B 的参数和功能特点。Qwen2-7B是一款基于GPT-2模型的大型语言模型，具有以下参数和功能特点”开头。即为实验<strong class="mindie-success-word">成功</strong>。</p></div><div class="mindie-prompt-command-head"><b>命令示例：</b><button type="button" data-mindie-insert-command>一键置入</button></div><pre>${esc(window.MindIELab?.steps?.[7]?.code||'')}</pre></div>` : ''}
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

  panel.addEventListener('click',event=>{
    const button=event.target.closest('[data-mindie-insert-command]');if(!button)return;
    const fixture=window.MindIEExpertSample;
    if(!fixture)return;
    document.querySelector('.ide-tabs [data-mindie-step="7"]')?.click();
    window.MindIETerminal?.write({id:`mindie-example-${Date.now()}`,host:'A',command:fixture.code,status:'success',output:`[文本生成推理示例 · 未发送真实请求]\n${fixture.response}`},{reveal:true});
    window.MindIEExpertShowTerminal?.(fixture);
    window.AscendLearning?.showToast('命令已置入终端示例，展示了提供的响应；未连接真实服务。');
  });
  panel.addEventListener('submit', submit, true);
})();
