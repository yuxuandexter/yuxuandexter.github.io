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
  <h2 id="publications">Publications &amp; Technical Blogs</h2>
  <span class="section-heading__legend">* equal contribution · † significant contributions</span>
</div>

<div class="publication-list">
{% for item in site.data.projects %}
<article class="publication-item" id="{{ item.id }}">
  <p class="publication-item__title"><a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a></p>
  {% if item.authors %}{% include publication-authors.html authors=item.authors %}{% endif %}
  <p class="publication-item__meta">{{ item.venue }}</p>
  <p class="item-links">
    {% for link in item.links %}<a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>{% endfor %}
  </p>
</article>
{% endfor %}
</div>
