---
permalink: /
title: "Yuxuan Zhang"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

I'm a research intern at Hao AI Lab, advised by [Prof. Hao Zhang](https://cseweb.ucsd.edu/~haozhang/) and [Prof. Haojian Jin](https://www.haojianj.in/).

My research focuses on building useful AI agents and efficient LLM reinforcement learning systems.

---

## Recent News

{% for news in site.data.news limit:7 %}
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

---

## Projects

<div class="project-grid">
{% for project in site.data.projects %}
  <div class="project-item">
    <div class="project-header">
      <h3><a href="{{ project.url }}" target="_blank">{{ project.name }}</a></h3>
      <span class="project-role project-role--{{ project.role }}">{{ project.role }}</span>
    </div>
    <span class="project-stars">
      {% if project.type == "github" %}
        {% assign url_parts = project.url | split: "/" %}
        {% assign repo_owner = url_parts[3] %}
        {% assign repo_name = url_parts[4] %}
        <img src="https://img.shields.io/github/stars/{{ repo_owner }}/{{ repo_name }}?style=social" alt="GitHub stars">
      {% elsif project.metric %}
        <span class="custom-metric"><i class="fa fa-eye" aria-hidden="true"></i> {{ project.metric }}</span>
      {% endif %}
    </span>
    <p class="project-description">{{ project.description }}</p>
  </div>
{% endfor %}
</div>

---

## Publications

{% assign sorted_pubs = site.publications | reverse %}
{% for pub in sorted_pubs %}
<div class="publication-item">
  <strong><a href="{{ pub.url }}">{{ pub.title }}</a></strong><br>
  <em>{{ pub.venue }}</em><br>
  {% if pub.excerpt %}{{ pub.excerpt | strip_html | truncatewords: 30 }}<br>{% endif %}
  {% if pub.paperurl %}<a href="{{ pub.paperurl }}" class="btn btn--small btn--info">Paper</a>{% endif %}
  {% if pub.codeurl %}<a href="{{ pub.codeurl }}" class="btn btn--small btn--primary">Code</a>{% endif %}
</div>
{% endfor %}

---

## Experience

### Education

{% for edu in site.data.experience.education %}
<div class="experience-card">
  <div class="experience-meta">
    <span class="experience-period">{{ edu.period }}</span>
  </div>
  <div class="experience-content">
    <strong>{{ edu.degree }}</strong><br>
    {{ edu.institution }}
    {% if edu.honors %}<br><em>{{ edu.honors }}</em>{% endif %}
    {% if edu.advisors %}
      <br>Advised by:
      {% for advisor in edu.advisors %}
        <a href="{{ advisor.url }}">{{ advisor.name }}</a>{% unless forloop.last %}, {% endunless %}
      {% endfor %}
    {% endif %}
    {% if edu.focus %}<br>{{ edu.focus }}{% endif %}
  </div>
</div>
{% endfor %}

### Research Experience

{% for res in site.data.experience.research %}
<div class="experience-card">
  <div class="experience-meta">
    <span class="experience-period">{{ res.period }}</span>
  </div>
  <div class="experience-content">
    <strong>{{ res.role }}</strong><br>
    {{ res.lab }}, {{ res.institution }}
  </div>
</div>
{% endfor %}

### Teaching Experience

{% for teach in site.data.experience.teaching %}
<div class="experience-card">
  <div class="experience-meta">
    <span class="experience-period">{{ teach.period }}</span>
  </div>
  <div class="experience-content">
    <strong>{{ teach.role }}</strong><br>
    <a href="{{ teach.course_url }}" target="_blank">{{ teach.course }}</a>, {{ teach.institution }}
  </div>
</div>
{% endfor %}

