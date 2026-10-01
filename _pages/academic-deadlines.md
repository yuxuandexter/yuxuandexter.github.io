---
title: "Academic Deadlines"
permalink: /academic-deadlines/
author_profile: false
---

{% assign confirmed_milestones = site.data.academic_deadlines.milestones %}
{% assign planning_markers = site.data.academic_deadlines.planning_markers %}
{% assign milestones = confirmed_milestones | concat: planning_markers | sort: "deadline" %}

<div class="academic-deadlines">
  <p class="academic-deadlines__purpose">A planning timeline for research submission deadlines across AI/ML and systems. Rows marked <strong>Past-cycle basis</strong> use the prior official cycle as a planning reference, not an announced deadline.</p>

  <div class="academic-deadlines__meta">
    <span>Current time <strong class="academic-deadlines__now" data-current-time></strong></span>
    <span>Official sources checked {{ site.data.academic_deadlines.last_checked | date: "%b %-d, %Y" }}</span>
  </div>

  <noscript>
    <style>
      .academic-deadlines__filters,
      .academic-deadlines__counter,
      .academic-deadlines__meta > span:first-child { display: none; }
      .academic-deadlines__row { display: block; }
      .academic-deadlines__source { display: inline-block; margin-top: 0.4rem; }
    </style>
    <p>Live countdowns and filters require JavaScript. All dated entries, including past deadlines, are shown below.</p>
  </noscript>

  <div class="academic-deadlines__filters" role="group" aria-label="Filter venues by research area">
    <button class="academic-deadlines__filter is-active" type="button" data-filter="all">All</button>
    <button class="academic-deadlines__filter" type="button" data-filter="ai">AI / ML</button>
    <button class="academic-deadlines__filter" type="button" data-filter="systems">Systems</button>
    <button class="academic-deadlines__filter" type="button" data-filter="bridge">ML × Systems</button>
    <label class="academic-deadlines__show-past"><input type="checkbox" data-show-past> Show past deadlines</label>
  </div>

  <section class="academic-deadlines__rail" aria-labelledby="deadline-timeline">
    <h2 id="deadline-timeline" class="academic-deadlines__section-title">Deadline timeline</h2>
    <p class="academic-deadlines__empty-state" data-empty-state role="status" hidden>No deadlines or CFP references are available for this filter.</p>
    {% for item in milestones %}
    <article class="academic-deadlines__row{% if item.basis_label %} academic-deadlines__row--past-cycle{% endif %}" data-area="{{ item.area }}">
      <div class="academic-deadlines__counter" data-deadline="{{ item.deadline }}"{% if item.basis_label %} data-estimate="true"{% endif %} aria-label="{% if item.basis_label %}Planning estimate{% else %}Live countdown{% endif %} to {{ item.venue }} {{ item.milestone }}">
        <span class="academic-deadlines__counter-value">Loading</span>
        <span class="academic-deadlines__counter-label">{% if item.basis_label %}approximate days{% else %}days · hrs · min{% endif %}</span>
      </div>
      <div class="academic-deadlines__details">
        <h3>{{ item.venue }}{% if item.cycle %} <span>· {{ item.cycle }}</span>{% endif %}{% if item.basis_label %}<span class="academic-deadlines__basis">{{ item.basis_label }}</span>{% endif %}</h3>
        <p><span class="academic-deadlines__area">{{ item.area_label }}</span>{{ item.milestone }} · {{ item.deadline_display }}</p>
      </div>
      <a class="academic-deadlines__source" href="{{ item.source_url }}" target="_blank" rel="noopener noreferrer">{{ item.source_label }} <span aria-hidden="true">↗</span></a>
    </article>
    {% endfor %}

  </section>

  <p class="academic-deadlines__note">ICLR lists dates in AoE without a cutoff minute; its countdowns use an end-of-day AoE convention (11:59 pm), not an officially stated time. This is a curated personal timeline, not a comprehensive conference directory. Displayed deadlines link to official calls for papers; no paper, author, or submission-status information is published.</p>
</div>

<script>
  (function () {
    var counters = document.querySelectorAll("[data-deadline]");
    var currentTime = document.querySelector("[data-current-time]");
    var emptyState = document.querySelector("[data-empty-state]");
    var rows = document.querySelectorAll(".academic-deadlines__row");
    var showPast = document.querySelector("[data-show-past]");
    var activeArea = "all";
    var formatter = new Intl.DateTimeFormat(undefined, {
      month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short"
    });

    function updateCountdowns() {
      var now = new Date();
      if (currentTime) currentTime.textContent = formatter.format(now);
      counters.forEach(function (counter) {
        var remaining = new Date(counter.getAttribute("data-deadline")) - now;
        var value = counter.querySelector(".academic-deadlines__counter-value");
        var estimate = counter.getAttribute("data-estimate") === "true";
        if (remaining <= 0) {
          value.textContent = estimate ? "Past estimate" : "Passed";
          return;
        }
        if (estimate) {
          var approximateDays = Math.ceil(remaining / 86400000);
          value.textContent = "≈ " + approximateDays + (approximateDays === 1 ? " day" : " days");
          return;
        }
        var days = Math.floor(remaining / 86400000);
        var hours = Math.floor(remaining / 3600000) % 24;
        var minutes = Math.floor(remaining / 60000) % 60;
        value.textContent = days + "d " + String(hours).padStart(2, "0") + "h " + String(minutes).padStart(2, "0") + "m";
      });
      var visibleCount = 0;
      rows.forEach(function (row) {
        var cutoff = new Date(row.querySelector("[data-deadline]").getAttribute("data-deadline"));
        var matchesArea = activeArea === "all" || row.getAttribute("data-area") === activeArea;
        row.hidden = !matchesArea || (!showPast.checked && cutoff <= now);
        if (!row.hidden) visibleCount += 1;
      });
      if (emptyState) emptyState.hidden = visibleCount !== 0;
    }

    document.querySelectorAll("[data-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        activeArea = button.getAttribute("data-filter");
        document.querySelectorAll("[data-filter]").forEach(function (item) {
          item.classList.toggle("is-active", item === button);
        });
        updateCountdowns();
      });
    });
    showPast.addEventListener("change", updateCountdowns);

    updateCountdowns();
    window.setInterval(updateCountdowns, 30000);
  }());
</script>
