(function () {
  "use strict";

  const source = window.SITE;
  const main = document.getElementById("contenido");
  const page = document.body.dataset.page;

  if (!source || !window.I18N || !main) {
    if (main) {
      main.innerHTML =
        '<div class="empty"><h1>No pude leer el contenido</h1><p>Revisá las comas y las comillas de js/content.js.</p></div>';
    }
    return;
  }

  const storedLang = localStorage.getItem("portfolio-lang");
  const lang = storedLang === "en" || storedLang === "es" ? storedLang : "es";
  document.documentElement.lang = lang;
  const pack = window.I18N[lang];
  const ui = pack.ui;

  function mergeMoments(base, extra) {
    return (base || []).map((moment, index) => ({ ...moment, ...(extra?.[index] || {}) }));
  }

  function mergeSteps(base, extra) {
    return (base || []).map((step, index) => ({ ...step, ...(extra?.[index] || {}) }));
  }

  function stageRank(title) {
    const order = ["Mi rol", "Problema", "Proceso", "Solución", "Resultados"];
    const index = order.indexOf(title);
    return index === -1 ? order.length : index;
  }

  function mergeProject(project, extra) {
    const ordered = [...project.sections].sort((a, b) => stageRank(a.title) - stageRank(b.title));
    const sections = ordered.map((section, index) => {
      const over = extra?.sections?.[index];
      if (!over) return section;
      return {
        ...section,
        title: over.title || section.title,
        paragraphs: over.paragraphs || section.paragraphs,
        images: (section.images || []).map((image, imageIndex) => ({
          ...image,
          ...(over.images?.[imageIndex] || {}),
        })),
      };
    });
    if (!extra) return { ...project, sections };
    return {
      ...project,
      subtitle: extra.subtitle || project.subtitle,
      summary: extra.summary || project.summary,
      tags: extra.tags || project.tags,
      cover: { ...project.cover, ...(extra.cover || {}) },
      meta: extra.meta || project.meta,
      sections,
    };
  }

  function mergeSpoilers(base, extra) {
    return (base || []).map((item, index) => {
      const over =
        (extra || []).find((entry) => entry.project && entry.project === item.project) ||
        extra?.[index];
      if (!over?.alt) return item;
      return { ...item, alt: over.alt };
    });
  }

  function localize(raw, locale) {
    return {
      ...raw,
      role: locale.role || raw.role,
      description: locale.description || raw.description,
      hero: { ...raw.hero, ...(locale.hero || {}) },
      about: {
        ...raw.about,
        ...(locale.about || {}),
        moments: mergeMoments(raw.about.moments, locale.about?.moments),
      },
      process: {
        ...raw.process,
        ...(locale.process || {}),
        steps: mergeSteps(raw.process.steps, locale.process?.steps),
      },
      abilities: {
        ...raw.abilities,
        ...(locale.abilities || {}),
        items: (raw.abilities.items || []).map((item, index) => ({
          ...item,
          ...(locale.abilities?.items?.[index] || {}),
        })),
      },
      contact: { ...raw.contact, ...(locale.contact || {}) },
      spoilers: mergeSpoilers(raw.spoilers, locale.spoilers),
      projects: raw.projects.map((project) => mergeProject(project, locale.projects?.[project.id])),
    };
  }

  const view = localize(source, pack);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function richTitle(value) {
    return escapeHtml(value)
      .replaceAll("\n", "<br>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  function emphasizeLead(text) {
    const value = String(text).trim();
    if (/^\d+\.\s+\S/.test(value)) {
      return `<strong>${escapeHtml(value)}</strong>`;
    }
    const match = value.match(/^([^:\n]{2,48}?):\s+(\S[\s\S]*)$/);
    if (!match) return escapeHtml(value);
    const label = match[1].trim();
    const words = label.split(/\s+/).length;
    if (/[,.]/.test(label) || words > 6) return escapeHtml(value);
    return `<strong>${escapeHtml(label)}:</strong> ${escapeHtml(match[2])}`;
  }

  function paragraphs(list) {
    return (list || []).map((item) => `<p>${emphasizeLead(item)}</p>`).join("");
  }

  function isVideo(src) {
    return /\.(mp4|webm|mov|ogg)(?:$|\?)/i.test(String(src || ""));
  }

  function imgTag(image, eager) {
    if (!image || !image.src) return "";
    const src = escapeHtml(image.src);
    const alt = escapeHtml(image.alt || "");
    if (isVideo(image.src)) {
      const poster = image.poster ? ` poster="${escapeHtml(image.poster)}"` : "";
      const play = reducedMotion ? "" : " autoplay";
      return `<video src="${src}"${poster} muted loop playsinline${play} preload="metadata" aria-label="${alt}"></video>`;
    }
    return `<img src="${src}" alt="${alt}" loading="${eager ? "eager" : "lazy"}" decoding="async">`;
  }

  function mediaWithClass(image, eager, className) {
    return imgTag(image, eager).replace(/<(img|video)\b/, `<$1 class="${className}"`);
  }

  function pairImages(image, imageOn, eager, baseClass) {
    const base = imgTag(image, eager).replace(/<img\b/, `<img class="art-img"`);
    const on = imageOn && imageOn.src
      ? imgTag({ ...imageOn, alt: "" }, eager).replace(/<img\b/, `<img class="art-img art-img-on"`)
      : "";
    return base + on;
  }

  // Ilustración con estado "On": se muestra sola y alterna al entrar en pantalla.
  function artSwap(image, imageOn, eager, className) {
    if (!image || !image.src) return "";
    if (!imageOn || !imageOn.src) return mediaWithClass(image, eager, className);
    return `<span class="${className} art-swap" data-art-pair data-art-swap>${pairImages(image, imageOn, eager)}</span>`;
  }

  function figure(image, eager) {
    if (!image) return "";
    const caption = image.caption ? `<figcaption>${escapeHtml(image.caption)}</figcaption>` : "";
    return `<figure>${imgTag(image, eager)}${caption}</figure>`;
  }

  function tags(list) {
    return `<ul class="tags">${(list || []).map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>`;
  }

  function pill(project) {
    return project.example ? `<span class="pill">${escapeHtml(ui.example)}</span>` : "";
  }

  function projectUrl(id) {
    return `proyecto.html?id=${encodeURIComponent(id)}`;
  }

  function heroBackground(video) {
    if (!video || !video.src) return "";
    const poster = video.poster ? ` poster="${escapeHtml(video.poster)}"` : "";
    const play = reducedMotion ? "" : " autoplay";
    return `<video class="hero-video" src="${escapeHtml(video.src)}"${poster} muted loop playsinline${play} preload="metadata" aria-hidden="true"></video>`;
  }

  function downloadIcon() {
    return `<svg class="action-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M9.2 23.2h13.4a4.4 4.4 0 0 0 .4-8.8A6.5 6.5 0 0 0 11 11.6a4.3 4.3 0 0 0-1.8 11.6Z"/>
      <path d="M16 12.2v8.2"/>
      <path d="M12.6 17.6 16 21.2l3.4-3.6"/>
    </svg>`;
  }

  function contactActions() {
    const mail = `mailto:${view.email}?subject=${encodeURIComponent(ui.mailSubject + view.name)}`;
    const linkedinText = String(view.linkedin || "")
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");

    return `<div class="actions">
      <div class="action">
        <span class="action-label">${escapeHtml(ui.sendMail)}</span>
        <a class="action-link" href="${escapeHtml(mail)}">${escapeHtml(view.email)}</a>
      </div>
      <div class="action">
        <span class="action-label">LinkedIn</span>
        <a class="action-link" href="${escapeHtml(view.linkedin)}" target="_blank" rel="noopener noreferrer">${escapeHtml(linkedinText)}</a>
      </div>
      <div class="action">
        <span class="action-label">${escapeHtml(ui.downloadCv)}</span>
        <a class="action-link action-download" href="${escapeHtml(view.cv)}" download="${escapeHtml(view.cvFileName || "CV.pdf")}" aria-label="${escapeHtml(ui.downloadCv)}">
          ${downloadIcon()}
        </a>
      </div>
    </div>`;
  }

  function renderHome() {
    const cards = view.projects
      .map((project, index) => {
        const number = String(index + 1).padStart(2, "0");
        return `<a class="stack-card" style="--i:${index}" href="${projectUrl(project.id)}">
          <div class="stack-card-inner">
            <div class="stack-bar">
              <span class="stack-index">${number}</span>
              <span class="stack-title">${escapeHtml(project.title)}</span>
              <span class="year">${escapeHtml(project.year)}</span>
            </div>
            <div class="stack-card-body">
              <div class="stack-copy">
                <p class="summary">${escapeHtml(project.summary)}</p>
                <div class="kicker-row">${tags(project.tags)}${pill(project)}</div>
                <span class="text-link">${escapeHtml(ui.viewCase)}</span>
              </div>
              <div class="stack-card-media">${imgTag(project.cover, false)}</div>
            </div>
          </div>
        </a>`;
      })
      .join("");

    const flowSteps = (view.process?.steps || [])
      .map((step) => {
        const visual = step.image
          ? `<div class="flow-visual" data-art-pair data-box>${pairImages(step.image, step.imageHover, false)}</div>`
          : "";
        return `<article class="flow-step" tabindex="0">
          <div class="flow-step-body">
            ${visual}
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.text)}</p>
            <p class="flow-percent">${escapeHtml(step.percent)}</p>
            <div class="flow-bar" style="--w:${escapeHtml(step.percent)}"></div>
          </div>
        </article>`;
      })
      .join("");
    const moments = (view.about.moments || [])
      .map((moment, index) => {
        const motion = ["left", "center", "right"][index] || "center";
        return `<figure class="about-shot about-shot-${motion}" tabindex="0">
          <span class="about-tip" role="tooltip">${escapeHtml(moment.tip)}</span>
          ${imgTag(moment, false)}
        </figure>`;
      })
      .join("");
    const abilityItems = (view.abilities?.items || [])
      .map(
        (item, index) =>
          `<li style="--d:${index}"><span>${escapeHtml(item.label)}</span></li>`
      )
      .join("");

    main.innerHTML = `
      <section class="hero">
        ${heroBackground(view.hero.video)}
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(view.role)}</p>
          <h1>${richTitle(view.hero.title)}</h1>
          <p class="lede">${escapeHtml(view.hero.lede)}</p>
        </div>
      </section>

      <section class="stack-section" id="proyectos" aria-labelledby="proyectos-titulo">
        ${artSwap(view.work?.illustration, view.work?.illustrationOn, false, "work-mark")}
        <div class="section-head">
          <div>
            <p class="eyebrow">${escapeHtml(ui.workEyebrow)}</p>
            <h2 id="proyectos-titulo">${escapeHtml(ui.workTitle)}</h2>
            <p>${escapeHtml(ui.workLede)}</p>
          </div>
          <a class="text-link" href="proyectos.html">${escapeHtml(ui.workIndex)}</a>
        </div>
        <div class="stack">${cards}</div>
      </section>

      <section class="about" id="sobre-mi" aria-labelledby="about-titulo">
        <div class="about-card">
          ${artSwap(view.about.illustration, view.about.illustrationOn, false, "about-mark")}
          <h2 id="about-titulo">${escapeHtml(view.about.title)}</h2>
          <p class="about-lede">${escapeHtml(view.about.lede)}</p>
          <p class="about-text">${escapeHtml(view.about.text)}</p>
          <div class="about-moments">${moments}</div>
        </div>
      </section>

      <section class="abilities" id="habilidades" aria-labelledby="abilities-titulo">
        <div class="abilities-stage">
          <ul class="ability-pills">${abilityItems}</ul>
          <div class="abilities-core">
            ${artSwap(view.abilities.mark, view.abilities.markOn, false, "abilities-mark")}
            <h2 id="abilities-titulo">${escapeHtml(view.abilities.title)}</h2>
            <p>${escapeHtml(view.abilities.lede)}</p>
          </div>
        </div>
      </section>

      <section class="flow" id="como-trabajo" aria-labelledby="flow-titulo">
        <div class="flow-head">
          <h2 id="flow-titulo">${escapeHtml(view.process.title)}</h2>
          <p>${escapeHtml(view.process.lede)}</p>
        </div>
        <div class="flow-meta">
          <span>${escapeHtml(view.process.stepsLabel)}</span>
          <span>${escapeHtml(view.process.durationLabel)}</span>
        </div>
        <div class="flow-steps">${flowSteps}</div>
      </section>

      <section class="contact-home" aria-labelledby="contacto-titulo">
        <div class="contact-stack">
          ${artSwap(view.contact.illustration, view.contact.illustrationOn, false, "contact-mark")}
          <h2 id="contacto-titulo">${escapeHtml(view.contact.homeTitle)}</h2>
          <p class="lede">${escapeHtml(view.contact.lede)}</p>
          ${contactActions()}
        </div>
      </section>`;
  }

  function renderProjectIndex() {
    const rows = view.projects
      .map((project, index) => {
        const number = String(index + 1).padStart(2, "0");
        return `<li>
          <a class="case-row" href="${projectUrl(project.id)}">
            <div class="case-copy">
              <div class="kicker-row"><span class="idx">${number}</span><span class="year">${escapeHtml(project.year)}</span>${pill(project)}</div>
              <h2>${escapeHtml(project.title)}</h2>
              <p class="deck">${escapeHtml(project.subtitle)}</p>
              ${tags(project.tags)}
            </div>
            <div class="case-media">${imgTag(project.cover, index === 0)}</div>
          </a>
        </li>`;
      })
      .join("");

    main.innerHTML = `
      <header class="page-intro">
        <p class="eyebrow">${escapeHtml(ui.projectsEyebrow)}</p>
        <div class="page-intro-title">
          <h1>${escapeHtml(ui.projectsTitle)}</h1>
          ${artSwap(view.work?.illustration, view.work?.illustrationOn, true, "work-mark")}
        </div>
        <p class="deck">${escapeHtml(ui.projectsLede)}</p>
      </header>
      <ol class="case-index">${rows}</ol>`;
  }

  function renderCaseStudy() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const index = view.projects.findIndex((project) => project.id === id);
    const project = view.projects[index];

    if (!project) {
      document.title = `Proyecto — ${view.name}`;
      main.innerHTML = `
        <div class="empty">
          <h1>${escapeHtml(ui.notFoundTitle)}</h1>
          <p>${escapeHtml(ui.notFoundText)}</p>
          <p><a class="text-link" href="proyectos.html">${escapeHtml(ui.backToProjects)}</a></p>
        </div>`;
      return;
    }

    document.title = `${project.title} — ${view.name}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", project.subtitle);

    const meta = (project.meta || [])
      .map((item) => `<li><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></li>`)
      .join("");

    const stageButtons = project.sections
      .map(
        (section, sectionIndex) =>
          `<button type="button" data-stage="${sectionIndex}"${sectionIndex === 0 ? ' class="is-active" aria-current="true"' : ""}>${escapeHtml(section.title)}</button>`
      )
      .join("");
    const sections = project.sections
      .map((section, sectionIndex) => {
        const images = (section.images || [])
          .map((image) => figure(image, false).replace("<figure>", '<figure class="shot">'))
          .join("");
        return `<section class="case-stage" id="etapa-${sectionIndex}" style="--i:${sectionIndex}">
          <div class="stage-copy">
            <h2 class="sr-only">${escapeHtml(section.title)}</h2>
            <div class="prose">${paragraphs(section.paragraphs)}</div>
          </div>
          <div class="stage-gallery">${images}</div>
        </section>`;
      })
      .join("");

    const next = view.projects[(index + 1) % view.projects.length];

    main.innerHTML = `
      <article>
        <header class="case-hero">
          <a class="back-link" href="proyectos.html">← ${escapeHtml(ui.backProjects)}</a>
          <div class="kicker-row">${pill(project)}<span class="year">${escapeHtml(project.year)}</span></div>
          <h1>${escapeHtml(project.title)}</h1>
          <p class="deck">${escapeHtml(project.subtitle)}</p>
          <ul class="meta-list">${meta}</ul>
          <figure class="cover-figure">${imgTag(project.cover, true)}<figcaption>${escapeHtml(project.cover.caption || "")}</figcaption></figure>
        </header>
        <div class="case-flow">
          <nav class="stage-nav" aria-label="${escapeHtml(ui.stageNav)}">${stageButtons}</nav>
          <div class="case-stack">${sections}</div>
        </div>
        <nav class="case-next" aria-label="${escapeHtml(ui.caseNav)}">
          <a href="proyectos.html"><span>${escapeHtml(ui.indexLabel)}</span><strong>${escapeHtml(ui.allProjects)}</strong></a>
          <a href="${projectUrl(next.id)}"><span>${escapeHtml(ui.nextLabel)}</span><strong>${escapeHtml(next.title)}</strong></a>
        </nav>
      </article>`;
  }

  function renderContact() {
    main.innerHTML = `
      <div class="contact-stack">
        ${artSwap(view.contact.illustration, view.contact.illustrationOn, true, "contact-mark")}
        <h1>${escapeHtml(view.contact.title)}</h1>
        <p class="lede">${escapeHtml(view.contact.lede)}</p>
        ${contactActions()}
      </div>`;
  }

  function renderFooter() {
    const footer = document.getElementById("pie");
    if (!footer) return;
    const year = new Date().getFullYear();
    const cat = view.footer?.cat;
    const catOn = view.footer?.catOn;
    const catMarkup =
      cat && cat.src
        ? `<div class="footer-cat" data-footer-cat>
          <button class="footer-top" type="button" tabindex="-1" data-footer-top>${escapeHtml(ui.backToTop)}</button>
          <button class="footer-cat-toggle" type="button" aria-expanded="false" aria-label="${escapeHtml(ui.backToTop)}" data-footer-toggle>
            ${mediaWithClass(cat, false, "footer-cat-img")}
            ${catOn && catOn.src ? mediaWithClass({ ...catOn, alt: "" }, false, "footer-cat-img footer-cat-img-on") : ""}
          </button>
        </div>`
        : "";
    footer.innerHTML = `
      <div class="footer-bar">
        <p class="footer-brand">${escapeHtml(view.name)} · ${year}</p>
        ${catMarkup}
      </div>`;
  }

  function initFooterCat() {
    const root = document.querySelector("[data-footer-cat]");
    if (!root) return;
    const toggle = root.querySelector("[data-footer-toggle]");
    const top = root.querySelector("[data-footer-top]");

    function setOpen(open) {
      root.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      top.tabIndex = open ? 0 : -1;
    }

    toggle.addEventListener("click", () => setOpen(!root.classList.contains("is-open")));
    root.addEventListener("focusin", () => setOpen(true));
    root.addEventListener("mouseenter", () => setOpen(true));
    root.addEventListener("mouseleave", () => setOpen(false));
    document.addEventListener("click", (event) => {
      if (!root.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
    top.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      setOpen(false);
      toggle.blur();
    });
  }

  function setBrand() {
    document.querySelectorAll("[data-brand]").forEach((node) => {
      node.textContent = view.name;
    });
    const titles = {
      home: `${view.name} — ${ui.titleHome}`,
      proyectos: `${ui.titleProjects} — ${view.name}`,
      contacto: `${ui.titleContact} — ${view.name}`,
      proyecto: `${ui.titleProject} — ${view.name}`,
    };
    if (page !== "proyecto") document.title = titles[page] || view.name;
    const description = document.querySelector('meta[name="description"]');
    if (description && page !== "proyecto") description.setAttribute("content", view.description);
  }

  function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("nav-principal");
    if (!toggle || !nav) return;

    const mobileQuery = window.matchMedia("(max-width: 780px)");
    const current = page === "proyecto" ? "proyectos" : page;
    const currentLink = nav.querySelector(`[data-nav="${current}"]`);
    if (currentLink) currentLink.setAttribute("aria-current", "page");

    function setOpen(open) {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      const label = toggle.querySelector(".sr-only");
      if (label) label.textContent = open ? ui.menuClose : ui.menuOpen;
      nav.classList.toggle("is-open", open);
      if (mobileQuery.matches && !open) nav.setAttribute("inert", "");
      else nav.removeAttribute("inert");
      const content = document.getElementById("contenido");
      const footer = document.getElementById("pie");
      if (content) content.inert = open;
      if (footer) footer.inert = open;
    }

    function sync() {
      if (!mobileQuery.matches) setOpen(false);
      else if (!document.body.classList.contains("nav-open")) nav.setAttribute("inert", "");
    }

    toggle.addEventListener("click", () => {
      setOpen(!document.body.classList.contains("nav-open"));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    mobileQuery.addEventListener("change", sync);
    sync();
  }

  function applyChrome() {
    const skip = document.querySelector(".skip");
    if (skip) skip.textContent = ui.skip;
    const nav = document.getElementById("nav-principal");
    if (!nav) return;
    nav.setAttribute("aria-label", ui.navLabel);
    const labels = {
      home: ui.navHome,
      proyectos: ui.navProjects,
      contacto: ui.navContact,
    };
    nav.querySelectorAll("[data-nav]").forEach((link) => {
      const key = link.getAttribute("data-nav");
      if (labels[key]) link.textContent = labels[key];
    });
    mountLangSwitch();
  }

  function mountLangSwitch() {
    const header = document.querySelector(".site-header");
    const nav = document.getElementById("nav-principal");
    const toggle = document.querySelector(".nav-toggle");
    if (!header || !nav || header.querySelector(".lang-switch")) return;

    const end = document.createElement("div");
    end.className = "header-end";
    header.appendChild(end);
    end.appendChild(nav);

    const group = document.createElement("div");
    group.className = "lang-switch";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", ui.langLabel);

    ["es", "en"].forEach((code) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "lang-option";
      button.textContent = code.toUpperCase();
      button.setAttribute("aria-pressed", code === lang ? "true" : "false");
      if (code === lang) button.setAttribute("aria-current", "true");
      button.addEventListener("click", () => {
        if (code === lang) return;
        localStorage.setItem("portfolio-lang", code);
        window.location.reload();
      });
      group.appendChild(button);
    });

    end.appendChild(group);
    if (toggle) end.appendChild(toggle);
  }

  function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initSpoiler() {
    const scroller = document.querySelector("[data-drag-scroll]");
    if (!scroller) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;
    let paused = false;
    let wrapping = false;
    let lastLeft = scroller.scrollLeft;
    let resumeTimer = 0;

    const half = () => scroller.scrollWidth / 2;

    function wrap() {
      if (wrapping) return;
      const width = half();
      if (width <= 0) return;
      if (scroller.scrollLeft >= width) {
        wrapping = true;
        scroller.scrollLeft -= width;
        wrapping = false;
      } else if (scroller.scrollLeft <= 0 && lastLeft > 2) {
        wrapping = true;
        scroller.scrollLeft += width - 1;
        wrapping = false;
      }
      lastLeft = scroller.scrollLeft;
    }

    scroller.addEventListener("scroll", wrap, { passive: true });

    scroller.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      event.preventDefault();
      dragging = true;
      moved = false;
      paused = true;
      startX = event.clientX;
      startScroll = scroller.scrollLeft;
      scroller.classList.add("is-dragging");
      try {
        scroller.setPointerCapture(event.pointerId);
      } catch (error) {
        /* El arrastre sigue con los eventos del propio contenedor. */
      }
    });

    scroller.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 4) moved = true;
      const width = half();
      let next = startScroll - delta;
      if (width > 0) {
        while (next < 0) next += width;
        while (next >= width) next -= width;
      }
      scroller.scrollLeft = next;
    });

    function endDrag(event) {
      if (!dragging) return;
      const shouldOpen = !moved && event && event.type === "pointerup";
      const link = shouldOpen ? event.target.closest("a") : null;
      dragging = false;
      scroller.classList.remove("is-dragging");
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, 700);
      if (link && scroller.contains(link) && link.href) window.location.href = link.href;
    }

    scroller.addEventListener("pointerup", endDrag);
    scroller.addEventListener("pointercancel", endDrag);
    scroller.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientWidth : 1;
        const delta = (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * scale;
        paused = true;
        scroller.scrollLeft += delta;
        window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(() => {
          paused = false;
        }, 900);
      },
      { passive: false }
    );
    scroller.addEventListener(
      "click",
      (event) => {
        if (!moved) return;
        event.preventDefault();
        event.stopPropagation();
        moved = false;
      },
      true
    );

    if (reducedMotion) return;

    let last = performance.now();
    const tick = (now) => {
      const delta = now - last;
      last = now;
      if (!paused && !dragging) scroller.scrollLeft += delta * 0.05;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initAbilities() {
    const section = document.querySelector(".abilities");
    if (!section) return;
    if (reducedMotion) {
      section.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) section.classList.add("is-in");
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
  }

  // Calcula el tamaño de cada par normal/On con la misma escala y el mismo anclaje,
  // para que al cambiar de una a otra no se desplacen.
  function layoutArtPair(box) {
    const [base, on] = box.querySelectorAll("img");
    if (!base || !on) return;
    if (base.dataset.fallback === "1" || on.dataset.fallback === "1") return;
    const nw = base.naturalWidth;
    const nh = base.naturalHeight;
    const ow = on.naturalWidth;
    const oh = on.naturalHeight;
    if (!nw || !nh || !ow || !oh) return;

    const ratio = nw / nh;
    let boxRatio = ratio;
    if (box.hasAttribute("data-box")) {
      const rect = box.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      boxRatio = rect.width / rect.height;
    } else {
      box.style.setProperty("--ar", String(ratio));
    }

    const widthPct = ratio >= boxRatio ? 100 : (100 * ratio) / boxRatio;
    const heightPct = ratio >= boxRatio ? (100 * boxRatio) / ratio : 100;
    const unit = widthPct / nw;
    base.style.width = `${widthPct}%`;
    base.style.height = `${heightPct}%`;
    on.style.width = `${ow * unit}%`;
    on.style.height = `${oh * unit * boxRatio}%`;
    box.classList.add("is-ready");
  }

  function initArtPairs() {
    const boxes = [...document.querySelectorAll("[data-art-pair]")];
    if (!boxes.length) return;
    boxes.forEach((box) => {
      box.querySelectorAll("img").forEach((img) => {
        if (img.complete) layoutArtPair(box);
        else img.addEventListener("load", () => layoutArtPair(box));
      });
    });
    window.addEventListener("resize", () => {
      boxes.filter((box) => box.hasAttribute("data-box")).forEach(layoutArtPair);
    });

    const swaps = boxes.filter((box) => box.hasAttribute("data-art-swap"));
    if (!swaps.length || reducedMotion || !("IntersectionObserver" in window)) return;

    const timers = new Map();
    const interval = 1000;
    function start(box) {
      if (timers.has(box)) return;
      box.classList.add("is-on");
      timers.set(box, window.setInterval(() => box.classList.toggle("is-on"), interval));
    }
    function stop(box) {
      window.clearInterval(timers.get(box));
      timers.delete(box);
      box.classList.remove("is-on");
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targets = entry.target.__swaps || [];
          targets.forEach((box) => (entry.isIntersecting ? start(box) : stop(box)));
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0 }
    );
    swaps.forEach((box) => {
      const host = box.closest("section, header, main") || box;
      host.__swaps = host.__swaps || [];
      host.__swaps.push(box);
      observer.observe(host);
    });
  }

  // Entrada sutil de cada elemento al llegar a pantalla (fade + desplazamiento corto).
  function initReveal() {
    if (reducedMotion || !("IntersectionObserver" in window)) return;
    const selectors = [
      ".hero-copy > *",
      ".page-intro > *",
      ".stack-section > .work-mark",
      ".section-head > *",
      ".stack-card",
      ".case-index > li",
      ".about-mark",
      ".about-card h2",
      ".about-lede",
      ".about-text",
      ".about-shot",
      ".abilities-core > *",
      ".flow-head > *",
      ".flow-meta",
      ".flow-step",
      ".contact-stack > *",
      ".case-hero > *",
      ".case-stage",
    ];
    const targets = [...new Set(selectors.flatMap((selector) => [...document.querySelectorAll(selector)]))];
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        visible.forEach((entry, index) => {
          entry.target.style.setProperty("--rd", String(Math.min(index, 6)));
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
        entries
          .filter((entry) => !entry.isIntersecting && entry.boundingClientRect.bottom < 0)
          .forEach((entry) => {
            entry.target.classList.add("is-revealed", "is-instant");
            observer.unobserve(entry.target);
          });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    targets.forEach((target) => {
      target.setAttribute("data-reveal", "");
      observer.observe(target);
    });
  }

  function initCaseStages() {
    const stages = [...document.querySelectorAll(".case-stage")];
    const nav = document.querySelector(".stage-nav");
    if (!stages.length) return;
    const buttons = nav ? [...nav.querySelectorAll("[data-stage]")] : [];

    function headerOffset() {
      const header = document.querySelector(".site-header");
      return (header ? header.offsetHeight : 0) + 16;
    }

    function measure() {
      stages.forEach((stage) => {
        stage.dataset.pageTop = String(Math.round(stage.getBoundingClientRect().top + window.scrollY));
      });
    }

    let activeIndex = -1;
    function setActive(index) {
      buttons.forEach((button, buttonIndex) => {
        const on = buttonIndex === index;
        button.classList.toggle("is-active", on);
        if (on) button.setAttribute("aria-current", "true");
        else button.removeAttribute("aria-current");
      });
      if (index === activeIndex) return;
      activeIndex = index;
      stages.forEach((stage, stageIndex) => {
        stage.classList.toggle("is-current", stageIndex === index);
      });
    }

    function scrollToStage(index) {
      const stage = stages[index];
      if (!stage) return;
      measure();
      const top = Number(stage.dataset.pageTop) - headerOffset();
      window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion ? "auto" : "smooth" });
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => scrollToStage(Number(button.dataset.stage)));
    });

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const line = headerOffset() + 8;
        let current = 0;
        stages.forEach((stage, index) => {
          if (stage.getBoundingClientRect().top <= line) current = index;
        });
        setActive(current);
      });
    };

    measure();
    setActive(0);
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    stages.forEach((stage) => {
      stage.querySelectorAll("img, video").forEach((media) => {
        const refresh = () => measure();
        if (media instanceof HTMLImageElement) {
          if (!media.complete) media.addEventListener("load", refresh, { once: true });
        } else if (media.readyState < 2) {
          media.addEventListener("loadeddata", refresh, { once: true });
        }
      });
    });
  }

  function initStack() {
    if (reducedMotion) return;
    const cards = [...document.querySelectorAll(".stack-section .stack-card")];
    if (!cards.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      cards.forEach((card, index) => {
        const inner = card.querySelector(".stack-card-inner");
        const next = cards[index + 1];
        if (!inner || !next) {
          if (inner) inner.style.transform = "scale(1)";
          return;
        }
        const nextTop = next.getBoundingClientRect().top;
        const start = window.innerHeight * 0.92;
        const progress = Math.min(Math.max((start - nextTop) / (start * 0.45), 0), 1);
        const scale = 1 - progress * 0.045;
        inner.style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener(
      "scroll",
      () => {
        if (frame) return;
        frame = window.requestAnimationFrame(update);
      },
      { passive: true }
    );
    update();
  }

  function initImageFallback() {
    document.addEventListener(
      "error",
      (event) => {
        const image = event.target;
        if (!(image instanceof HTMLImageElement) || image.dataset.fallback === "1") return;
        image.dataset.fallback = "1";
        const label = image.alt || "Imagen";
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#E9D7CC"/><text x="60" y="390" fill="#1B1915" font-family="Georgia, serif" font-size="42">${escapeHtml(label).slice(0, 80)}</text><text x="60" y="450" fill="#5E564C" font-family="Arial, sans-serif" font-size="24">${escapeHtml(ui.imageMissing)}</text></svg>`;
        image.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
      },
      true
    );
  }

  function initSchema() {
    const data = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: view.name,
      jobTitle: view.role,
      email: view.email,
      address: { "@type": "PostalAddress", addressCountry: "AR" },
      sameAs: [view.linkedin],
      knowsAbout: ["Diseño UX", "Diseño UI", "Diseño industrial"],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  applyChrome();
  setBrand();
  renderFooter();
  if (page === "home") renderHome();
  if (page === "proyectos") renderProjectIndex();
  if (page === "proyecto") renderCaseStudy();
  if (page === "contacto") renderContact();
  initFooterCat();
  initNav();
  initHeader();
  initSpoiler();
  initAbilities();
  initArtPairs();
  initReveal();
  initStack();
  initCaseStages();
  initImageFallback();
  initSchema();
})();
