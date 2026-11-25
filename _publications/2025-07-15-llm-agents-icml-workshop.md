---
title: "General Modular Harness for LLM Agents in Multi-Turn Gaming Environments"
collection: publications
category: conferences                 # ICML MAS is a workshop
permalink: /publication/2025-07-15-llm-agents-icml-workshop
excerpt: "Introduces a perception-memory-reasoning harness that consistently boosts LLM/VLM gameplay across classic and modern game suites, uncovering module-specific performance patterns."
date: 2025-07-15                   # submission date (v1)
venue: "ICML MAS Workshop 2025"
publication_year: 2025
authors:
  - "Yuxuan Zhang*"
  - "Haoyang Yu*"
  - "Lanxiang Hu"
  - "Haojian Jin"
  - "Hao Zhang"
paperurl: "https://arxiv.org/abs/2507.11633"
doi: "10.48550/arXiv.2507.11633"
codeurl: "https://github.com/lmgame-org/GRL"
code_label: "GRL"
demourl: "https://x.com/haoailab/status/1912231343372812508"
demo_label: "Demo"
---

{% include publication-authors.html authors=page.authors %}

{{ page.excerpt | markdownify }}

<p class="item-links"><a href="{{ page.paperurl }}">Paper</a>{% if page.codeurl %}<a href="{{ page.codeurl }}">{{ page.code_label | default: "Code" }}</a>{% endif %}{% if page.demourl %}<a href="{{ page.demourl }}">{{ page.demo_label | default: "Demo" }}</a>{% endif %}</p>
