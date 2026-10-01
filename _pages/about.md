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
    <p>I am a Ph.D. student in Data Science at UC San Diego, advised by <a href="https://cseweb.ucsd.edu/~haozhang/">Prof. Hao Zhang</a>. My research focuses on <strong>systems for LLM inference and reinforcement learning</strong>, including efficient model execution and infrastructure for training agents at scale.</p>
    <p>Previously, I interned at Google on the Tunix team. I received my B.S. in Data Science from UC San Diego, where I worked with <a href="https://cseweb.ucsd.edu/~haozhang/">Prof. Hao Zhang</a> and <a href="https://www.haojianj.in/">Prof. Haojian Jin</a> on language-model agents and reinforcement learning.</p>
    <p class="home-links">Email: yuz165 [at] ucsd [dot] edu / <a href="https://github.com/yuxuandexter">GitHub</a> / <a href="https://x.com/Yuxuan_Zhang13">X</a> / <a href="https://www.linkedin.com/in/yuxuan-zhang-dexter">LinkedIn</a> / <a href="https://scholar.google.com/citations?user=Cc8YPukAAAAJ&amp;hl=en">Google Scholar</a></p>
  </div>
  <img class="home-intro__avatar" src="{{ '/images/profile_naive_penguine.jpg' | relative_url }}" alt="Yuxuan Zhang penguin avatar" width="144" height="144">
</div>

## Recent News

{% for news in site.data.news limit:5 %}
<div class="news-item">
  <span class="news-date">{{ news.date | date: "%b %Y" }}</span>
  <span class="news-content">
    {% if news.link %}<a href="{{ news.link }}">{{ news.title | markdownify | remove: '<p>' | remove: '</p>' }}</a>{% else %}{{ news.title | markdownify | remove: '<p>' | remove: '</p>' }}{% endif %}
    {% for link in news.links %}<a class="news-link" href="{{ link.url }}">{{ link.label }}</a>{% endfor %}
  </span>
</div>
{% endfor %}

## Selected Work

<div class="work-list">
{% for project in site.data.projects %}
  <article class="work-item" id="{{ project.id }}">
    <h3 class="work-item__title"><a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">{{ project.name }}</a></h3>
    <p class="work-item__meta">{{ project.role_label }}</p>
    <p class="work-item__description">{{ project.description | markdownify | remove: '<p>' | remove: '</p>' }}</p>
    <p class="item-links">
      {% for link in project.links %}<a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>{% endfor %}
    </p>
  </article>
{% endfor %}
</div>

## Publications

{% assign sorted_pubs = site.publications | sort: 'publication_year' | reverse %}
{% for pub in sorted_pubs %}
<div class="publication-item">
  <p class="publication-item__title"><a href="{{ pub.paperurl | default: pub.url }}">{{ pub.title }}</a></p>
  {% if pub.authors %}{% include publication-authors.html authors=pub.authors %}{% endif %}
  <p class="publication-item__meta">{{ pub.venue }}</p>
  <p class="item-links">
    {% if pub.paperurl %}<a href="{{ pub.paperurl }}">Paper</a>{% endif %}
    {% if pub.codeurl %}<a href="{{ pub.codeurl }}">Code</a>{% endif %}
  </p>
</div>
{% endfor %}
