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

  <div class="academic-deadlines__filters" role="group" aria-label="Filter venues by research area">
    <button class="academic-deadlines__filter is-active" type="button" data-filter="all">All</button>
    <button class="academic-deadlines__filter" type="button" data-filter="ai">AI / ML</button>
    <button class="academic-deadlines__filter" type="button" data-filter="systems">Systems</button>
    <button class="academic-deadlines__filter" type="button" data-filter="bridge">ML × Systems</button>
  </div>

  <section class="academic-deadlines__rail" aria-labelledby="deadline-timeline">
    <h2 id="deadline-timeline" class="academic-deadlines__section-title">Deadline timeline</h2>
    <p class="academic-deadlines__empty-state" data-empty-state role="status" hidden>No deadlines or CFP references are available for this filter.</p>
    {% for item in milestones %}
    <article class="academic-deadlines__row{% if item.basis_label %} academic-deadlines__row--past-cycle{% endif %}" data-area="{{ item.area }}">
      <div class="academic-deadlines__counter" data-deadline="{{ item.deadline }}" aria-label="Live countdown to {{ item.venue }} {{ item.milestone }}">
        <span class="academic-deadlines__counter-value">Loading</span>
        <span class="academic-deadlines__counter-label">days · hrs · min</span>
      </div>
      <div class="academic-deadlines__details">
        <h3>{{ item.venue }}{% if item.cycle %} <span>· {{ item.cycle }}</span>{% endif %}{% if item.basis_label %}<span class="academic-deadlines__basis">{{ item.basis_label }}</span>{% endif %}</h3>
        <p><span class="academic-deadlines__area">{{ item.area_label }}</span>{{ item.milestone }} · {{ item.deadline_display }}</p>
      </div>
      <a class="academic-deadlines__source" href="{{ item.source_url }}" target="_blank" rel="noopener noreferrer">{{ item.source_label }} <span aria-hidden="true">↗</span></a>
    </article>
    {% endfor %}

  </section>

  <p class="academic-deadlines__note">This is a curated personal watchlist, not a comprehensive conference directory. Displayed deadlines link to official calls for papers; no paper, author, or submission-status information is published.</p>
</div>

<script>
  (function () {
    var counters = document.querySelectorAll("[data-deadline]");
    var currentTime = document.querySelector("[data-current-time]");
    var emptyState = document.querySelector("[data-empty-state]");
    var formatter = new Intl.DateTimeFormat(undefined, {
      month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit"
    });

    function updateCountdowns() {
      var now = new Date();
      if (currentTime) currentTime.textContent = formatter.format(now);
      counters.forEach(function (counter) {
        var remaining = new Date(counter.getAttribute("data-deadline")) - now;
        var value = counter.querySelector(".academic-deadlines__counter-value");
        if (remaining <= 0) {
          value.textContent = "Passed";
          return;
        }
        var days = Math.floor(remaining / 86400000);
        var hours = Math.floor(remaining / 3600000) % 24;
        var minutes = Math.floor(remaining / 60000) % 60;
        value.textContent = days + "d " + String(hours).padStart(2, "0") + "h " + String(minutes).padStart(2, "0") + "m";
      });
    }

    document.querySelectorAll("[data-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-filter");
        document.querySelectorAll("[data-filter]").forEach(function (item) {
          item.classList.toggle("is-active", item === button);
        });
        document.querySelectorAll(".academic-deadlines__row").forEach(function (item) {
          item.hidden = filter !== "all" && item.getAttribute("data-area") !== filter;
        });
        if (emptyState) {
          emptyState.hidden = document.querySelectorAll(".academic-deadlines__row:not([hidden])").length !== 0;
        }
      });
    });

    updateCountdowns();
    window.setInterval(updateCountdowns, 30000);
  }());
</script>
