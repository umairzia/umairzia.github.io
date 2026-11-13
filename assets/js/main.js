/* Shared script for umairzia.github.io
   Reads window.CONTENT from /data/content.js and renders the page.
   The home page calls renderHome(). Case-study pages call renderCaseStudy(slug). */

(function () {
  "use strict";

  var C = window.CONTENT;

  /* ---------- helpers ---------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text) { node.textContent = text; }
    return node;
  }

  function link(href, text, className) {
    var a = el("a", className, text);
    a.href = href;
    if (href.indexOf("http") === 0) {
      a.rel = "noopener";
    }
    return a;
  }

  function byId(id) { return document.getElementById(id); }

  /* ---------- theme toggle ----------
     Follows the system setting by default.
     A click stores an explicit choice in localStorage. */

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) { stored = null; }
    if (stored === "dark" || stored === "light") {
      document.documentElement.setAttribute("data-theme", stored);
    }
    var btn = byId("theme-toggle");
    if (!btn) { return; }
    updateToggleLabel(btn);
    btn.addEventListener("click", function () {
      var current = currentTheme();
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
      updateToggleLabel(btn);
    });
  }

  function currentTheme() {
    var set = document.documentElement.getAttribute("data-theme");
    if (set) { return set; }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function updateToggleLabel(btn) {
    var theme = currentTheme();
    btn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  /* ---------- home page sections ---------- */

  function renderHero() {
    byId("hero-name").textContent = C.name;
    byId("hero-tagline").textContent = C.tagline;
    byId("hero-intro").textContent = C.intro;
    byId("btn-resume").href = C.resume;
    byId("btn-linkedin").href = C.contact.linkedin;
  }

  function renderResults() {
    var grid = byId("results-grid");
    C.keyResults.forEach(function (r) {
      var card = el("div", "result-card");
      card.appendChild(el("span", "value", r.value));
      card.appendChild(el("span", "label", r.label));
      grid.appendChild(card);
    });
  }

  function renderRoles() {
    var list = byId("role-list");
    C.targetRoles.forEach(function (role) {
      list.appendChild(el("li", null, role));
    });
  }

  function renderExperience() {
    var timeline = byId("timeline");
    C.experience.forEach(function (job, index) {
      var li = el("li");
      var details = document.createElement("details");
      if (index === 0) { details.open = true; }

      var summary = document.createElement("summary");
      summary.appendChild(el("span", "role-title", job.title + ", " + job.company));
      summary.appendChild(el("span", "role-meta", job.location + " | " + job.start + " to " + job.end));
      details.appendChild(summary);

      var body = el("div", "role-body");
      if (job.summary) {
        body.appendChild(el("p", "role-summary", job.summary));
      }
      var ul = el("ul");
      job.bullets.forEach(function (b) {
        ul.appendChild(el("li", null, b));
      });
      body.appendChild(ul);
      details.appendChild(body);

      li.appendChild(details);
      timeline.appendChild(li);
    });
  }

  function renderProjects() {
    var grid = byId("project-grid");
    var filterRow = byId("filter-row");
    var tags = ["All", "Python", "SQL", "Dashboards", "Finance", "AI", "Research"];

    tags.forEach(function (tag) {
      var btn = el("button", "filter-btn", tag);
      btn.type = "button";
      btn.setAttribute("aria-pressed", tag === "All" ? "true" : "false");
      btn.addEventListener("click", function () {
        filterRow.querySelectorAll(".filter-btn").forEach(function (b) {
          b.setAttribute("aria-pressed", "false");
        });
        btn.setAttribute("aria-pressed", "true");
        applyFilter(tag);
      });
      filterRow.appendChild(btn);
    });

    C.projects.forEach(function (p) {
      var card = el("article", "project-card");
      card.setAttribute("data-tags", p.tags.join(","));

      var h3 = el("h3");
      h3.appendChild(link("projects/" + p.slug + ".html", p.title));
      card.appendChild(h3);

      card.appendChild(el("p", "one-liner", p.oneLiner));

      var tagRow = el("div", "tag-row");
      p.tags.forEach(function (t) { tagRow.appendChild(el("span", "tag", t)); });
      card.appendChild(tagRow);

      var links = el("div", "project-links");
      links.appendChild(link("projects/" + p.slug + ".html", "Case study"));
      if (p.github) {
        links.appendChild(link(p.github, "GitHub"));
      } else {
        links.appendChild(el("span", "no-repo", "Case study only"));
      }
      if (p.live) {
        links.appendChild(link(p.live, "Live demo"));
      }
      card.appendChild(links);

      grid.appendChild(card);
    });
  }

  function applyFilter(tag) {
    var cards = byId("project-grid").querySelectorAll(".project-card");
    cards.forEach(function (card) {
      var cardTags = card.getAttribute("data-tags").split(",");
      var show = tag === "All" || cardTags.indexOf(tag) !== -1;
      card.style.display = show ? "" : "none";
    });
  }

  function renderSkills() {
    var grid = byId("skills-grid");
    C.skills.forEach(function (group) {
      var box = el("div", "skill-group");
      box.appendChild(el("h3", null, group.group));
      var ul = el("ul");
      group.items.forEach(function (item) {
        ul.appendChild(el("li", null, item));
      });
      box.appendChild(ul);
      grid.appendChild(box);
    });
  }

  function renderEducation() {
    var holder = byId("education-list");
    C.education.forEach(function (ed) {
      var item = el("div", "edu-item");
      item.appendChild(el("h3", null, ed.credential));
      item.appendChild(el("p", "edu-meta", ed.school + " | " + ed.dates));
      if (ed.notes) { item.appendChild(el("p", "edu-notes", ed.notes)); }
      holder.appendChild(item);
    });
    var certs = byId("cert-list");
    C.certifications.forEach(function (cert) {
      certs.appendChild(el("li", null, cert));
    });
  }

  function renderWriting() {
    var holder = byId("writing-holder");
    var f = C.writing.featured;
    var box = el("div", "writing-featured");
    var h3 = el("h3");
    h3.appendChild(link(f.url, f.title));
    box.appendChild(h3);
    box.appendChild(el("p", "outlet", f.outlet + ", " + f.date));
    holder.appendChild(box);

    if (C.writing.medium && C.writing.medium.length) {
      holder.appendChild(el("h3", null, "Shorter posts on Medium"));
      var ul = el("ul", "medium-list");
      C.writing.medium.forEach(function (m) {
        var li = el("li");
        li.appendChild(link(m.url, m.title));
        ul.appendChild(li);
      });
      holder.appendChild(ul);
    }
  }

  function renderContact() {
    byId("contact-email").href = "mailto:" + C.contact.email;
    byId("contact-linkedin").href = C.contact.linkedin;
    byId("contact-github").href = C.contact.github;
  }

  function renderFooter() {
    var holder = byId("footer-text");
    if (holder) {
      holder.textContent = C.name + " | " + C.location;
    }
  }

  /* ---------- case-study pages ---------- */

  function renderCaseStudy() {
    var main = document.querySelector("main[data-slug]");
    if (!main) { return; }
    var slug = main.getAttribute("data-slug");
    var p = null;
    C.projects.forEach(function (proj) {
      if (proj.slug === slug) { p = proj; }
    });
    if (!p) { return; }

    byId("cs-title").textContent = p.title;

    var tagRow = byId("cs-tags");
    p.tags.forEach(function (t) { tagRow.appendChild(el("span", "tag", t)); });

    byId("cs-problem").textContent = p.caseStudy.problem;
    byId("cs-built").textContent = p.caseStudy.built;
    byId("cs-tools").textContent = p.caseStudy.tools;
    byId("cs-result").textContent = p.caseStudy.result;
    byId("cs-learned").textContent = p.caseStudy.learned;

    var links = byId("cs-links");
    if (p.github) {
      links.appendChild(link(p.github, "View the code on GitHub", "btn btn-secondary"));
    }
    if (p.live) {
      links.appendChild(link(p.live, "Open the live demo", "btn btn-secondary"));
    }
    if (!p.github && !p.live) {
      links.appendChild(el("p", "no-repo", "This project has no public repository. The work was done on private business data."));
    }
  }

  /* ---------- boot ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    if (byId("hero-name")) {
      renderHero();
      renderResults();
      renderRoles();
      renderExperience();
      renderProjects();
      renderSkills();
      renderEducation();
      renderWriting();
      renderContact();
    }
    renderCaseStudy();
    renderFooter();
  });
})();
