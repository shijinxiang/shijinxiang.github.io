(() => {
 'use strict';
 const projects=Array.isArray(window.SELECTED_PROJECTS)?window.SELECTED_PROJECTS:[];
 const $=s=>document.querySelector(s);
 const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const categories={ai:'AI APPLICATION',tools:'DESKTOP TOOL',games:'GAME DEVELOPMENT'};
 const detailUrl=p=>'./project.html?id='+encodeURIComponent(p.id);
 const tags=p=>'<ul class="tech-tags">'+p.tags.map(t=>'<li>'+escape(t)+'</li>').join('')+'</ul>';
 const external=(url,label,cls='text-link')=>'<a class="'+cls+'" href="'+escape(url)+'" target="_blank" rel="noopener noreferrer">'+escape(label)+' <span aria-hidden="true">↗</span></a>';
 const typeCover=()=>'<div class="type-cover" aria-hidden="true"><span class="cover-top">WINDOWS / DESKTOP UTILITY</span><span class="cover-letter">Aa<em>译</em></span><div class="cover-bottom"><strong>TRANSLATEPET</strong><small>CAPTURE<br>TRANSLATE<br>PRACTICE</small></div></div>';
 function watchImages(root=document) {
  root.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{
   img.closest('figure')?.classList.add('media-error');
   img.alt='图片暂时不可用，项目说明与源码仍可查看。';
  },{once:true}));
 }
 document.querySelectorAll('[data-year]').forEach(n=>n.textContent=new Date().getFullYear());

 const menu=$('#menuToggle'),nav=$('#mainNav');
 if(menu&&nav){
  const small=matchMedia('(max-width:520px)');
  document.body.classList.add('js-menu');
  function closeMenu(focus=false){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');if(focus)menu.focus();}
  function syncMenu(){menu.hidden=!small.matches;if(!small.matches)closeMenu();}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
  nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true')closeMenu(true);});
  document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!menu.contains(event.target))closeMenu();});
  small.addEventListener('change',syncMenu);syncMenu();
 }

 const panel=$('#casePanel'),tabs=$('#caseTabs');
 if(panel&&tabs){
  let filter='all',activeId=projects[0]?.id||'';
  const selected=()=>projects.filter(p=>filter==='all'||p.category===filter);
  function renderPanel(updateUrl=false){
   const list=selected(),p=list.find(p=>p.id===activeId)||list[0];
   if(!p){panel.innerHTML='<div class="case-loading">暂时没有此类作品。</div>';return;}
   activeId=p.id;
   panel.setAttribute('aria-labelledby','tab-'+p.id);
   panel.innerHTML='<article class="case-inner"><figure class="case-visual"><div class="case-image-top"><span>PROJECT FILE / '+escape(p.number)+'</span><span>'+escape(p.year)+' / '+escape(p.label)+'</span></div><a class="case-image-link" href="'+detailUrl(p)+'" aria-label="查看'+escape(p.name)+'的项目详情">'+(p.image?'<img src="'+escape(p.image)+'" alt="'+escape(p.alt)+'" width="1440" height="900" decoding="async">':typeCover())+'<span class="preview-arrow" aria-hidden="true">↗</span></a><figcaption>'+escape(p.imageLabel)+'</figcaption></figure><div class="case-copy"><div class="case-category"><span class="file-tag">FILE '+escape(p.number)+'</span><span>'+escape(categories[p.category])+'</span></div><h3>'+escape(p.name)+'</h3><p>'+escape(p.summary)+'</p><dl class="case-facts"><div><dt>形态</dt><dd>'+escape(p.platform)+'</dd></div><div><dt>实现</dt><dd>'+escape(p.highlights[0])+'</dd></div><div><dt>状态</dt><dd>'+escape(p.status)+'</dd></div></dl>'+tags(p)+'<div class="case-actions"><a class="button button-dark" href="'+detailUrl(p)+'">了解项目 <span aria-hidden="true">↗</span></a>'+external(p.demo||p.repo,p.demo?p.demoLabel:'查看源码')+'</div></div></article>';
   const index=list.indexOf(p);
   $('#casePosition').textContent=String(index+1).padStart(2,'0')+' / '+String(list.length).padStart(2,'0');
   $('#previousCase').disabled=list.length<2;$('#nextCase').disabled=list.length<2;
   tabs.querySelectorAll('[role="tab"]').forEach(t=>{const active=t.dataset.project===p.id;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});
   $('#selectionStatus').textContent='当前项目：'+p.name+'，第 '+(index+1)+' 项，共 '+list.length+' 项。';
   if(updateUrl)history.replaceState(null,'','#project-'+p.id);
   watchImages(panel);
  }
  function renderTabs(){
   const list=selected();
   tabs.style.setProperty('--case-count',String(Math.max(1,list.length)));
   tabs.innerHTML=list.map(p=>'<button class="case-tab" type="button" role="tab" id="tab-'+escape(p.id)+'" data-project="'+escape(p.id)+'" aria-controls="casePanel" aria-selected="false" tabindex="-1"><span class="tab-number">'+escape(p.number)+'</span><span><strong>'+escape(p.name)+'</strong><small>'+escape(categories[p.category])+'</small></span></button>').join('');
  }
  function choose(id,focus=false){
   if(!selected().some(p=>p.id===id))return;
   activeId=id;renderPanel(true);if(focus)document.getElementById('tab-'+id)?.focus();
  }
  function step(delta,focus=false){
   const list=selected(),index=list.findIndex(p=>p.id===activeId);
   if(list.length)choose(list[(Math.max(0,index)+delta+list.length)%list.length].id,focus);
  }
  function setFilter(value){
   filter=value;
   if(!selected().some(p=>p.id===activeId))activeId=selected()[0]?.id||'';
   document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===value)));
   renderTabs();renderPanel(true);
  }
  function followHash(initial=false){
   const slug=location.hash.startsWith('#project-')?location.hash.slice(9).toLowerCase():'';
   if(!slug)return;
   const p=projects.find(p=>p.id.toLowerCase()===slug||p.aliases?.includes(slug));
   if(!p){$('#work').scrollIntoView({block:'start',behavior:initial?'instant':'auto'});return;}
   filter='all';activeId=p.id;setFilter('all');
   $('#work').scrollIntoView({block:'start',behavior:initial?'instant':'auto'});
  }
  tabs.addEventListener('click',event=>{const button=event.target.closest('[data-project]');if(button)choose(button.dataset.project);});
  tabs.addEventListener('keydown',event=>{
   if(!event.target.closest('[role="tab"]'))return;
   if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
    event.preventDefault();
    if(event.key==='Home')choose(selected()[0].id,true);
    else if(event.key==='End')choose(selected().at(-1).id,true);
    else step(event.key==='ArrowLeft'?-1:1,true);
   }
  });
  $('#previousCase').addEventListener('click',()=>step(-1));
  $('#nextCase').addEventListener('click',()=>step(1));
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
  window.addEventListener('hashchange',()=>followHash(false));
  renderTabs();renderPanel();followHash(true);
 }

 const main=$('#projectMain');
 if(main){
  const id=new URLSearchParams(location.search).get('id')||'';
  const p=projects.find(p=>p.id===id||p.aliases?.includes(id));
  if(!p){
   main.innerHTML='<section class="invalid-project"><p class="eyebrow">PROJECT FILE NOT FOUND</p><h1>这个项目暂不在精选作品中。</h1><p>可以返回作品集，浏览当前的五个项目。</p><a class="button button-dark" href="./#work">返回精选作品 ↗</a></section>';
   document.querySelector('meta[name="robots"]')?.setAttribute('content','noindex,follow');
  }else{
   document.title=p.name+' — 施金翔的项目档案';
   document.querySelector('meta[name="description"]')?.setAttribute('content',p.summary);
   document.querySelector('meta[name="robots"]')?.setAttribute('content','index,follow');
   const canonical=document.createElement('link');canonical.rel='canonical';canonical.href='https://shijinxiang.github.io/project.html?id='+encodeURIComponent(p.id);document.head.append(canonical);
   const next=projects[(projects.indexOf(p)+1)%projects.length];
   main.innerHTML='<div class="project-topline"><a href="./#project-'+escape(p.id)+'">← SELECTED WORK</a><span>FILE '+escape(p.number)+' / '+escape(categories[p.category])+'</span><span>'+escape(p.year)+'</span></div><h1 class="project-title">'+escape(p.english)+'</h1><div class="project-intro"><div><h2>'+escape(p.name)+'</h2><p>'+escape(p.summary)+'</p><div class="case-actions">'+external(p.repo,'查看源码','button button-dark')+(p.demo?external(p.demo,p.demoLabel,'button button-line'):'')+'</div></div><dl class="detail-meta"><div><dt>方向</dt><dd>'+escape(p.kind)+'</dd></div><div><dt>状态</dt><dd>'+escape(p.status)+'</dd></div><div><dt>交付</dt><dd>'+escape(p.deliverable)+'</dd></div><div><dt>技术</dt><dd>'+tags(p)+'</dd></div></dl></div>'+
    '<figure class="detail-hero-image">'+(p.image?'<button type="button" data-image="0" aria-label="放大查看'+escape(p.name)+'项目截图"><img src="'+escape(p.image)+'" alt="'+escape(p.alt)+'" width="1440" height="900" fetchpriority="high"></button>':typeCover())+'</figure><div class="detail-caption"><span>'+escape(p.imageLabel)+'</span>'+(p.image?'<button type="button" data-image="0">点击放大 ↗</button>':'<span>PROJECT IDENTITY</span>')+'</div>'+
    '<section class="case-story" aria-labelledby="storyTitle"><h2 id="storyTitle">从场景，<br>到实现。</h2><dl class="story-lines"><div><dt>使用场景</dt><dd>'+escape(p.context)+'</dd></div><div><dt>实现思路</dt><dd>'+escape(p.approach)+'</dd></div><div><dt>当前成果</dt><dd>'+escape(p.result)+'</dd></div></dl></section>'+
    '<section class="detail-feature-section" aria-labelledby="featuresTitle"><div class="detail-feature-heading"><h2 id="featuresTitle">实现重点</h2><span class="micro">BEHIND THE BUILD / '+escape(p.number)+'</span></div><div class="detail-features">'+p.features.map((f,i)=>'<article class="detail-feature"><span class="item-number">'+String(i+1).padStart(2,'0')+'</span><h3>'+escape(f.title)+'</h3><p>'+escape(f.body)+'</p></article>').join('')+'</div><ol class="flow-list" aria-label="项目流程">'+p.flow.map(s=>'<li>'+escape(s)+'</li>').join('')+'</ol><p class="project-note">'+escape(p.note)+'</p></section>'+
    (p.gallery.length>1?'<section class="detail-gallery" aria-label="更多游戏实机画面">'+p.gallery.slice(1).map((g,i)=>'<figure class="gallery-item"><button type="button" data-image="'+(i+1)+'" aria-label="放大查看'+escape(g.alt)+'"><img src="'+escape(g.src)+'" alt="'+escape(g.alt)+'" width="1280" height="720" loading="lazy" decoding="async"></button><figcaption>'+escape(g.caption)+'</figcaption></figure>').join('')+'</section>':'')+
    '<div class="project-bottom"><a class="button button-line" href="./#project-'+escape(p.id)+'">返回精选作品 <span aria-hidden="true">↖</span></a><div class="project-next"><span class="micro">NEXT PROJECT / '+escape(next.number)+'</span><a href="'+detailUrl(next)+'">'+escape(next.name)+' <span aria-hidden="true">↗</span></a></div></div>';
   const dialog=$('#imageDialog');let opener=null;
   main.addEventListener('click',event=>{
    const button=event.target.closest('[data-image]');if(!button)return;
    const item=p.gallery[Number(button.dataset.image)];if(!item)return;
    opener=button;$('#expandedImage').src=item.src;$('#expandedImage').alt=item.alt;$('#imageTitle').textContent=item.caption;dialog.showModal();document.body.classList.add('modal-open');
   });
   $('#closeImage').addEventListener('click',()=>dialog.close());
   dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus({preventScroll:true});});
   dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
   });
  }
 }
 watchImages();
})();
