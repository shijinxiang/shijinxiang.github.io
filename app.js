(() => {
  'use strict';
  const config = window.PORTFOLIO_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const icon = (name, extra = '') => `<svg class="icon ${extra}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const assets = ['project-workspace.svg', 'project-terminal.svg', 'project-canvas.svg','project-rag.svg','project-voiceops.svg'];
  const categories = {web:'Web 应用',tools:'开发工具',creative:'创意实验'};
  const colors = {TypeScript:'#7a9db7',JavaScript:'#d4bc5a',Python:'#7296a7',CSS:'#a993b9',HTML:'#d99e7a',Vue:'#81a682',Go:'#71b5bf',Rust:'#b58d74',Java:'#c79476','C#':'#9e8fbc',GDScript:'#79a3b5'};
  const demoProjects = [
    {id:'demo-1',name:'flow-workspace',description:'让灵感与任务各就其位。一个轻量的个人工作空间，把零散的想法变成有序的计划。',language:'TypeScript',topics:['React','TypeScript','Tailwind'],category:'web',cover:0,tint:'',featured:true},
    {id:'demo-2',name:'dev-toolbox',description:'给开发日常减一点负担。集合格式转换、文本处理与代码片段的便捷工具箱。',language:'Python',topics:['Python','CLI','Automation'],category:'tools',cover:1,tint:'cover-sand'},
    {id:'demo-3',name:'generative-playground',description:'在规则里寻找意外之美。用代码探索几何图形、色彩与生成艺术的无限可能。',language:'JavaScript',topics:['JavaScript','Canvas','Creative'],category:'creative',cover:2,tint:'cover-lilac'},
    {id:'demo-4',name:'little-weather',description:'把每天的天气变成一张小卡片。简洁直观的天气界面，让出门前的决定更轻松。',language:'Vue',topics:['Vue','API','Vite'],category:'web',cover:0,tint:'cover-blue'},
    {id:'demo-5',name:'markdown-garden',description:'一处安放文字的数字花园。专注阅读与写作，让知识在持续记录中慢慢生长。',language:'TypeScript',topics:['Next.js','MDX','CSS'],category:'web',cover:1,tint:'cover-moss'},
    {id:'demo-6',name:'palette-studio',description:'从一抹颜色开始新的灵感。探索、搭配与收藏配色，让下一个作品拥有自己的气质。',language:'CSS',topics:['CSS','Design','Color'],category:'creative',cover:2,tint:'cover-pink'},
  ].map((p, i) => ({...p,demo:true,stars:0,forks:0,updated:6-i,url:'',homepage:''}));
  let projects = [...demoProjects];
  let profile = null;
  let activeFilter = 'all';
  let toastTimer;
  let importGeneration = 0;
  const storageKey = 'code-craft-github-v1';

  function safeURL(value, githubOnly = false) {
    try { const url = new URL(value); return ['https:','http:'].includes(url.protocol) && (!githubOnly || url.hostname === 'github.com') ? url.href : ''; } catch { return ''; }
  }
  function storageRead() { try { return JSON.parse(localStorage.getItem(storageKey)); } catch { return null; } }
  function storageWrite(data) { try { localStorage.setItem(storageKey, JSON.stringify(data)); } catch { /* Preview remains usable when storage is unavailable. */ } }
  function storageClear() { try { localStorage.removeItem(storageKey); } catch { /* No stored state. */ } }
  function notify(message) { const toast = $('#toast'); toast.textContent = message; toast.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.hidden = true; }, 5000); }
  function formatCount(number) { return new Intl.NumberFormat('en', {notation:number >= 10000?'compact':'standard',maximumFractionDigits:1}).format(number); }
  function dateLabel(value) {
    const date = new Date(value); if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
  }
  function classify(repo) {
    const topics = new Set((repo.topics || []).map(topic => topic.toLowerCase()));
    const hasTopic = names => names.some(name => topics.has(name));
    if (hasTopic(['creative','generative','generative-art','art','canvas','webgl','threejs','game','p5js'])) return 'creative';
    if (hasTopic(['cli','developer-tools','automation','tool','tools','script','library','sdk','plugin','package'])) return 'tools';
    if (hasTopic(['web','react','vue','nextjs','svelte','website','frontend','dashboard','app']) || ['HTML','CSS','TypeScript','JavaScript','Vue','Svelte'].includes(repo.language)) return 'web';
    return 'tools';
  }
  function normalizeRepos(repos) {
    const hidden = (config.hiddenRepos || []).map(n => n.toLowerCase());
    const featured = (config.featuredRepos || []).map(n => n.toLowerCase());
    return repos.filter(r => !r.private && (config.includeForks || !r.fork) && !hidden.includes(r.name.toLowerCase())).map((r, i) => {
      const override = r.owner?.login?.toLowerCase() === config.githubUsername?.toLowerCase() ? config.repoOverrides?.[r.name] || {} : {};
      const category = categories[override.category] ? override.category : classify(r);
      return {id:String(r.id),name:r.name,title:override.title || r.name,description:override.description || r.description || '这个项目还没有填写介绍，点击查看仓库里的 README。',language:r.language || '',topics:(override.tags || r.topics || []).slice(0,3),category,cover:Number.isInteger(override.cover)?override.cover:category==='tools'?1:category==='creative'?2:0,tint:override.cover?'':['','cover-sand','cover-lilac','cover-blue','cover-moss','cover-pink'][i%6],featured:featured.includes(r.name.toLowerCase()),demo:false,stars:Number(r.stargazers_count)||0,forks:Number(r.forks_count)||0,updated:Date.parse(r.updated_at)||0,url:safeURL(r.html_url,true),homepage:safeURL(r.homepage),archived:!!r.archived};
    });
  }
  function cardHTML(project) {
    const title = esc(project.title || project.name);
    const open = project.demo
      ? `<button class="project-open" data-detail="${esc(project.id)}" aria-label="查看 ${title} 示例介绍">${icon('arrow')}</button>`
      : `<a class="project-open" href="${esc(project.url)}" target="_blank" rel="noopener noreferrer" aria-label="在 GitHub 查看 ${title}">${icon('arrow')}</a>`;
    const heading = project.demo ? `<button data-detail="${esc(project.id)}" style="padding:0;text-align:left;font:inherit;letter-spacing:inherit">${title}</button>` : `<a href="${esc(project.url)}" target="_blank" rel="noopener noreferrer">${title}</a>`;
    const tags = project.topics.length ? project.topics : [project.language || categories[project.category]];
    return `<article class="project-card"><div class="project-cover ${project.tint}"><img src="./assets/${assets[project.cover]}" alt="" loading="lazy" width="900" height="560">${project.featured?`<span class="cover-label">${icon('star')} 精选项目</span>`:''}<span class="demo-label">${project.demo?'示例项目':'项目示意图'}</span></div><div class="project-body"><div class="project-title-row"><h3>${heading}</h3>${open}</div>${project.title && project.title!==project.name?`<p class="project-repo-name">${esc(project.name)}</p>`:''}<p class="project-description">${esc(project.description)}</p><div class="project-tags">${tags.map(t=>`<span class="project-tag">${esc(t)}</span>`).join('')}${project.homepage?`<a class="project-demo-link" href="${esc(project.homepage)}" target="_blank" rel="noopener noreferrer">在线体验 ${icon('arrow')}</a>`:''}</div><div class="project-meta"><span class="meta-language"><span class="language-dot" style="background:${colors[project.language] || '#92ad76'}"></span>${esc(project.language || 'Code')}</span><span class="repo-numbers"><span aria-label="${project.demo?'示例无统计数据':`${project.stars} Stars`}">${icon('star')}${project.demo?'—':formatCount(project.stars)}</span><span aria-label="${project.demo?'示例无统计数据':`${project.forks} Forks`}">${icon('fork')}${project.demo?'—':formatCount(project.forks)}</span></span><span class="meta-updated">${project.demo?'示例预览':esc(dateLabel(project.updated))}</span></div></div></article>`;
  }
  function renderProjects() {
    const query = $('#projectSearch').value.trim().toLowerCase();
    const sort = $('#projectSort').value;
    const visible = projects.filter(p => (activeFilter === 'all' || p.category === activeFilter) && `${p.name} ${p.title || ''} ${p.description} ${p.language} ${p.topics.join(' ')}`.toLowerCase().includes(query));
    visible.sort((a,b) => {
      if (sort === 'stars') return b.stars-a.stars || b.updated-a.updated;
      if (sort === 'name') return a.name.localeCompare(b.name);
      const featuredOrder = (p) => p.featured ? Math.max(0,(config.featuredRepos || []).findIndex(name => name.toLowerCase() === p.name.toLowerCase())) : Infinity;
      if (a.featured !== b.featured) return Number(b.featured)-Number(a.featured);
      if (a.featured && b.featured) return featuredOrder(a)-featuredOrder(b) || b.updated-a.updated;
      return b.updated-a.updated;
    });
    $('#projectGrid').innerHTML = visible.map(cardHTML).join('');
    $('#emptyState').hidden = visible.length > 0;
    $('#allCount').textContent = projects.length;
    $('#resultsStatus').textContent = `显示 ${visible.length} 个项目`;
    $('#projectCountText').textContent = profile ? `${visible.length} / ${projects.length} 个公开项目${profile.cached?' · 已缓存':''}` : '6 个示例，等待你的真实作品';
  }
  function renderProfile() {
    const name = config.name || profile?.name || profile?.login || 'Code & Craft';
    const url = profile ? `https://github.com/${encodeURIComponent(profile.login)}` : 'https://github.com';
    ['headerGithub','allReposLink','aboutGithub','contactGithub'].forEach(id => { $(`#${id}`).href = url; });
    $('#footerName').textContent = name;
    document.title = `${name} — 开源项目作品集`;
    $('#heroEyebrow').textContent = config.eyebrow || (profile ? `${name} · 个人作品集` : '个人作品集 · 持续探索');
    const description = config.description || '';
    if (description) $('#heroDescription').textContent = description;
    $('#aboutDescription').textContent = config.about || profile?.bio || '喜欢把日常里的「如果可以」变成屏幕上的「已经实现」。这里留下一些探索，也期待它们能成为下一次灵感的起点。';
    $('#previewNotice').hidden = !!profile;
    if (!profile) $('#previewNotice').innerHTML = `<span>${icon('info','small')} 当前为示例预览，连接 GitHub 即可展示你的真实项目。</span><button data-connect>导入我的项目 ↗</button>`;
    $('#statProjects').textContent = String(projects.length).padStart(2,'0');
    $('#statProjectsLabel').textContent = profile ? '公开项目' : '示例项目';
    $('#statStars').textContent = profile ? formatCount(projects.reduce((sum,p)=>sum+p.stars,0)) : '—';
    const languages = [...new Set(projects.map(p=>p.language).filter(Boolean))];
    $('#statLanguages').textContent = String(languages.length).padStart(2,'0');
    const toolkit = profile ? config.toolkit || languages : ['TypeScript','React','Python','Vue','CSS','Git'];
    $('#techCloud').innerHTML = toolkit.length ? toolkit.slice(0,12).map((name,i)=>`<span class="tech-pill"><span>${['↗','{ }','⌘','◇','✳','⑂'][i%6]}</span>${esc(name)}</span>`).join('') : '<span class="tech-pill">新的探索，正在开始。</span>';
    const heroConnect = $('.hero-actions [data-connect]');
    if (config.githubUsername && profile) {
      if (heroConnect) heroConnect.outerHTML = `<a class="button button-text" id="heroGithub" href="${esc(url)}" target="_blank" rel="noopener noreferrer">GitHub 主页${icon('arrow')}</a>`;
      else if ($('#heroGithub')) $('#heroGithub').href = url;
    } else if (heroConnect) heroConnect.innerHTML = `${profile?'切换 GitHub':'连接 GitHub'}${icon('arrow')}`;
    $('#githubUsername').value = profile?.login || config.githubUsername || '';
    renderProjects();
  }
  function resetFilters() {
    activeFilter = 'all'; $('#projectSearch').value = ''; $('#projectSort').value = 'updated';
    document.querySelectorAll('[data-filter]').forEach(btn => { const selected = btn.dataset.filter === 'all'; btn.classList.toggle('selected',selected); btn.setAttribute('aria-pressed',String(selected)); });
    renderProjects();
  }
  function parseUsername(input) {
    let username = input.trim();
    if (/^(https?:\/\/)?(www\.)?github\.com\//i.test(username)) {
      try { const parsed = new URL(/^https?:\/\//i.test(username) ? username : `https://${username}`); if (!['github.com','www.github.com'].includes(parsed.hostname)) throw new Error(); username = parsed.pathname.split('/').filter(Boolean)[0] || ''; } catch { throw new Error('请输入有效的 GitHub 个人主页链接。'); }
    }
    if (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username) || username.includes('--')) throw new Error('用户名需为 1–39 个英文字母、数字或单个连字符。');
    return username;
  }
  async function githubFetch(path) {
    let response;
    try { response = await fetch(`https://api.github.com${path}`,{headers:{Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(18000)}); } catch { throw new Error('暂时无法连接 GitHub。请检查网络，稍后再试；当前项目会继续保留。'); }
    if (response.status === 404) throw new Error('没有找到这个 GitHub 用户，请检查用户名。');
    if (response.status === 403 || response.status === 429) throw new Error('GitHub 的公开 API 暂时达到访问上限，请稍后再试。');
    if (!response.ok) throw new Error(`GitHub 暂时无法读取（${response.status}），请稍后重试。`);
    return {data:await response.json(),hasNext:!!response.headers.get('link')?.includes('rel="next"')};
  }
  async function importGitHub(input, {silent = false} = {}) {
    const username = parseUsername(input);
    const generation = ++importGeneration;
    const button = $('#importButton'); button.disabled = true; button.textContent = '正在读取公开项目…'; $('#connectError').hidden = true;
    try {
      const encoded = encodeURIComponent(username);
      const [userResult,firstPage] = await Promise.all([githubFetch(`/users/${encoded}`),githubFetch(`/users/${encoded}/repos?sort=updated&per_page=100&page=1`)]);
      const repos = [...firstPage.data]; let hasNext = firstPage.hasNext; let page = 2;
      // Follow pagination so accounts with over 100 projects are represented accurately.
      while (hasNext && page <= 20) { const result = await githubFetch(`/users/${encoded}/repos?sort=updated&per_page=100&page=${page}`); repos.push(...result.data); hasNext=result.hasNext; page++; }
      if (hasNext) throw new Error('公开仓库超过 2000 个，请在配置文件中维护精选项目列表。当前项目保持不变。');
      if (generation !== importGeneration) return false;
      const user = userResult.data;
      profile = {login:user.login,name:user.name || user.login,bio:user.bio || '',fetchedAt:Date.now()};
      projects = normalizeRepos(repos);
      storageWrite({profile,projects}); resetFilters(); renderProfile();
      if ($('#connectDialog').open) $('#connectDialog').close();
      if (!silent) notify(`已导入 @${user.login} 的 ${projects.length} 个公开项目`);
    } catch (error) {
      if (generation !== importGeneration) return false;
      if (silent) {
        $('#previewNotice').hidden = false;
        $('#previewNotice').innerHTML = `<span>${icon('info','small')} ${esc(error.message)}${profile?' 目前展示已缓存的项目。':' 目前展示示例项目。'}</span><button data-connect>重新连接 ↗</button>`;
      } else { $('#connectError').textContent = error.message; $('#connectError').hidden = false; }
      return false;
    } finally { if (generation === importGeneration) { button.disabled = false; button.innerHTML = `导入公开项目${icon('arrow')}`; } }
    return true;
  }
  document.addEventListener('click', event => {
    const connect = event.target.closest('[data-connect]');
    if (connect) { $('#connectError').hidden = true; $('#connectDialog').showModal(); }
    const close = event.target.closest('[data-close]'); if (close) close.closest('dialog').close();
    const detail = event.target.closest('[data-detail]');
    if (detail) {
      const project = projects.find(p => p.id === detail.dataset.detail); if (!project) return;
      $('#projectDetail').innerHTML = `<p class="section-kicker">CONCEPT PREVIEW / 示例项目</p><img class="detail-cover" src="./assets/${assets[project.cover]}" alt="${esc(project.name)} 概念界面"><h2>${esc(project.name)}</h2><p class="detail-copy">${esc(project.description)}</p><div class="project-tags">${project.topics.map(t=>`<span class="project-tag">${esc(t)}</span>`).join('')}</div><p class="detail-note">这是用于展示页面布局的示例，配图为概念插画。连接你的 GitHub 后，这里会替换为真实仓库，卡片可直接打开项目源码。</p><button class="button button-dark" data-close data-open-connect>连接我的 GitHub ${icon('arrow')}</button>`;
      $('#projectDialog').showModal();
    }
    if (event.target.closest('[data-open-connect]')) $('#connectDialog').showModal();
    const filter = event.target.closest('[data-filter]');
    if (filter) {
      activeFilter = filter.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(btn => { const selected=btn===filter;btn.classList.toggle('selected',selected);btn.setAttribute('aria-pressed',String(selected)); });
      renderProjects();
    }
  });
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) { const box=dialog.getBoundingClientRect(); if (event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom) dialog.close(); } }));
  $('#projectSearch').addEventListener('input',renderProjects);
  $('#projectSort').addEventListener('change',renderProjects);
  $('#resetFilters').addEventListener('click',resetFilters);
  $('#connectForm').addEventListener('submit',async event => { event.preventDefault(); try { await importGitHub($('#githubUsername').value); } catch (error) { $('#connectError').textContent=error.message;$('#connectError').hidden=false; } });
  $('#restoreDemo').addEventListener('click',() => { ++importGeneration;$('#importButton').disabled=false;$('#importButton').innerHTML=`导入公开项目${icon('arrow')}`;profile=null;projects=[...demoProjects];storageClear();resetFilters();renderProfile();$('#connectDialog').close();notify('已恢复示例预览'); });
  $('#currentYear').textContent = new Date().getFullYear();
  // Bundled public metadata makes the personal portfolio available offline immediately.
  const snapshot = window.PORTFOLIO_SNAPSHOT;
  if (snapshot?.profile?.login?.toLowerCase() === config.githubUsername?.toLowerCase() && Array.isArray(snapshot.repos)) {
    profile = {...snapshot.profile,fetchedAt:snapshot.fetchedAt}; projects = normalizeRepos(snapshot.repos);
  }
  const saved = storageRead();
  if (saved?.profile?.login && Array.isArray(saved.projects) && saved.projects.every(p=>typeof p.name==='string' && Array.isArray(p.topics) && Number.isInteger(p.cover) && p.cover>=0 && p.cover<assets.length)) {
    try {
      const username=parseUsername(saved.profile.login);
      if ((!config.githubUsername || username.toLowerCase() === config.githubUsername.toLowerCase()) && (saved.profile.fetchedAt || 0) >= (snapshot?.fetchedAt || 0)) {profile={...saved.profile,cached:true};projects=saved.projects.map(p=>({...p,url:safeURL(p.url,true),homepage:safeURL(p.homepage),tint:String(p.tint||'').replace(/[^a-z-]/g,''),demo:false}));}
    } catch { storageClear(); }
  }
  renderProfile();
  if (config.githubUsername) importGitHub(config.githubUsername,{silent:true}).catch(error=>notify(error.message));
})();
