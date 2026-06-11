---
permalink: /
title:
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<div class="home-intro">
  <div class="home-intro__copy">
    <h1>Yuxuan Zhang</h1>

    <p>I am an incoming Ph.D. student at UC San Diego HDSI, advised by <a href="https://cseweb.ucsd.edu/~haozhang/">Prof. Hao Zhang</a>.</p>

    <p>I am a Software Engineering Intern at Google, starting June 15, 2026.</p>

    <p>I work on agentic inference and reinforcement learning for language models.</p>

    <p class="home-links">Email: yuz165 [at] ucsd [dot] edu / <a href="https://github.com/yuxuandexter">GitHub</a> / <a href="https://x.com/Yuxuan_Zhang13">X</a> / <a href="https://www.linkedin.com/in/yuxuan-zhang-dexter">LinkedIn</a> / <a href="https://scholar.google.com/citations?user=Cc8YPukAAAAJ&amp;hl=en">Google Scholar</a></p>
  </div>

  <img class="home-intro__avatar" src="/images/profile_naive_penguine.jpg" alt="Yuxuan Zhang penguin avatar">
</div>

## About

My work focuses on building useful AI agents and scalable systems for LLM reinforcement learning, especially rollout infrastructure, digital environments, and agent evaluation.

Previously, I received my B.S. in Data Science from UC San Diego and worked with [Prof. Hao Zhang](https://cseweb.ucsd.edu/~haozhang/) and [Prof. Haojian Jin](https://www.haojianj.in/) on AI agents and LLM reinforcement learning.

## Recent News

{% for news in site.data.news limit:5 %}
<div class="news-item">
  <span class="news-date">{{ news.date | date: "%b %Y" }}</span>
  <span class="news-content">
    {% if news.icon %}<i class="fa {{ news.icon }}" aria-hidden="true"></i> {% endif %}
    {% if news.link %}
      <a href="{{ news.link }}">{{ news.title }}</a>
    {% else %}
      {{ news.title }}
    {% endif %}
  </span>
</div>
{% endfor %}

## Selected Work

<div class="work-list">
{% for project in site.data.projects %}
  {% unless project.hidden %}
  {% assign project_metrics = project.metrics %}
  {% if project.metrics_key and site.data.github_metrics[project.metrics_key] and site.data.github_metrics[project.metrics_key].metrics %}
    {% assign project_metrics = site.data.github_metrics[project.metrics_key].metrics %}
  {% endif %}
  <div class="work-item">
    <h3 class="work-item__title"><a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.name }}</a></h3>
    {% if project.role_label or project_metrics %}
      <p class="work-item__meta">
        {% if project.role_label %}<span>{{ project.role_label }}</span>{% endif %}
        {% for metric in project_metrics %}
          <span>{{ metric }}</span>
        {% endfor %}
      </p>
    {% endif %}
    <p class="work-item__description">{{ project.description }}</p>
    {% if project.links %}
      <p class="item-links">
        {% for link in project.links %}
          <a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
        {% endfor %}
      </p>
    {% endif %}
  </div>
  {% endunless %}
{% endfor %}
</div>

## Publications

{% assign sorted_pubs = site.publications | reverse %}
{% for pub in sorted_pubs %}
<div class="publication-item">
  <p class="publication-item__title"><a href="{{ pub.url }}">{{ pub.title }}</a></p>
  <p class="publication-item__meta">{{ pub.venue }}</p>
  {% if pub.excerpt %}<p class="publication-item__description">{{ pub.excerpt | strip_html | truncatewords: 30 }}</p>{% endif %}
  {% if pub.paperurl or pub.codeurl %}
    <p class="item-links">
      {% if pub.paperurl %}<a href="{{ pub.paperurl }}">Paper</a>{% endif %}
      {% if pub.codeurl %}<a href="{{ pub.codeurl }}">Code</a>{% endif %}
    </p>
  {% endif %}
</div>
{% endfor %}
