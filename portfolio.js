(() => {
  'use strict';

  const projects = Array.isArray(window.SELECTED_PROJECTS) ? window.SELECTED_PROJECTS : [];
  const categories = {ai: 'AI 软件', tools: '桌面工具', creative: '交互作品'};
  const query = selector => document.querySelector(selector);
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));
  }

  function projectUrl(project) {
    return './project.html?id=' + encodeURIComponent(project.id);
  }

  function externalLink(url, label, className = 'work-link') {
    return `<a class="${className}" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} <span aria-hidden="true">↗</span></a>`;
  }

  function tagList(project, className = 'tag-list') {
    return `<ul class="${className}">${project.tags.map(tag => `<li class="tag">${escapeHTML(tag)}</li>`).join('')}</ul>`;
  }

  function projectCover() {
    return `<div class="type-cover" aria-hidden="true">
      <span class="cover-top">WINDOWS / TRANSLATION TOOL</span>
      <span class="cover-letter">Aa<em>译</em></span>
      <div class="cover-bottom"><strong>TRANSLATEPET</strong><small>OCR / TRANSLATE</small></div>
    </div>`;
  }

  function renderImageFallback(event) {
    const image = event.currentTarget;
    image.hidden = true;
    const message = document.createElement('p');
    message.className = 'image-fallback';
    message.textContent = '图片暂未载入，可继续查看项目说明。';
    image.parentElement.append(message);
  }

  function watchImages(root = document) {
    root.querySelectorAll('img').forEach(image => {
      image.addEventListener('error', renderImageFallback, {once: true});
    });
  }

  function initializeNavigation() {
    const header = query('#siteNav');
    const menu = query('#menuToggle');
    const links = query('#mainNav');
    if (!header || !menu || !links) return;

    const mobile = matchMedia('(max-width: 720px)');
    const detailPage = document.body.classList.contains('project-page');

    function closeMenu(restoreFocus = false) {
      menu.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
      if (restoreFocus) menu.focus();
    }

    function updateMenu() {
      menu.hidden = !mobile.matches;
      closeMenu();
    }

    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      links.classList.toggle('is-open', open);
    });
    links.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    document.addEventListener('click', event => {
      if (!header.contains(event.target)) closeMenu();
    });
    mobile.addEventListener('change', updateMenu);
    updateMenu();

    let spread = null;
    let scheduled = false;
    function updateHeader() {
      scheduled = false;
      const nextSpread = detailPage || mobile.matches || window.scrollY > 40;
      header.classList.toggle('nav--scrolled', window.scrollY > 20);
      if (nextSpread === spread) return;

      const elements = [header.querySelector('.brand'), links];
      const previous = elements.map(element => element.getBoundingClientRect());
      header.classList.toggle('nav--spread', nextSpread);
      header.classList.toggle('nav--clustered', !nextSpread);
      if (spread !== null && !motionPreference.matches && !mobile.matches) {
        elements.forEach((element, index) => {
          element.getAnimations().forEach(animation => animation.cancel());
          const current = element.getBoundingClientRect();
          element.animate([
            {transform: `translateX(${previous[index].left - current.left}px)`},
            {transform: 'translateX(0)'}
          ], {duration: 500, easing: 'cubic-bezier(.16,1,.3,1)'});
        });
      }
      spread = nextSpread;
    }
    function scheduleHeader() {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(updateHeader);
      }
    }
    window.addEventListener('scroll', scheduleHeader, {passive: true});
    mobile.addEventListener('change', updateHeader);
    updateHeader();
  }

  function initializeShowroom() {
    const panel = query('#casePanel');
    const reel = query('#caseTabs');
    if (!panel || !reel) return;

    let filter = 'all';
    let activeId = projects[0]?.id;

    function visibleProjects() {
      return projects.filter(project => filter === 'all' || project.category === filter);
    }

    function renderPanel(updateUrl = false) {
      const visible = visibleProjects();
      const project = visible.find(item => item.id === activeId) || visible[0];
      if (!project) {
        panel.innerHTML = '<p class="case-loading">当前分类暂时没有项目。</p>';
        query('#visibleCount').textContent = '00';
        query('#casePosition').textContent = '00 / 00';
        query('#previousCase').disabled = true;
        query('#nextCase').disabled = true;
        query('#selectionStatus').textContent = '当前分类暂时没有项目。';
        return;
      }
      activeId = project.id;
      panel.setAttribute('aria-labelledby', 'tab-' + project.id);

      panel.innerHTML = `
        <div class="work-stage__media">
          <figure class="work-preview">
            <div class="work-preview__chrome"><span>${escapeHTML(project.platform)}</span></div>
            <a class="work-preview__image-link" href="${projectUrl(project)}" aria-label="查看${escapeHTML(project.name)}的详情">
              ${project.image ? `<img class="work-preview__image" src="${escapeHTML(project.image)}" alt="${escapeHTML(project.alt)}" width="${project.imageWidth}" height="${project.imageHeight}" decoding="async">` : projectCover()}
            </a>
            <figcaption>${escapeHTML(project.imageLabel)}</figcaption>
          </figure>
        </div>
        <div class="work-stage__content">
          <div class="work-feature__top"><span>${escapeHTML(project.kind)}</span></div>
          <h3>${escapeHTML(project.english)}</h3>
          <p class="work-stage__name">${escapeHTML(project.name)}</p>
          <p>${escapeHTML(project.summary)}</p>
          <div class="work-stage__specs">
            <div><span>当前状态</span><strong>${escapeHTML(project.status)}</strong></div>
            <div><span>实现内容</span><strong>${escapeHTML(project.highlights[0])}</strong></div>
          </div>
          ${tagList(project)}
          <div class="work-actions">
            <a class="work-link" href="${projectUrl(project)}">项目详情 <span aria-hidden="true">↗</span></a>
            ${externalLink(project.demo || project.repo, project.demo ? project.demoLabel : '查看源码')}
          </div>
        </div>
      `;

      const position = visible.indexOf(project) + 1;
      query('#visibleCount').textContent = String(visible.length).padStart(2, '0');
      query('#casePosition').textContent = String(position).padStart(2, '0') + ' / ' + String(visible.length).padStart(2, '0');
      query('#previousCase').disabled = visible.length < 2;
      query('#nextCase').disabled = visible.length < 2;
      query('#selectionStatus').textContent = '当前项目为' + project.name + '，第' + position + '项，共' + visible.length + '项。';

      reel.querySelectorAll('[role="tab"]').forEach(button => {
        const selected = button.dataset.project === project.id;
        button.classList.toggle('work-reel__item--active', selected);
        button.setAttribute('aria-selected', String(selected));
        button.tabIndex = selected ? 0 : -1;
      });
      if (updateUrl) history.replaceState(null, '', '#project-' + project.id);
      watchImages(panel);
    }

    function renderReel() {
      reel.innerHTML = visibleProjects().map(project => `
        <button class="work-reel__item" id="tab-${escapeHTML(project.id)}" type="button"
          role="tab" data-project="${escapeHTML(project.id)}" aria-controls="casePanel"
          aria-selected="false" tabindex="-1">
          <span>${escapeHTML(project.number)}</span>
          <strong>${escapeHTML(project.shortName || project.name)}</strong>
          <em>${escapeHTML(categories[project.category])}</em>
        </button>
      `).join('');
    }

    function chooseProject(id, focus = false) {
      if (!visibleProjects().some(project => project.id === id)) return;
      activeId = id;
      renderPanel(true);
      if (focus) document.getElementById('tab-' + id)?.focus();
    }

    function stepProject(delta, focus = false) {
      const visible = visibleProjects();
      const current = Math.max(0, visible.findIndex(project => project.id === activeId));
      const next = (current + delta + visible.length) % visible.length;
      if (visible[next]) chooseProject(visible[next].id, focus);
    }

    function setFilter(category) {
      filter = category;
      document.querySelectorAll('[data-filter]').forEach(button => {
        const selected = button.dataset.filter === category;
        button.classList.toggle('filter-button--active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      renderReel();
      renderPanel(true);
    }

    function followProjectHash(initial = false) {
      if (!location.hash.startsWith('#project-')) return;
      const id = location.hash.slice(9).toLowerCase();
      const project = projects.find(item => item.id.toLowerCase() === id || item.aliases?.includes(id));
      if (project) {
        activeId = project.id;
        setFilter('all');
      }
      query('#work').scrollIntoView({block: 'start', behavior: initial ? 'instant' : 'auto'});
    }

    reel.addEventListener('click', event => {
      const button = event.target.closest('[data-project]');
      if (button) chooseProject(button.dataset.project);
    });
    reel.addEventListener('keydown', event => {
      const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!event.target.closest('[role="tab"]') || !keys.includes(event.key)) return;
      event.preventDefault();
      const visible = visibleProjects();
      if (event.key === 'Home') chooseProject(visible[0].id, true);
      else if (event.key === 'End') chooseProject(visible.at(-1).id, true);
      else stepProject(['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1, true);
    });
    query('#previousCase').addEventListener('click', () => stepProject(-1));
    query('#nextCase').addEventListener('click', () => stepProject(1));
    document.querySelectorAll('[data-filter]').forEach(button => {
      button.addEventListener('click', () => setFilter(button.dataset.filter));
    });
    window.addEventListener('hashchange', () => followProjectHash());
    renderReel();
    renderPanel();
    followProjectHash(true);
  }

  function initializeProjectPage() {
    const main = query('#projectMain');
    if (!main) return;
    const id = new URLSearchParams(location.search).get('id');
    const project = projects.find(item => item.id === id || item.aliases?.includes(id));
    if (!project) {
      main.innerHTML = `<section class="invalid-project">
        <h1>这个项目暂不在精选作品中。</h1>
        <p>可以返回作品集继续浏览。</p>
        <a class="button button-dark" href="./#work">返回作品集 ↗</a>
      </section>`;
      query('meta[name="robots"]')?.setAttribute('content', 'noindex,follow');
      return;
    }

    document.title = project.name + ' — 施金翔的项目档案';
    query('meta[name="description"]')?.setAttribute('content', project.summary);
    query('meta[name="robots"]')?.setAttribute('content', 'index,follow');
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://shijinxiang.github.io/project.html?id=' + encodeURIComponent(project.id);
    document.head.append(canonical);
    const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

    main.innerHTML = `
      <div class="project-topline">
        <a href="./#project-${escapeHTML(project.id)}">← 返回作品展台</a>
        <span>${escapeHTML(categories[project.category])}</span>
        <span>${escapeHTML(project.year)}</span>
      </div>
      <h1 class="project-title">${escapeHTML(project.english)}</h1>
      <div class="project-intro">
        <div>
          <h2>${escapeHTML(project.name)}</h2>
          <p>${escapeHTML(project.summary)}</p>
          <div class="case-actions">
            ${externalLink(project.repo, '查看源码', 'button button-dark')}
            ${project.demo ? externalLink(project.demo, project.demoLabel, 'button button-line') : ''}
          </div>
        </div>
        <dl class="detail-meta">
          <div><dt>方向</dt><dd>${escapeHTML(project.kind)}</dd></div>
          <div><dt>状态</dt><dd>${escapeHTML(project.status)}</dd></div>
          <div><dt>交付</dt><dd>${escapeHTML(project.deliverable)}</dd></div>
          <div><dt>技术</dt><dd>${tagList(project, 'tech-tags')}</dd></div>
        </dl>
      </div>
      <figure class="detail-hero-image">
        ${project.image ? `<button type="button" data-image="0" aria-label="放大查看${escapeHTML(project.name)}图片"><img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.alt)}" width="${project.imageWidth}" height="${project.imageHeight}" fetchpriority="high"></button>` : projectCover()}
      </figure>
      <div class="detail-caption"><span>${escapeHTML(project.imageLabel)}</span>${project.image ? '<button type="button" data-image="0">放大查看 ↗</button>' : ''}</div>
      <section class="case-story" aria-labelledby="storyTitle">
        <h2 id="storyTitle">从场景，<br>到实现。</h2>
        <dl class="story-lines">
          <div><dt>使用场景</dt><dd>${escapeHTML(project.context)}</dd></div>
          <div><dt>实现思路</dt><dd>${escapeHTML(project.approach)}</dd></div>
          <div><dt>当前成果</dt><dd>${escapeHTML(project.result)}</dd></div>
        </dl>
      </section>
      <section class="detail-feature-section" aria-labelledby="featuresTitle">
        <div class="detail-feature-heading"><h2 id="featuresTitle">实现重点</h2></div>
        <div class="detail-features">
          ${project.features.map(feature => `<article class="detail-feature"><h3>${escapeHTML(feature.title)}</h3><p>${escapeHTML(feature.body)}</p></article>`).join('')}
        </div>
        <ol class="flow-list" aria-label="项目流程">${project.flow.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol>
        <p class="project-note">${escapeHTML(project.note)}</p>
      </section>
      ${project.gallery.length > 1 ? `<section class="detail-gallery" aria-label="更多项目截图">
        ${project.gallery.slice(1).map((image, index) => `<figure class="gallery-item">
          <button type="button" data-image="${index + 1}" aria-label="放大查看${escapeHTML(image.alt)}"><img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt)}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async"></button>
          <figcaption>${escapeHTML(image.caption)}</figcaption>
        </figure>`).join('')}
      </section>` : ''}
      <div class="project-bottom">
        <a class="button button-line" href="./#project-${escapeHTML(project.id)}">返回作品展台 ↖</a>
        <div class="project-next"><span class="micro">下一个项目</span><a href="${projectUrl(nextProject)}">${escapeHTML(nextProject.name)} ↗</a></div>
      </div>
    `;

    const dialog = query('#imageDialog');
    let opener = null;
    main.addEventListener('click', event => {
      const button = event.target.closest('[data-image]');
      if (!button) return;
      const image = project.gallery[Number(button.dataset.image)];
      if (!image) return;
      opener = button;
      query('#expandedImage').src = image.src;
      query('#expandedImage').alt = image.alt;
      query('#imageTitle').textContent = image.caption;
      dialog.showModal();
      document.body.classList.add('modal-open');
    });
    query('#closeImage').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      opener?.focus({preventScroll: true});
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (outside) dialog.close();
    });
  }

  function initializeSectionMotion() {
    if (motionPreference.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!motionPreference.matches) {
          entry.target.animate([
            {opacity: .5, transform: 'translateY(22px)'},
            {opacity: 1, transform: 'translateY(0)'}
          ], {duration: 720, easing: 'cubic-bezier(.16,1,.3,1)'});
        }
        observer.unobserve(entry.target);
      });
    }, {threshold: .15});
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  }

  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });
  initializeNavigation();
  initializeShowroom();
  initializeProjectPage();
  initializeSectionMotion();
  watchImages();
})();
