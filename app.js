(() => {
  'use strict';
  const config = window.PORTFOLIO_CONFIG || {};
  const account = config.githubUsername || 'shijinxiang';
  const snapshot = window.PORTFOLIO_SNAPSHOT || {repos:[],fetchedAt:0};
  const $ = selector => document.querySelector(selector);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const categories = {web:'AI / Web',tools:'效率工具',creative:'创意实验'};
  const cacheKey = 'portfolio-public-repos-v3:' + account;
  const cacheTTL = 30 * 60 * 1000;
  let rawRepos = Array.isArray(snapshot.repos) ? snapshot.repos : [];
  let fetchedAt = Number(snapshot.fetchedAt) || 0;
  let projects = [];
  let filter = 'all';
  let updating = false;
  let dialogOpener = null;
  let selectedProject = '';
  const dialog = $('#projectDialog');

  function safeUrl(value) {
    try {
      const url = new URL(value);
      return ['https:','http:'].includes(url.protocol) && !url.username && !url.password ? url.href : '';
    } catch { return ''; }
  }
  function count(value) { return Number.isFinite(Number(value)) ? Math.max(0,Number(value)) : 0; }
  function date(value) {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? '' : new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit'}).format(d);
  }
  function classify(repo) {
    const topics = new Set((Array.isArray(repo.topics) ? repo.topics : []).map(t => String(t).toLowerCase()));
    const has = terms => terms.some(term => topics.has(term));
    if (has(['art','canvas','game','godot','generative-art','webgl','creative']) || repo.language === 'GDScript') return 'creative';
    if (has(['cli','tool','tools','sdk','library','automation','developer-tools'])) return 'tools';
    return ['HTML','CSS','TypeScript','JavaScript','Vue','Svelte'].includes(repo.language) || has(['web','react','vue','nextjs','website','app']) ? 'web' : 'tools';
  }
  function normalize(repos) {
    const hidden = new Set((config.hiddenRepos || []).map(name=>name.toLowerCase()));
    const featured = (config.featuredRepos || []).map(name=>name.toLowerCase());
    const seen = new Set();
    return repos.filter(repo => {
      if (!repo || typeof repo.name !== 'string' || !/^[a-z0-9_.-]+$/i.test(repo.name)) return false;
      if (repo.private || (repo.fork && !config.includeForks) || hidden.has(repo.name.toLowerCase())) return false;
      if (repo.owner?.login?.toLowerCase() !== account.toLowerCase() || seen.has(repo.name.toLowerCase())) return false;
      seen.add(repo.name.toLowerCase()); return true;
    }).map(repo => {
      const override = config.repoOverrides?.[repo.name] || {};
      const details = config.projectDetails?.[repo.name] || {};
      const tags = override.tags || repo.topics || [];
      return {
        name:repo.name, title:override.title || repo.name,
        description:override.description || repo.description || '项目介绍与运行方法见仓库说明。',
        tags:Array.isArray(tags) ? tags.filter(t=>typeof t==='string').slice(0,5) : [],
        category:categories[override.category] ? override.category : classify(repo),
        language:typeof repo.language === 'string' ? repo.language : '',
        stars:count(repo.stargazers_count), updated:Date.parse(repo.updated_at)||0,
        url:'https://github.com/'+encodeURIComponent(account)+'/'+encodeURIComponent(repo.name),
        homepage:safeUrl(repo.homepage), archived:!!repo.archived,
        rank:featured.indexOf(repo.name.toLowerCase()), details
      };
    });
  }
  function matches(project, query) {
    const text = [project.name,project.title,project.description,project.language,...project.tags].join(' ').normalize('NFKC').toLowerCase();
    const words = text.match(/[a-z0-9+#.]+/g) || [];
    return query.normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean).every(term => {
      if (/\p{Script=Han}/u.test(term)) return text.includes(term);
      const parts = term.match(/[a-z0-9+#.]+/g);
      return parts?.length ? parts.every(part=>words.some(word=>word.startsWith(part))) : text.includes(term);
    });
  }
  function tagsHtml(tags) { return '<ul class="tech-list">'+tags.map(t=>'<li>'+escape(t)+'</li>').join('')+'</ul>'; }
  function featureHtml(project) {
    const p=project,d=p.details, name=escape(p.name), title=escape(p.title);
    return '<article class="work-row" data-repo="'+name+'"><div class="work-copy"><p class="work-type">'+escape(d.kind || categories[p.category])+'</p><h3>'+title+'</h3><p class="work-description">'+escape(p.description)+'</p>'+
      (d.points?.length?'<ul class="work-points">'+d.points.map(point=>'<li>'+escape(point)+'</li>').join('')+'</ul>':'')+
      tagsHtml(p.tags)+'<div class="work-actions"><button class="outline-button" data-project="'+name+'" aria-label="了解'+title+'项目">了解项目 <span aria-hidden="true">↗</span></button><a class="text-link" href="'+escape(p.url)+'" target="_blank" rel="noopener noreferrer" aria-label="在 GitHub 查看'+title+'源码">查看源码 ↗</a></div></div>'+
      '<figure class="work-media"><button class="work-image" data-project="'+name+'" aria-label="查看'+title+'的界面与介绍"><img src="'+escape(d.image)+'" alt="'+escape(d.imageAlt || p.title+'项目界面')+'" width="1440" height="900" loading="lazy" decoding="async"></button><figcaption>真实界面 · 演示数据</figcaption></figure></article>';
  }
  function itemHtml(p) {
    const title=escape(p.title), name=escape(p.name);
    return '<article class="project-item" data-repo="'+name+'"><h3><button class="project-name" data-project="'+name+'" title="'+title+'">'+title+'</button></h3><p class="item-description">'+escape(p.description)+'</p><div class="item-meta"><span>'+escape(p.details.kind || categories[p.category])+'</span>'+
      (p.homepage?'<a href="'+escape(p.homepage)+'" target="_blank" rel="noopener noreferrer">在线体验 ↗</a>':'')+
      '</div><button class="item-action" data-project="'+name+'" aria-label="了解'+title+'项目">↗</button></article>';
  }
  function render() {
    const focused = document.activeElement?.dataset?.project;
    projects = normalize(rawRepos);
    const query = $('#projectSearch').value;
    const sort = $('#projectSort').value;
    const selected = projects.filter(p=>(filter==='all'||p.category===filter)&&matches(p,query));
    selected.sort((a,b)=>{
      if(sort==='name') return a.title.localeCompare(b.title,'zh-CN');
      if(sort==='stars') return b.stars-a.stars||b.updated-a.updated;
      if(sort==='featured') {
        const ar=a.rank<0?Infinity:a.rank, br=b.rank<0?Infinity:b.rank;
        if(ar!==br) return ar-br;
      }
      return b.updated-a.updated || a.name.localeCompare(b.name);
    });
    const useShowcase = filter==='all' && !query.trim() && sort==='featured';
    const featured = useShowcase ? selected.filter(p=>p.rank>=0 && p.details.image) : [];
    const featuredNames = new Set(featured.map(p=>p.name));
    const others = selected.filter(p=>!featuredNames.has(p.name));
    $('#featuredProjects').innerHTML = featured.map(featureHtml).join('');
    $('#featuredProjects').hidden = !featured.length;
    $('#archiveHeading').hidden = !featured.length || !others.length;
    $('#projectGrid').innerHTML = others.map(itemHtml).join('');
    $('#emptyState').hidden = selected.length>0;
    $('#resultsStatus').textContent = useShowcase ? projects.length+' 个公开项目 · '+featured.length+' 个代表项目' : '找到 '+selected.length+' 个项目';
    document.querySelectorAll('[data-count]').forEach(node=>{node.textContent=node.dataset.count==='all'?projects.length:projects.filter(p=>p.category===node.dataset.count).length;});
    if(focused && !dialog.open) document.querySelector('[data-project="'+CSS.escape(focused)+'"]')?.focus({preventScroll:true});
  }
  function showDataStatus(message, isError=false) {
    const node=$('#dataStatus'); node.textContent=message; node.dataset.state=isError?'error':'ready';
  }
  function renderDate() { showDataStatus(fetchedAt?'项目资料更新于 '+date(fetchedAt):'项目资料来自公开仓库'); }
  async function refresh({manual=false}={}) {
    if(updating) return;
    updating=true; const button=$('#refreshProjects');
    button.disabled=true;button.setAttribute('aria-busy','true');button.textContent='正在更新…';
    try {
      const repos=[];let page=1, more=true;
      while(more && page<=20) {
        const response=await fetch('https://api.github.com/users/'+encodeURIComponent(account)+'/repos?sort=updated&per_page=100&page='+page,{headers:{Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(15000)});
        if(!response.ok) throw new Error(response.status===403||response.status===429?'GitHub 请求暂时达到上限':'暂时无法连接 GitHub');
        const data=await response.json();
        if(!Array.isArray(data)) throw new Error('项目信息暂时不可用');
        repos.push(...data);more=!!response.headers.get('link')?.includes('rel="next"');page++;
      }
      if(more) throw new Error('项目较多，稍后再试');
      rawRepos=repos;fetchedAt=Date.now();
      try {localStorage.setItem(cacheKey,JSON.stringify({account,fetchedAt,repos:rawRepos}));} catch {}
      render();renderDate();
    } catch(error) {
      if(manual) showDataStatus(error.name==='TimeoutError'?'连接超时，仍可浏览已保存项目。请稍后重试。':error.message==='GitHub 请求暂时达到上限'?'GitHub 请求暂时达到上限，已保存项目仍可浏览。请稍后重试。':'暂时无法更新，仍可浏览已保存项目。请稍后重试。',true);
    } finally {
      updating=false;button.disabled=false;button.removeAttribute('aria-busy');button.textContent='更新项目信息 ↻';
    }
  }
  function openProject(name, opener) {
    const p=projects.find(project=>project.name===name);if(!p) return;
    const d=p.details;dialogOpener=opener;selectedProject=name;
    $('#projectDetail').innerHTML='<div class="detail-content"><p class="detail-type">'+escape(d.kind||categories[p.category])+(p.archived?' · 已归档':'')+'</p><h2 class="detail-title" id="detailTitle">'+escape(p.title)+'</h2><p class="detail-repo">'+escape(account+'/'+p.name)+'</p><p class="detail-description" id="detailDescription">'+escape(p.description)+'</p>'+
      (d.image?'<figure class="detail-figure"><img src="'+escape(d.image)+'" alt="'+escape(d.imageAlt || p.title+'项目界面')+'" width="1440" height="900"><figcaption>独立演示环境的真实界面</figcaption></figure>':'')+
      (d.features?.length?'<h3>实现重点</h3><ul class="detail-features">'+d.features.map(point=>'<li>'+escape(point)+'</li>').join('')+'</ul>':'')+
      '<h3>技术与工具</h3>'+tagsHtml(p.tags.length?p.tags:[p.language||'详见仓库'])+
      (d.note?'<p class="detail-note">'+escape(d.note)+'</p>':'')+
      '<p class="detail-meta">'+(p.updated?'仓库更新于 '+date(p.updated):'公开仓库')+(p.stars?' · '+p.stars+' Stars':'')+'</p></div><div class="detail-footer"><a class="outline-button" href="'+escape(p.url)+'" target="_blank" rel="noopener noreferrer">查看源码 ↗</a>'+
      (p.homepage?'<a class="outline-button" href="'+escape(p.homepage)+'" target="_blank" rel="noopener noreferrer">在线体验 ↗</a>':'')+'</div>';
    if(!dialog.open) dialog.showModal();
    dialog.scrollTop=0;document.body.classList.add('modal-open');syncFilm();
  }
  document.addEventListener('click',event=>{
    const projectButton=event.target.closest('[data-project]');
    if(projectButton) openProject(projectButton.dataset.project,projectButton);
    const filterButton=event.target.closest('[data-filter]');
    if(filterButton) {
      filter=filterButton.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button===filterButton)));
      render();
    }
  });
  $('#closeProject').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog) return;
    const rect=dialog.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) dialog.close();
  });
  dialog.addEventListener('close',()=>{
    document.body.classList.remove('modal-open');
    const target=dialogOpener?.isConnected?dialogOpener:document.querySelector('[data-project="'+CSS.escape(selectedProject)+'"]');
    target?.focus({preventScroll:true});syncFilm();
  });
  $('#projectSearch').addEventListener('input',render);
  $('#projectSort').addEventListener('change',render);
  $('#resetFilters').addEventListener('click',()=>{
    filter='all';$('#projectSearch').value='';$('#projectSort').value='featured';
    document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter==='all')));
    render();$('#projectSearch').focus({preventScroll:true});
  });
  $('#refreshProjects').addEventListener('click',()=>refresh({manual:true}));

  const film=$('#introFilm'), motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
  let playIntent=!motionQuery.matches, userToggled=false, filmInView=true;
  film.muted=true;film.controls=false;$('.film-controls').hidden=false;
  if(motionQuery.matches) {film.autoplay=false;film.pause();}
  function updateFilmButtons() {
    $('#toggleFilm').textContent=film.paused?'播放':'暂停';
    $('#toggleFilm').setAttribute('aria-label',film.paused?'播放项目视频':'暂停视频');
    $('#toggleFilm').setAttribute('aria-pressed',String(!film.paused));
    $('#toggleSound').textContent=film.muted?'声音关':'声音开';
    $('#toggleSound').setAttribute('aria-label',film.muted?'开启视频声音':'关闭视频声音');
    $('#toggleSound').setAttribute('aria-pressed',String(!film.muted));
  }
  function syncFilm() {
    if(playIntent && filmInView && !document.hidden && !dialog.open) {
      film.play().catch(()=>{updateFilmButtons();});
    } else film.pause();
  }
  $('#toggleFilm').addEventListener('click',()=>{
    userToggled=true;
    if(film.error) {film.load();playIntent=true;}
    else playIntent=film.paused;
    syncFilm();
  });
  $('#toggleSound').addEventListener('click',()=>{film.muted=!film.muted;updateFilmButtons();});
  $('#expandFilm').addEventListener('click',async()=>{
    try {
      if(film.requestFullscreen) {film.controls=true;await film.requestFullscreen();}
      else if(film.webkitEnterFullscreen) film.webkitEnterFullscreen();
      else window.open(film.currentSrc,'_blank','noopener');
    } catch {
      film.controls=false;
      $('#filmStatus').textContent='浏览器未允许全屏，仍可在此播放。';$('#filmStatus').hidden=false;
    }
  });
  document.addEventListener('fullscreenchange',()=>{film.controls=document.fullscreenElement===film;});
  film.addEventListener('play',updateFilmButtons);
  film.addEventListener('pause',updateFilmButtons);
  film.addEventListener('volumechange',updateFilmButtons);
  film.addEventListener('loadedmetadata',()=>{
    const duration=Math.round(film.duration);
    if(Number.isFinite(duration)) $('#filmDuration').textContent=String(Math.floor(duration/60)).padStart(2,'0')+':'+String(duration%60).padStart(2,'0');
  });
  film.addEventListener('canplay',()=>{
    $('#filmStatus').hidden=true;$('#toggleSound').disabled=false;syncFilm();
  });
  film.addEventListener('error',()=>{
    const status=$('#filmStatus');status.hidden=false;status.dataset.state='error';status.textContent='视频暂时无法加载，点“播放”重试；下方作品仍可浏览。';
    $('#toggleSound').disabled=true;updateFilmButtons();
  });
  film.addEventListener('timeupdate',()=>{const progress=Number.isFinite(film.duration)&&film.duration>0?film.currentTime/film.duration:0;$('#filmProgress').style.transform='scaleX('+progress+')';});
  motionQuery.addEventListener('change',event=>{if(event.matches) playIntent=false;else if(!userToggled) playIntent=true;syncFilm();});
  document.addEventListener('visibilitychange',syncFilm);
  if('IntersectionObserver' in window) new IntersectionObserver(entries=>{filmInView=entries[0].isIntersecting;syncFilm();},{threshold:.15}).observe(film);
  updateFilmButtons();

  try {
    const saved=JSON.parse(localStorage.getItem(cacheKey)||'null');
    if(saved?.account===account && Array.isArray(saved.repos) && Number.isFinite(saved.fetchedAt) && saved.fetchedAt>=fetchedAt && saved.fetchedAt<=Date.now()+60000) {rawRepos=saved.repos;fetchedAt=saved.fetchedAt;}
  } catch {}
  $('#currentYear').textContent=new Date().getFullYear();
  $('#techCloud').innerHTML=(config.toolkit||[]).map(tool=>'<li>'+escape(tool)+'</li>').join('');
  $('#projectToolbar').hidden=false;$('#refreshProjects').hidden=false;
  render();renderDate();syncFilm();
  if(!projects.length || Date.now()-fetchedAt>cacheTTL) refresh();
})();
