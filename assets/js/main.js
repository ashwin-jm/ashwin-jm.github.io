(function () {
  const S = window.SITE || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const mediumProfile = S.mediumHandle ? `https://medium.com/@${S.mediumHandle.replace(/^@/, "")}` : "";

  /* ---------- Shared: nav, footer, contact links ---------- */
  const navToggle = $(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open);
    });
  }

  const socials = [
    { key: "email", label: "Email", href: S.email ? `mailto:${S.email}` : "" },
    { key: "linkedin", label: "LinkedIn", href: S.linkedin },
    { key: "github", label: "GitHub", href: S.github },
    { key: "medium", label: "Medium", href: mediumProfile }
  ].filter((s) => s.href);

  document.querySelectorAll("[data-socials]").forEach((el) => {
    el.innerHTML = socials
      .map((s) => `<a href="${esc(s.href)}" ${s.key === "email" ? "" : 'target="_blank" rel="noopener"'}>${s.label}<span aria-hidden="true">↗</span></a>`)
      .join("");
  });
  document.querySelectorAll("[data-email]").forEach((el) => {
    if (S.email) { el.textContent = S.email; el.href = `mailto:${S.email}`; }
  });
  document.querySelectorAll("[data-medium-link]").forEach((el) => {
    if (mediumProfile) el.href = mediumProfile; else el.hidden = true;
  });
  document.querySelectorAll("[data-resume]").forEach((el) => {
    if (S.resume) el.href = S.resume; else el.hidden = true;
  });
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  document.querySelectorAll("[data-avatar]").forEach((avatar) => {
    if (S.photo) avatar.innerHTML = `<img src="${esc(S.photo)}" alt="Photo of ${esc(S.name)}" width="800" height="800">`;
    else avatar.textContent = (S.name || "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("");
  });

  /* ---------- Projects ---------- */
  const projectList = $("[data-projects]");
  if (projectList && window.PROJECTS) {
    const limit = parseInt(projectList.dataset.limit || "0", 10);
    const sorted = window.PROJECTS.slice().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    const items = limit ? sorted.slice(0, limit) : sorted;
    projectList.innerHTML = items
      .map((p, i) => {
        const statusClass = { "In progress": "wip", Evaluation: "eval" }[p.status] || "done";
        const metrics = (p.metrics || []).length
          ? `<dl class="metrics">${p.metrics.map((m) => `<div><dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd></div>`).join("")}</dl>`
          : "";
        const posts = (p.posts || []).length
          ? `<div class="writeups"><span>Write-ups</span>${p.posts.map((w) => `<a href="${esc(w.url)}" target="_blank" rel="noopener">${esc(w.title)} ↗</a>`).join("")}</div>`
          : "";
        const actions = [
          p.repo ? `<a class="btn btn-small btn-primary" href="${esc(p.repo)}" target="_blank" rel="noopener">View code ↗</a>` : "",
          ...(p.links || []).map((l) => `<a class="btn btn-small btn-ghost" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
        ].join("");
        return `
      <article class="project reveal${p.featured ? " is-featured" : ""}">
        <div class="project-index">${String(i + 1).padStart(2, "0")}</div>
        <div class="project-body">
          <div class="project-meta">
            <span>${esc(p.context)}${p.period ? ` · ${esc(p.period)}` : ""}</span>
            ${p.featured ? `<span class="status status-flag">Flagship</span>` : ""}
            <span class="status status-${statusClass}">${esc(p.status)}</span>
          </div>
          <h3>${esc(p.title)}</h3>
          <p class="project-summary">${esc(p.summary)}</p>
          ${metrics}
          <ol class="flow" aria-label="Data flow">
            ${(p.flow || []).map((f) => `<li>${esc(f)}</li>`).join("")}
          </ol>
          <details>
            <summary>What I built</summary>
            <ul class="built">${(p.built || []).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          </details>
          <ul class="tags">${(p.stack || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          ${posts}
          ${actions ? `<div class="project-actions">${actions}</div>` : ""}
        </div>
      </article>`;
      })
      .join("");
  }

  /* ---------- Currently building ---------- */
  const nowEl = $("[data-now]");
  if (nowEl) {
    const n = S.now;
    if (!n || !n.title) {
      nowEl.closest("section").hidden = true;
    } else {
      const ms = n.milestones || [];
      const done = ms.filter((m) => m.status === "done").length;
      const pct = ms.length ? Math.round((done / ms.length) * 100) : 0;
      nowEl.innerHTML = `
        <div class="now-main">
          <div class="now-head">
            <span class="live-dot" aria-hidden="true"></span>
            <span>Currently building</span>
            ${n.updated ? `<time>Updated ${fmtDate(n.updated)}</time>` : ""}
          </div>
          <h3>${esc(n.title)}</h3>
          <p>${esc(n.summary || "")}</p>
          ${(n.learning || []).length ? `<div class="now-learning"><span>Learning</span><ul class="tags">${n.learning.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>` : ""}
          <div class="actions">
            ${n.repo ? `<a class="btn btn-small btn-primary" href="${esc(n.repo)}" target="_blank" rel="noopener">Follow the repo ↗</a>` : ""}
            ${mediumProfile ? `<a class="btn btn-small btn-ghost" href="blog.html">Read the build log</a>` : ""}
          </div>
        </div>
        ${ms.length ? `
        <div class="now-side">
          <div class="progress-label"><span>Progress</span><span>${done}/${ms.length} milestones</span></div>
          <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>
          <ol class="milestones">
            ${ms.map((m) => `<li class="ms-${esc(m.status || "next")}"><span class="ms-mark" aria-hidden="true"></span>${esc(m.label)}<em>${{ done: "Done", active: "In progress", next: "Up next" }[m.status] || ""}</em></li>`).join("")}
          </ol>
        </div>` : ""}`;
    }
  }

  /* ---------- Blog (Medium RSS) ---------- */
  const blogGrid = $("[data-blog]");
  if (blogGrid) loadPosts(blogGrid);

  async function loadPosts(grid) {
    const limit = parseInt(grid.dataset.limit || "0", 10);
    grid.innerHTML = Array.from({ length: limit || 6 }, () => `<div class="post skeleton"><div class="post-cover"></div><div class="post-text"><span></span><span></span></div></div>`).join("");

    // 1) posts.json — kept fresh by the "Sync Medium posts" GitHub Action (same origin, no third party)
    // 2) rss2json — live fallback, catches anything newer than the last sync
    // 3) manualPosts in config.js — last resort
    const handle = (S.mediumHandle || "").replace(/^@/, "");
    const fromJson = fetch(`assets/data/posts.json?v=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);
    const fromRss = !handle ? Promise.resolve([]) :
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://medium.com/feed/@${handle}`)}`)
        .then((r) => r.json())
        .then((data) => (data.status === "ok" ? data.items.map((it) => ({
          title: it.title,
          link: it.link,
          date: it.pubDate,
          image: it.thumbnail || firstImage(it.content || it.description),
          tags: it.categories || []
        })) : []))
        .catch(() => []);

    const merged = new Map();
    for (const list of await Promise.all([fromJson, fromRss])) {
      for (const p of Array.isArray(list) ? list : []) {
        const key = String(p.link || "").split("?")[0];
        if (!key) continue;
        const prev = merged.get(key);
        merged.set(key, { ...p, ...prev, link: key, image: (prev && prev.image) || p.image, tags: (prev && prev.tags && prev.tags.length ? prev.tags : p.tags) || [] });
      }
    }
    let posts = [...merged.values()].sort((a, b) => toTime(b.date) - toTime(a.date));
    if (!posts.length) posts = (S.manualPosts || []).slice();
    if (limit) posts = posts.slice(0, limit);

    if (!posts.length) {
      grid.innerHTML = `<div class="empty">
        <p class="empty-title">Writing is on its way.</p>
        <p>I'm working on a series about data engineering in Microsoft Fabric. ${mediumProfile ? `Follow along on <a href="${esc(mediumProfile)}" target="_blank" rel="noopener">Medium ↗</a>.` : ""}</p>
      </div>`;
      return;
    }

    // Topic filter chips (blog page only) built from Medium tags
    const filterBar = $("[data-blog-filters]");
    if (filterBar) {
      const counts = {};
      posts.forEach((p) => (p.tags || []).forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
      const topics = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 10);
      if (topics.length) {
        filterBar.hidden = false;
        filterBar.innerHTML = ["All", ...topics].map((t, i) => `<button type="button" class="chip${i === 0 ? " is-on" : ""}" data-topic="${esc(t)}">${esc(t.replace(/-/g, " "))}</button>`).join("");
        filterBar.addEventListener("click", (e) => {
          const b = e.target.closest(".chip");
          if (!b) return;
          filterBar.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-on", c === b));
          const topic = b.dataset.topic;
          grid.querySelectorAll(".post").forEach((el) => {
            el.hidden = topic !== "All" && !(el.dataset.tags || "").split("|").includes(topic);
          });
        });
      }
    }

    grid.innerHTML = posts
      .map((p) => `
      <a class="post reveal" href="${esc(p.link)}" target="_blank" rel="noopener" data-tags="${esc((p.tags || []).join("|"))}">
        <div class="post-cover">${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy">` : `<span class="cover-fallback">${esc(initialsOf(p.title))}</span>`}</div>
        <div class="post-text">
          ${p.date ? `<time>${fmtDate(p.date)}</time>` : ""}
          <h3>${esc(p.title)}</h3>
          <span class="read">Read on Medium ↗</span>
        </div>
      </a>`)
      .join("");
    observeReveals();
  }

  function toTime(d) {
    const t = new Date(String(d || "").replace(" ", "T") + (/Z|[+-]\d\d:?\d\d$/.test(String(d)) ? "" : "Z")).getTime();
    return isNaN(t) ? 0 : t;
  }
  function firstImage(html) {
    const m = /<img[^>]+src="([^"]+)"/i.exec(html || "");
    return m ? m[1] : "";
  }
  function initialsOf(t) {
    return (t || "").split(/\s+/).filter((w) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  }
  function fmtDate(d) {
    const dt = new Date(String(d).replace(" ", "T"));
    return isNaN(dt) ? "" : dt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  /* ---------- Reveal on scroll ---------- */
  function observeReveals() {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    els.forEach((e) => io.observe(e));
  }
  observeReveals();
})();
