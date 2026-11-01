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
  const covers = {
    'deskpet-WDY':{mark:'Aa',label:'TRANSLATEPET'},
    website:{mark:'学 / 练',label:'STUDY & PRACTICE'},
    dongVSjin:{mark:'D × J',label:'GODOT / TWO PLAYERS'},
    heroVSgrandpa:{mark:'H / G',label:'PIXEL COMBAT'},
    wwweb:{mark:'温 / 习',label:'STUDY ARCHIVE'},
    myweb:{mark:'AI / ICT',label:'ASCEND AI PRACTICE'}
  };
  let rawRepos = Array.isArray(snapshot.repos) ? snapshot.repos : [];
  let fetchedAt = Number(snapshot.fetchedAt) || 0;
  let projects = [], selected = [];
  let filter = 'all', activeName = '', updating = false;

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
  const projectId = p => 'project-' + p.name.toLowerCase();
  const number = value => String(value).padStart(2,'0');
  function tagsHtml(tags) { return '<ul class="tech-list">'+tags.map(t=>'<li>'+escape(t)+'</li>').join('')+'</ul>'; }
  function coverHtml(p) {
    const c = covers[p.name] || {mark:p.name.slice(0,2).toUpperCase(),label:p.name};
    return '<div class="identity-cover" aria-hidden="true"><span class="cover-top">SHIJINXIANG / '+escape(categories[p.category].toUpperCase())+'</span><span class="cover-monogram">'+escape(c.mark)+'</span><span class="cover-bottom">'+escape(c.label)+'</span></div>';
  }
  function cardHtml(p, depth, position) {
    const front = depth===0, href='#'+projectId(p);
    return '<'+(front?'a href="'+href+'" data-jump="'+escape(p.name)+'" aria-label="查看'+escape(p.title)+'的下方详情"':'div aria-hidden="true"')+' class="deck-card" data-depth="'+depth+'"><div class="card-kicker"><span>PROJECT / '+number(position+1)+'</span><span>'+escape(categories[p.category])+'</span></div><div class="card-visual">'+
      (p.details.image?'<img src="'+escape(p.details.image)+'" alt="" width="1440" height="900" loading="lazy" decoding="async">':coverHtml(p))+
      '</div><div class="card-footer"><span>'+escape(p.title)+'</span><span aria-hidden="true">↘</span></div></'+(front?'a':'div')+'>';
  }
  function renderDeck() {
    const p=selected.find(p=>p.name===activeName) || selected[0];
    if(!p) return;
    activeName=p.name;
    const index=selected.indexOf(p);
    $('#stackCopy').innerHTML='<p class="stack-number"><strong>'+number(index+1)+'</strong><span aria-hidden="true"></span>'+number(selected.length)+' PROJECTS</p><p class="eyebrow">'+escape(p.details.kind || categories[p.category])+'</p><h3>'+escape(p.title)+'</h3><p class="stack-description">'+escape(p.description)+'</p>'+tagsHtml(p.tags)+'<a class="text-link" href="#'+projectId(p)+'" data-jump="'+escape(p.name)+'">查看项目详情 <span aria-hidden="true">↓</span></a>';
    $('#projectDeck').innerHTML=Array.from({length:Math.min(3,selected.length)},(_,depth)=>{
      const position=(index+depth)%selected.length;
      return cardHtml(selected[position],depth,position);
    }).join('');
    $('#deckPosition').textContent=number(index+1)+' / '+number(selected.length);
    $('#previousProject').disabled=selected.length<2;
    $('#nextProject').disabled=selected.length<2;
    document.querySelectorAll('#projectIndex a').forEach(a=>{
      if(a.dataset.jump===activeName) a.setAttribute('aria-current','true');
      else a.removeAttribute('aria-current');
    });
  }
  function detailHtml(p, index) {
    const d=p.details, id=projectId(p), points=d.points?.length?d.points:(d.features||[]).slice(0,2);
    return '<article class="work-row" id="'+id+'" data-repo="'+escape(p.name)+'"><figure class="work-media">'+
      (d.image?'<div class="work-image"><img src="'+escape(d.image)+'" alt="'+escape(d.imageAlt||p.title+'项目界面')+'" width="1440" height="900" loading="lazy" decoding="async"></div>':coverHtml(p))+
      '<figcaption><span>'+ (d.image?'真实界面 · 演示数据':'项目封面')+'</span><span>'+number(index+1)+' / '+escape(p.name)+'</span></figcaption></figure>'+
      '<div class="work-copy"><p class="work-type">'+escape(d.kind||categories[p.category])+(p.archived?' · 已归档':'')+'</p><h3 id="'+id+'-title" tabindex="-1">'+escape(p.title)+'</h3><p class="work-description">'+escape(p.description)+'</p>'+
      (points.length?'<ul class="work-points">'+points.map(point=>'<li>'+escape(point)+'</li>').join('')+'</ul>':'')+tagsHtml(p.tags)+
      '<div class="work-actions"><a class="button button-glass" href="'+escape(p.url)+'" target="_blank" rel="noopener noreferrer" aria-label="在 GitHub 查看'+escape(p.title)+'源码">查看源码 <span aria-hidden="true">↗</span></a>'+
      (p.homepage?'<a class="text-link" href="'+escape(p.homepage)+'" target="_blank" rel="noopener noreferrer">在线体验 ↗</a>':'')+'</div>'+
      ((d.features?.length||d.note)?'<details class="implementation-note"><summary>实现重点与项目说明</summary>'+(d.features?.length?'<ul>'+d.features.map(point=>'<li>'+escape(point)+'</li>').join('')+'</ul>':'')+(d.note?'<p>'+escape(d.note)+'</p>':'')+'</details>':'')+
      '<a class="back-to-deck" href="#projects">↑ 返回项目卡组</a></div></article>';
  }
  function render() {
    const focusedJump=document.activeElement?.dataset?.jump;
    projects=normalize(rawRepos);
    const query=$('#projectSearch').value, sort=$('#projectSort').value;
    selected=projects.filter(p=>(filter==='all'||p.category===filter)&&matches(p,query));
    selected.sort((a,b)=>{
      if(sort==='name') return a.title.localeCompare(b.title,'zh-CN');
      if(sort==='stars') return b.stars-a.stars||b.updated-a.updated;
      if(sort==='featured') {
        const ar=a.rank<0?Infinity:a.rank, br=b.rank<0?Infinity:b.rank;
        if(ar!==br) return ar-br;
      }
      return b.updated-a.updated || a.name.localeCompare(b.name);
    });
    if(!selected.some(p=>p.name===activeName)) activeName=selected[0]?.name || '';
    $('#projectShowcase').hidden=!selected.length;
    $('#emptyState').hidden=selected.length>0;
    $('#detailsHeading').hidden=!selected.length;
    $('#projectIndex').innerHTML=selected.map((p,index)=>'<a href="#'+projectId(p)+'" data-jump="'+escape(p.name)+'"><span>'+number(index+1)+'</span>'+escape(p.title)+'</a>').join('');
    $('#projectDetails').innerHTML=selected.map(detailHtml).join('');
    $('#resultsStatus').textContent=filter==='all'&&!query.trim()?projects.length+' 个公开项目 · 点击卡片查看详情':'找到 '+selected.length+' 个项目';
    document.querySelectorAll('[data-count]').forEach(node=>{node.textContent=node.dataset.count==='all'?projects.length:projects.filter(p=>p.category===node.dataset.count).length;});
    renderDeck();
    if(focusedJump) document.querySelector('#projectIndex [data-jump="'+CSS.escape(focusedJump)+'"]')?.focus({preventScroll:true});
  }
  function resetFilters() {
    filter='all';$('#projectSearch').value='';$('#projectSort').value='featured';
    document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter==='all')));
  }
  function resolveHash({scroll=true,instant=false}={}) {
    const id=location.hash.slice(1);
    if(!id.startsWith('project-')) return;
    const p=projects.find(p=>projectId(p)===id);
    if(!p) return;
    if(!selected.some(item=>item.name===p.name)) {resetFilters();render();}
    activeName=p.name;renderDeck();
    const target=document.getElementById(id);
    if(scroll) target?.scrollIntoView({block:'start',behavior:instant?'instant':'auto'});
    document.getElementById(id+'-title')?.focus({preventScroll:true});
  }
  function stepProject(delta) {
    if(selected.length<2) return;
    const index=Math.max(0,selected.findIndex(p=>p.name===activeName));
    activeName=selected[(index+delta+selected.length)%selected.length].name;renderDeck();
  }
  document.addEventListener('click',event=>{
    const anchor=event.target.closest('[data-jump]');
    if(anchor && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button===0) {
      activeName=anchor.dataset.jump;renderDeck();
      if(location.hash===anchor.getAttribute('href')) {event.preventDefault();resolveHash();}
    }
    const button=event.target.closest('[data-filter]');
    if(button) {
      filter=button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(node=>node.setAttribute('aria-pressed',String(node===button)));
      render();
    }
  });
  $('#previousProject').addEventListener('click',()=>stepProject(-1));
  $('#nextProject').addEventListener('click',()=>stepProject(1));
  $('#projectDeck').addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'||event.key==='ArrowRight') {
      event.preventDefault();stepProject(event.key==='ArrowLeft'?-1:1);
      $('#projectDeck [data-depth="0"]')?.focus({preventScroll:true});
    }
  });
  window.addEventListener('hashchange',()=>resolveHash());
  $('#projectSearch').addEventListener('input',render);
  $('#projectSort').addEventListener('change',render);
  $('#resetFilters').addEventListener('click',()=>{resetFilters();render();$('#projectSearch').focus({preventScroll:true});});

  function showDataStatus(message,isError=false) {
    const node=$('#dataStatus');node.textContent=message;node.dataset.state=isError?'error':'ready';
  }
  function renderDate() {showDataStatus(fetchedAt?'项目资料更新于 '+date(fetchedAt):'项目资料来自公开仓库');}
  async function refresh({manual=false}={}) {
    if(updating) return;
    updating=true;const button=$('#refreshProjects');
    button.disabled=true;button.setAttribute('aria-busy','true');button.textContent='正在更新…';
    try {
      const repos=[];let page=1,more=true;
      while(more&&page<=20) {
        const response=await fetch('https://api.github.com/users/'+encodeURIComponent(account)+'/repos?sort=updated&per_page=100&page='+page,{headers:{Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(15000)});
        if(!response.ok) throw new Error(response.status===403||response.status===429?'rate':'network');
        const data=await response.json();if(!Array.isArray(data)) throw new Error('data');
        repos.push(...data);more=!!response.headers.get('link')?.includes('rel="next"');page++;
      }
      if(more) throw new Error('pages');
      rawRepos=repos;fetchedAt=Date.now();
      try{localStorage.setItem(cacheKey,JSON.stringify({account,fetchedAt,repos:rawRepos}));}catch{}
      render();renderDate();
    }catch(error){
      if(manual) showDataStatus(error.name==='TimeoutError'?'连接超时，仍可浏览已保存项目。请稍后重试。':error.message==='rate'?'GitHub 请求暂时达到上限，已保存项目仍可浏览。请稍后重试。':'暂时无法更新，仍可浏览已保存项目。请稍后重试。',true);
    }finally{
      updating=false;button.disabled=false;button.removeAttribute('aria-busy');button.textContent='更新项目信息 ↻';
    }
  }
  $('#refreshProjects').addEventListener('click',()=>refresh({manual:true}));

  const background=$('#heroVideo'), film=$('#introFilm'), dialog=$('#filmDialog');
  const motionQuery=matchMedia('(prefers-reduced-motion: reduce)'), connection=navigator.connection;
  const autoAllowed=()=>!motionQuery.matches&&!connection?.saveData;
  let playIntent=autoAllowed(), userToggled=false, heroInView=false, filmOpener=null;
  function loadVideo(video) {
    if(video.dataset.loaded) return;
    video.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;});
    video.dataset.loaded='true';video.load();
  }
  function updateBackgroundButton() {
    const playing=!background.paused;
    $('#toggleBackground').textContent=playing?'暂停背景':'播放背景';
    $('#toggleBackground').setAttribute('aria-label',playing?'暂停背景动画':'播放背景动画');
    $('#toggleBackground').setAttribute('aria-pressed',String(playing));
  }
  function syncBackground() {
    const shouldPlay=playIntent&&heroInView&&!document.hidden&&!dialog.open;
    background.autoplay=shouldPlay;
    if(shouldPlay) {
      loadVideo(background);background.muted=true;
      background.play().catch(()=>updateBackgroundButton());
    }else background.pause();
  }
  $('#toggleBackground').hidden=false;
  $('#toggleBackground').addEventListener('click',()=>{
    userToggled=true;playIntent=background.paused;
    if(background.error){background.load();playIntent=true;}
    syncBackground();
  });
  background.addEventListener('playing',()=>{background.classList.add('is-playing');$('#backgroundStatus').hidden=true;updateBackgroundButton();});
  background.addEventListener('play',updateBackgroundButton);
  background.addEventListener('pause',updateBackgroundButton);
  background.addEventListener('error',()=>{
    if(!background.dataset.fallback && background.currentSrc.includes('.webm')) {
      background.dataset.fallback='mp4';
      background.src=background.querySelector('source[type="video/mp4"]').dataset.src;
      background.load();syncBackground();return;
    }
    background.classList.remove('is-playing');
    $('#backgroundStatus').textContent='背景暂时无法播放，已显示项目封面。';$('#backgroundStatus').hidden=false;updateBackgroundButton();
  });
  function preferenceChanged() {
    if(!autoAllowed()) playIntent=false;
    else if(!userToggled) playIntent=true;
    syncBackground();
  }
  motionQuery.addEventListener('change',preferenceChanged);
  connection?.addEventListener?.('change',preferenceChanged);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden) film.pause();
    syncBackground();
  });
  if('IntersectionObserver' in window) new IntersectionObserver(entries=>{
    heroInView=entries[0].isIntersecting;syncBackground();
  },{threshold:.15}).observe($('.hero'));
  else{heroInView=true;}
  $('#watchFilm').addEventListener('click',event=>{
    filmOpener=event.currentTarget;dialog.showModal();document.body.classList.add('modal-open');syncBackground();
    loadVideo(film);$('#filmStatus').hidden=true;
    film.play().catch(()=>{$('#filmStatus').textContent='点击播放器中的播放按钮，观看完整短片。';$('#filmStatus').hidden=false;});
  });
  $('#closeFilm').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{
    film.pause();document.body.classList.remove('modal-open');filmOpener?.focus({preventScroll:true});syncBackground();
  });
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog) return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close();
  });
  film.addEventListener('error',()=>{
    $('#filmStatus').textContent='短片暂时无法播放，可以点击“单独打开短片”重试。';$('#filmStatus').hidden=false;
  });
  try {
    const saved=JSON.parse(localStorage.getItem(cacheKey)||'null');
    if(saved?.account===account&&Array.isArray(saved.repos)&&Number.isFinite(saved.fetchedAt)&&saved.fetchedAt>=fetchedAt&&saved.fetchedAt<=Date.now()+60000) {rawRepos=saved.repos;fetchedAt=saved.fetchedAt;}
  }catch{}
  $('#currentYear').textContent=new Date().getFullYear();
  $('#techCloud').innerHTML=(config.toolkit||[]).map(tool=>'<li>'+escape(tool)+'</li>').join('');
  $('#projectToolbar').hidden=false;$('#refreshProjects').hidden=false;
  render();renderDate();updateBackgroundButton();syncBackground();
  if(location.hash.startsWith('#project-')) resolveHash({instant:true});
  if(!projects.length||Date.now()-fetchedAt>cacheTTL) refresh();
})();
