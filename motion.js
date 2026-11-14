(() => {
  'use strict';

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = value => Math.max(0, Math.min(1, value));

  function documentTop(element) {
    let top = 0;
    for (let current = element; current; current = current.offsetParent) {
      top += current.offsetTop;
    }
    return top;
  }

  function initializeHeroMotion() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const panel = hero.querySelector('.hero-panel');
    const cursor = document.createElement('div');
    cursor.className = 'liquid-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<div class="liquid-cursor__motion"><span class="liquid-cursor__shape"></span></div>';
    document.body.append(cursor);
    const cursorMotion = cursor.firstElementChild;

    let enabled = false;
    let inside = false;
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let stretch = 0;
    let angle = 0;

    function resetParallax() {
      hero.style.setProperty('--hero-pointer-x', '0px');
      hero.style.setProperty('--hero-pointer-y', '0px');
      hero.style.setProperty('--ghost-pointer-x', '0px');
      hero.style.setProperty('--ghost-pointer-y', '0px');
      panel?.style.setProperty('--panel-pointer-x', '0px');
      panel?.style.setProperty('--panel-rotate-x', '0deg');
      panel?.style.setProperty('--panel-rotate-y', '0deg');
    }

    function renderPointer() {
      frame = 0;
      if (!enabled || document.hidden) return;
      const previousX = cursorX;
      const previousY = cursorY;
      cursorX += (targetX - cursorX) * .22;
      cursorY += (targetY - cursorY) * .22;
      smoothX += (pointerX - smoothX) * .12;
      smoothY += (pointerY - smoothY) * .12;

      const velocityX = cursorX - previousX;
      const velocityY = cursorY - previousY;
      const speed = Math.hypot(velocityX, velocityY);
      const targetStretch = Math.min(Math.min(speed, 42) / 26, .85);
      stretch += (targetStretch - stretch) * .28;
      if (speed > .08) angle = Math.atan2(velocityY, velocityX);
      cursorMotion.style.transform =
        `translate3d(${cursorX}px,${cursorY}px,0) rotate(${angle}rad) scale(${1 + stretch},${1 - stretch * .6})`;

      hero.style.setProperty('--hero-pointer-x', (-12 * smoothX).toFixed(3) + 'px');
      hero.style.setProperty('--hero-pointer-y', (-8 * smoothY).toFixed(3) + 'px');
      hero.style.setProperty('--ghost-pointer-x', (-30 * smoothX).toFixed(3) + 'px');
      hero.style.setProperty('--ghost-pointer-y', (-22 * smoothY).toFixed(3) + 'px');
      panel?.style.setProperty('--panel-pointer-x', (16 * smoothX).toFixed(3) + 'px');
      panel?.style.setProperty('--panel-rotate-x', (-6 * smoothY).toFixed(3) + 'deg');
      panel?.style.setProperty('--panel-rotate-y', (6 * smoothX).toFixed(3) + 'deg');

      if (inside || Math.abs(smoothX) + Math.abs(smoothY) > .001) {
        frame = requestAnimationFrame(renderPointer);
      } else {
        resetParallax();
      }
    }

    function startFrame() {
      if (!frame) frame = requestAnimationFrame(renderPointer);
    }

    function enter(event) {
      if (!enabled || event.pointerType === 'touch') return;
      targetX = cursorX = event.clientX;
      targetY = cursorY = event.clientY;
      inside = true;
      cursor.classList.add('is-visible');
      startFrame();
    }

    function move(event) {
      if (!enabled || event.pointerType === 'touch') return;
      if (!inside) enter(event);
      targetX = event.clientX;
      targetY = event.clientY;
      const bounds = hero.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
      startFrame();
    }

    function leave() {
      inside = false;
      pointerX = 0;
      pointerY = 0;
      cursor.classList.remove('is-visible');
      if (enabled) startFrame();
    }

    function updateAvailability() {
      enabled = finePointer.matches && !reducedMotion.matches && innerWidth > 720;
      hero.classList.toggle('hero--liquid', enabled);
      cursor.hidden = !enabled;
      if (!enabled) {
        inside = false;
        cancelAnimationFrame(frame);
        frame = 0;
        smoothX = smoothY = pointerX = pointerY = 0;
        cursor.classList.remove('is-visible');
        resetParallax();
      }
    }

    hero.addEventListener('pointerenter', enter);
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', leave);
    hero.addEventListener('pointercancel', leave);
    window.addEventListener('resize', updateAvailability);
    reducedMotion.addEventListener('change', updateAvailability);
    finePointer.addEventListener('change', updateAvailability);
    document.addEventListener('keydown', event => {
      if (event.key === 'Tab' || event.key === 'Escape') leave();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        leave();
      } else if (inside) startFrame();
    });
    window.addEventListener('pagehide', () => {
      cancelAnimationFrame(frame);
      frame = 0;
      inside = false;
      cursor.classList.remove('is-visible');
    });
    updateAvailability();

    if (!reducedMotion.matches) {
      let characterIndex = 0;
      hero.querySelectorAll('.js-hero-line').forEach(line => {
        const text = line.textContent.trim();
        line.setAttribute('aria-label', text);
        const characters = Array.from(text).map(character => {
          const span = document.createElement('span');
          span.className = 'hero-char';
          span.textContent = character === ' ' ? '\u00a0' : character;
          span.setAttribute('aria-hidden', 'true');
          return span;
        });
        line.replaceChildren(...characters);
        characters.forEach(character => {
          const index = characterIndex++;
          character.animate([
            {opacity: 0, transform: `translateY(118%) rotate(${index % 2 ? 5 : -5}deg) scaleY(.84)`},
            {opacity: 1, transform: 'translateY(0) rotate(0) scaleY(1)'}
          ], {
            duration: 1120,
            delay: 240 + index * 14,
            easing: 'cubic-bezier(.16,1,.3,1)',
            fill: 'both'
          });
        });
      });
    }
  }

  function initializeScrollMotion() {
    const hero = document.querySelector('.hero');
    const pane = document.querySelector('#projectScroll');
    const cards = Array.from(document.querySelectorAll('[data-notes-card]'));
    const states = [];
    const seen = new Set();

    function register(selector, type) {
      document.querySelectorAll(selector).forEach(element => {
        if (seen.has(element)) return;
        seen.add(element);
        element.dataset.scrollReveal = type;
        states.push({element, type, top: 0, current: null});
      });
    }

    register('.section-header .section-title, .project-title, .about__lead', 'heading');
    register('.section-header .section-copy', 'right');
    register('.project-scroll-layout, .work-showroom, .detail-hero-image, .detail-feature-section', 'frame');
    register('.work-bottom, .about__say, .project-intro, .case-story, .contact-row, .project-bottom', 'rise');
    register('.about__top, .footer-bottom, .detail-caption', 'wipe');
    register('.gallery-item:nth-child(odd)', 'left');
    register('.gallery-item:nth-child(even)', 'right');

    const cardStates = cards.map(element => ({element, top: 0, current: null}));
    let heroTop = 0;
    let heroHeight = 1;
    let frame = 0;
    let needsMeasurement = true;
    let previousTime = 0;
    let readingIndex = -1;

    function measure() {
      states.forEach(state => { state.top = documentTop(state.element); });
      cardStates.forEach(state => {
        state.top = state.element.offsetTop + state.element.parentElement.offsetTop;
      });
      if (hero) {
        heroTop = documentTop(hero);
        heroHeight = hero.offsetHeight || 1;
      }
      needsMeasurement = false;
    }

    function draw(time) {
      frame = 0;
      if (document.hidden) return;
      const reduce = reducedMotion.matches;
      if (needsMeasurement) measure();
      const elapsed = Math.min(48, previousTime ? time - previousTime : 16.7);
      previousTime = time;
      const smoothing = 1 - Math.exp(-elapsed / 75);
      const scroll = window.scrollY;
      const viewport = innerHeight;
      let pending = false;

      states.forEach(state => {
        const screenTop = state.top - scroll;
        const target = reduce ? 1 : clamp((viewport * .93 - screenTop) / (viewport * .41));
        if (state.current === null) state.current = target;
        else state.current += (target - state.current) * smoothing;
        if (Math.abs(target - state.current) > .001) pending = true;
        else state.current = target;
        state.element.style.setProperty('--reveal-progress', state.current.toFixed(4));
      });

      if (hero) {
        const progress = reduce ? 0 : clamp((scroll - heroTop) / heroHeight);
        hero.style.setProperty('--hero-scroll-y', (-42 * progress).toFixed(3) + 'px');
        hero.style.setProperty('--ghost-scroll-y', (36 * progress).toFixed(3) + 'px');
      }

      if (pane && cardStates.length) {
        const height = pane.clientHeight;
        const position = pane.scrollTop;
        const maximum = Math.max(0, pane.scrollHeight - height);
        let currentIndex = 0;
        cardStates.forEach((state, index) => {
          const relativeTop = state.top - position;
          const target = reduce ? 1 : clamp((height * .90 - relativeTop) / (height * .38));
          if (state.current === null) state.current = target;
          else state.current += (target - state.current) * smoothing;
          if (Math.abs(target - state.current) > .001) pending = true;
          else state.current = target;
          state.element.style.setProperty('--card-progress', state.current.toFixed(4));
          if (state.top <= position + height * .30) currentIndex = index;
        });
        if (maximum > 0 && position >= maximum - 2) currentIndex = cardStates.length - 1;
        if (currentIndex !== readingIndex) {
          readingIndex = currentIndex;
          document.querySelector('#notesCurrentName').textContent =
            cardStates[currentIndex].element.querySelector('.note-project-name').textContent;
          document.querySelector('#notesPosition').textContent =
            String(currentIndex + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
        }
        const progress = maximum > 0 ? position / maximum : 1;
        document.querySelector('#notesProgress').style.transform = `scaleX(${progress})`;
      }
      document.documentElement.classList.toggle('motion-ready', !reduce);
      if (pending && !reduce) frame = requestAnimationFrame(draw);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function requestMeasurement() {
      needsMeasurement = true;
      schedule();
    }

    function updatePreference() {
      if (reducedMotion.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        document.documentElement.classList.remove('motion-ready');
        hero?.style.setProperty('--hero-scroll-y', '0px');
        hero?.style.setProperty('--ghost-scroll-y', '0px');
        document.querySelectorAll('.hero-char').forEach(character => {
          character.getAnimations().forEach(animation => animation.cancel());
        });
      }
      requestMeasurement();
    }

    window.addEventListener('scroll', schedule, {passive: true});
    pane?.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', requestMeasurement);
    window.addEventListener('pageshow', requestMeasurement);
    window.addEventListener('pagehide', () => {
      cancelAnimationFrame(frame);
      frame = 0;
    });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) requestMeasurement();
    });
    reducedMotion.addEventListener('change', updatePreference);
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(requestMeasurement);
      const main = document.querySelector('main');
      if (main) observer.observe(main);
      if (pane) observer.observe(pane);
    }
    document.fonts?.ready.then(requestMeasurement);
    updatePreference();
    requestMeasurement();
  }

  initializeHeroMotion();
  initializeScrollMotion();
})();
