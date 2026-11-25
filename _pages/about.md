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
    <p>Ph.D. student in Data Science at UC San Diego, advised by <a href="https://cseweb.ucsd.edu/~haozhang/">Prof. Hao Zhang</a>. My research focuses on <strong>systems for LLM inference and reinforcement learning</strong>, and <strong>verifiable AI infrastructure</strong>.</p>
    <p>Previously, I interned at Google on the <a href="https://github.com/google/tunix">Tunix</a> team (Google’s JAX-native LLM post-training and RL framework on TPUs). I received my B.S. in Data Science from UC San Diego, where I worked with <a href="https://cseweb.ucsd.edu/~haozhang/">Prof. Hao Zhang</a> and <a href="https://www.haojianj.in/">Prof. Haojian Jin</a>.</p>
    <p class="home-links">yuz165 [at] ucsd [dot] edu / <a href="https://scholar.google.com/citations?user=Cc8YPukAAAAJ&amp;hl=en">Google Scholar</a> / <a href="https://github.com/yuxuandexter">GitHub</a> / <a href="https://x.com/Yuxuan_Zhang13">X</a> / <a href="https://www.linkedin.com/in/yuxuan-zhang-dexter">LinkedIn</a></p>
  </div>
  <img class="home-intro__avatar" src="{{ '/images/profile_naive_penguine.jpg' | relative_url }}" alt="Yuxuan Zhang penguin avatar" width="128" height="128">
</div>

<div class="section-heading">
  <h2 id="publications">Publications</h2>
  <span class="section-heading__legend">* equal contribution · † significant contributions</span>
</div>

<div class="publication-list">
{% assign sorted_pubs = site.publications | sort: 'date' | reverse %}
{% for pub in sorted_pubs %}
<div class="publication-item"{% if pub.anchor_id %} id="{{ pub.anchor_id }}"{% endif %}>
  <p class="publication-item__title"><a href="{{ pub.paperurl | default: pub.url }}" target="_blank" rel="noopener noreferrer">{{ pub.title }}</a></p>
  {% if pub.authors %}{% include publication-authors.html authors=pub.authors %}{% endif %}
  <p class="publication-item__meta">{{ pub.venue }}</p>
  <p class="item-links">
    {% if pub.paperurl %}<a href="{{ pub.paperurl }}" target="_blank" rel="noopener noreferrer">{% if pub.category == 'preprints' %}arXiv{% else %}Paper{% endif %}</a>{% endif %}
    {% if pub.blogurl %}<a href="{{ pub.blogurl }}" target="_blank" rel="noopener noreferrer">Blog</a>{% endif %}
    {% if pub.codeurl %}<a href="{{ pub.codeurl }}" target="_blank" rel="noopener noreferrer">{{ pub.code_label | default: "Code" }}</a>{% endif %}
    {% if pub.demourl %}<a href="{{ pub.demourl }}" target="_blank" rel="noopener noreferrer">{{ pub.demo_label | default: "Demo" }}</a>{% endif %}
  </p>
</div>
{% endfor %}
</div>

<div class="section-heading">
  <h2 id="selected-work">Selected Systems &amp; Technical Blogs</h2>
</div>

<div class="work-list">
{% for project in site.data.projects %}
  <article class="work-item" id="{{ project.id }}">
    <div class="work-item__header">
      <h3 class="work-item__title"><a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.name }}</a></h3>
      <span class="work-item__meta">{{ project.role_label }}</span>
    </div>
    <p class="work-item__description">{{ project.description | markdownify | remove: '<p>' | remove: '</p>' }}</p>
    <p class="item-links">
      {% for link in project.links %}<a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>{% endfor %}
    </p>
  </article>
{% endfor %}
</div>
