/* ArranzER — selector de idioma ES / EN
 *
 * Cómo funciona:
 *  - El español es el texto que ya está escrito en cada página HTML.
 *  - Los elementos con data-i18n="clave" se traducen al inglés con el diccionario EN de abajo.
 *  - Si cambias un texto en español en el HTML, cambia también su versión en inglés aquí
 *    (busca la misma clave).
 *  - El idioma elegido se recuerda en el navegador. La primera vez se elige según el idioma
 *    del navegador (español → ES, cualquier otro → EN).
 */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Textos estáticos en inglés (clave = valor de data-i18n en el HTML)
  // ---------------------------------------------------------------------------
  var EN = {
    // Comunes
    nav_community: 'Community',
    nav_projects: 'Projects',
    nav_about: 'About us',
    footer_text: 'LabVIEW community · content under',
    back_home: '← back to home',
    tag_string: 'type: string',
    tag_array: 'type: array[]',
    tag_cluster: 'type: cluster',

    // Página principal
    title_index: 'ArranzER — LabVIEW Community',
    meta_index: 'ArranzER: a community of LabVIEW developers. Projects, resources and people who really wire things up.',
    hero_eyebrow: '// LabVIEW community',
    hero_h1: 'We wire up ideas in <span class="accent">LabVIEW</span>.',
    hero_lead: 'ArranzER is a meeting point for people who design, debug and share virtual instrumentation. ' +
      'Open source, real-world examples and a small community that grows wire by wire.',
    diagram_aria: 'Diagram: Community connected to the GitHub project and to Members',
    svg_community: 'COMMUNITY',
    svg_main: 'MAIN_PROJECT.vi',
    svg_repo: 'repository · GitHub',
    svg_inputs: 'inputs: ideas, bugs, PRs',
    svg_outputs: 'outputs: releases, docs',
    svg_view_code: 'view code',
    svg_members: 'MEMBERS',
    leg_1: 'Community → Project',
    leg_2: 'Project → GitHub',
    leg_3: 'Project → Members',
    about_h2: 'What is ArranzER?',
    about_p: 'We are a group of LabVIEW developers who share projects, design patterns, and solutions to ' +
      'real-world virtual instrumentation challenges. If you work with DAQ, instrument control, or simply ' +
      'enjoy organizing colorful wires, this is the place for you.',

    // Nosotros
    title_about: 'Who we are — ArranzER',
    meta_about: 'Meet Jon Arranz and Ederson Ramalho, co-founders of the ArranzER LabVIEW community.',
    eyebrow_about: '· // who we are',
    about_title: 'Who we are',
    about_lead: 'The two people behind ArranzER.',
    role_jon: 'Co-founder · CLD',
    role_ederson: 'Co-founder · CLA · CPI · LV Champion 🏆',
    alt_jon: 'Photo of Jon Arranz',
    alt_ederson: 'Photo of Ederson Ramalho',
    aria_li_jon: 'Jon Arranz on LinkedIn',
    aria_li_ederson: 'Ederson Ramalho on LinkedIn',
    bio_jon: 'LabVIEW developer since 2011, working on multidisciplinary projects. In 2021 he earned the ' +
      'Certified LabVIEW Developer (CLD) certification and is currently preparing for the Certified LabVIEW ' +
      'Architect (CLA). He works at PLD Space, in the Ground Systems team, developing tests for the different ' +
      'components of the Miura 5 rocket with LabVIEW. He is expanding his skills in RealTime (RT) programming, ' +
      'DQMH and LVOOP. He is passionate about space (especially astronautics), science, cooking and travelling ' +
      'to discover different cultures. Always willing to listen to anyone who can teach him or explain something ' +
      'new and interesting about any discipline.',
    bio_ederson: 'Ederson Ramalho has been programming in LabVIEW since 2009. He has an extensive knowledge in ' +
      'instruments communication, data acquisition and machines automation. He became CLA in 2019, CPI in 2020 ' +
      'and a LabVIEW Champion 🏆 in 2023.',

    // Proyectos
    title_projects: 'Projects — ArranzER',
    meta_projects: 'All the ArranzER community repositories on GitHub.',
    eyebrow_projects: '· // all repositories',
    proj_title: 'ArranzER projects',
    proj_lead: 'Everything we share as a community, live from GitHub: code, examples and tools for LabVIEW.',
    btn_github: 'View GitHub profile',
    btn_vipm: 'View VIPM community',
    vipm_h2: 'VIPM packages',
    pkg_desc: 'Adjusts the front panels of every VI in a project based on the structure of its connector pane. ' +
      'Using ZAlign, it automatically aligns front-panel elements across many VIs at once, which is handy ' +
      'when a shared typedef changes.',
    pkg_version: 'version 1.0.0.1',
    pkg_date: 'released Aug 28, 2026',
    pkg_lv: 'LabVIEW 2023 Q3 or later',
    pkg_view: 'View on VIPM',
    pkg_forum: 'Discussion',
    pkg_note: '// list maintained by hand · all packages at vipm.io/profile/arranzer-es'
  };

  // ---------------------------------------------------------------------------
  // Textos dinámicos (los usa la lista de repos de proyectos.html)
  // ---------------------------------------------------------------------------
  var DYN = {
    es: {
      loading: 'Cargando repositorios…',
      count: function (n) {
        return n + ' repositorio' + (n === 1 ? '' : 's') + ' público' + (n === 1 ? '' : 's');
      },
      noDesc: 'Sin descripción todavía.',
      noLang: 'Sin lenguaje detectado',
      updated: function (ago) { return 'actualizado ' + ago; },
      viewCode: 'Ver código',
      projectSite: 'Sitio del proyecto',
      none: function (org) {
        return 'Todavía no hay repositorios públicos en <strong>' + org + '</strong>.';
      },
      httpError: function (status) { return 'GitHub respondió con estado ' + status; },
      error: function (msg, link) {
        return 'No se han podido cargar los repositorios ahora mismo (' + msg + '). Visita ' + link + ' directamente.';
      },
      ago: function (days) {
        if (days < 1) return 'hoy';
        if (days === 1) return 'hace 1 día';
        if (days < 30) return 'hace ' + days + ' días';
        var months = Math.floor(days / 30);
        if (months < 12) return 'hace ' + months + ' ' + (months === 1 ? 'mes' : 'meses');
        var years = Math.floor(months / 12);
        return 'hace ' + years + ' ' + (years === 1 ? 'año' : 'años');
      }
    },
    en: {
      loading: 'Loading repositories…',
      count: function (n) {
        return n + ' public repositor' + (n === 1 ? 'y' : 'ies');
      },
      noDesc: 'No description yet.',
      noLang: 'No language detected',
      updated: function (ago) { return 'updated ' + ago; },
      viewCode: 'View code',
      projectSite: 'Project site',
      none: function (org) {
        return 'There are no public repositories in <strong>' + org + '</strong> yet.';
      },
      httpError: function (status) { return 'GitHub responded with status ' + status; },
      error: function (msg, link) {
        return "Couldn't load the repositories right now (" + msg + '). Please visit ' + link + ' directly.';
      },
      ago: function (days) {
        if (days < 1) return 'today';
        if (days === 1) return '1 day ago';
        if (days < 30) return days + ' days ago';
        var months = Math.floor(days / 30);
        if (months < 12) return months + ' ' + (months === 1 ? 'month' : 'months') + ' ago';
        var years = Math.floor(months / 12);
        return years + ' ' + (years === 1 ? 'year' : 'years') + ' ago';
      }
    }
  };

  // ---------------------------------------------------------------------------
  // Lógica
  // ---------------------------------------------------------------------------
  var STORE_KEY = 'arranzer-lang';
  var lang = 'es';

  function detect() {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved === 'es' || saved === 'en') return saved;
    } catch (e) { /* localStorage puede no estar disponible */ }
    var nav = (navigator.language || 'es').toLowerCase();
    return nav.indexOf('es') === 0 ? 'es' : 'en';
  }

  function applyStatic() {
    document.documentElement.lang = lang;

    // Textos / HTML interno
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el.hasAttribute('data-es')) el.setAttribute('data-es', el.innerHTML); // guarda el español original
      var key = el.getAttribute('data-i18n');
      el.innerHTML = (lang === 'en' && EN[key] !== undefined) ? EN[key] : el.getAttribute('data-es');
    }

    // Atributos (alt, aria-label, content…): data-i18n-attr="atributo:clave,atributo2:clave2"
    var attrNodes = document.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrNodes.length; j++) {
      var pairs = attrNodes[j].getAttribute('data-i18n-attr').split(',');
      for (var k = 0; k < pairs.length; k++) {
        var parts = pairs[k].split(':');
        var attr = parts[0].trim(), akey = parts[1].trim();
        var saved = 'data-es-' + attr;
        if (!attrNodes[j].hasAttribute(saved)) attrNodes[j].setAttribute(saved, attrNodes[j].getAttribute(attr) || '');
        attrNodes[j].setAttribute(attr, (lang === 'en' && EN[akey] !== undefined) ? EN[akey] : attrNodes[j].getAttribute(saved));
      }
    }

    // Enlaces que cambian según el idioma: data-href-en="..."
    var links = document.querySelectorAll('[data-href-en]');
    for (var m = 0; m < links.length; m++) {
      if (!links[m].hasAttribute('data-href-es')) links[m].setAttribute('data-href-es', links[m].getAttribute('href'));
      links[m].setAttribute('href', lang === 'en' ? links[m].getAttribute('data-href-en') : links[m].getAttribute('data-href-es'));
    }

    // Estado del selector
    var buttons = document.querySelectorAll('.lang-switch button');
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].setAttribute('aria-pressed', buttons[b].getAttribute('data-set-lang') === lang ? 'true' : 'false');
    }
  }

  function setLang(code) {
    if (code !== 'es' && code !== 'en') return;
    lang = code;
    try { localStorage.setItem(STORE_KEY, code); } catch (e) { /* ignorar */ }
    applyStatic();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function injectStyles() {
    var css = [
      '.lang-switch{display:inline-flex; border:1px solid var(--border); border-radius:6px; overflow:hidden; margin-left:4px;}',
      ".lang-switch button{font-family:'IBM Plex Mono',monospace; font-size:.74rem; font-weight:600; letter-spacing:.06em;",
      '  padding:4px 9px; border:0; background:transparent; color:var(--ink-soft); cursor:pointer;}',
      '.lang-switch button:hover{color:var(--ink);}',
      '.lang-switch button[aria-pressed="true"]{background:var(--ink); color:#fff;}',
      '.lang-switch button:focus-visible{outline:2px solid var(--wire-int); outline-offset:-2px;}',
      '.nav-inner{flex-wrap:wrap; row-gap:2px;}',
      'nav.links{align-items:center; flex-wrap:wrap;}'
    ].join('\n');
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildSwitch() {
    var nav = document.querySelector('nav.links');
    if (!nav) return;
    var box = document.createElement('div');
    box.className = 'lang-switch';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Idioma / Language');
    ['es', 'en'].forEach(function (code) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = code.toUpperCase();
      btn.setAttribute('data-set-lang', code);
      btn.addEventListener('click', function () { setLang(code); });
      box.appendChild(btn);
    });
    nav.appendChild(box);
  }

  // API para otros scripts de la página
  window.ArranzLang = {
    get: function () { return lang; },
    set: setLang,
    dyn: function (key) {
      var v = DYN[lang][key];
      if (typeof v === 'function') return v.apply(null, Array.prototype.slice.call(arguments, 1));
      return v;
    }
  };

  lang = detect();
  injectStyles();
  buildSwitch();
  applyStatic();
})();
