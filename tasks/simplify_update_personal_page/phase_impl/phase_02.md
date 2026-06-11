# Phase 02: Homepage Structure

## Goal

Turn the homepage into a focused one-page academic profile. This phase should change information architecture, not polish every visual detail.

## Files Likely Involved

- `_pages/about.md`
- `_data/projects.yml`
- `_data/experience.yml`
- Possibly `_includes/author-profile.html` only if the sidebar is kept and needs small copy cleanup.

## Recommended Structure

```markdown
---
permalink: /
title: "Yuxuan Zhang"
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<div class="home-intro">
  ...
</div>

## About

## News

## Selected Work

## Publications
```

Final Phase 02 decision:

- Homepage sidebar: off.
- Avatar: yes, use the current penguin avatar in the intro.
- Education section: no separate section.
- Education/background: one sentence in About.
- Selected Work order: GamingAgent, NanoRollout, Ace Attorney AI Gameplay Demo, GRL.
- Experience section: remove from homepage.

## Sidebar Decision

Decision: set `author_profile: false` on the homepage.

Why:

- The Academic Pages sidebar is useful for a CV-style site, but it creates template weight on a minimal one-page profile.
- A first-screen intro block can show name, status, links, and optional avatar more cleanly.
- Other pages can still use the sidebar if needed later.

## Intro Block

Recommended content:

```html
<div class="home-intro">
  <div class="home-intro__copy">
    <h1>Yuxuan Zhang</h1>
    <p class="home-role">
      I am an incoming Ph.D. student at UC San Diego HDSI, advised by
      <a href="https://cseweb.ucsd.edu/~haozhang/">Prof. Hao Zhang</a>.
    </p>
    <p class="home-role">
      I am a Software Engineering Intern at Google, starting June 15, 2026.
    </p>
    <p>
      I work on agentic inference and reinforcement learning for language models.
    </p>
    <p class="home-links">
      Email: yuz165 [at] ucsd [dot] edu /
      <a href="https://github.com/yuxuandexter">GitHub</a> /
      <a href="https://x.com/Yuxuan_Zhang13">X</a> /
      <a href="https://www.linkedin.com/in/yuxuan-zhang-dexter">LinkedIn</a> /
      <a href="https://scholar.google.com/citations?user=Cc8YPukAAAAJ&amp;hl=en">Google Scholar</a>
    </p>
  </div>
  <img class="home-intro__avatar" src="/images/profile_naive_penguine.jpg" alt="Yuxuan Zhang penguin avatar">
</div>
```

Optional additions:

- Phase 03 will style the avatar and intro layout.

## About Section

Keep this short. Suggested shape:

```text
My work focuses on building useful AI agents and scalable systems for LLM reinforcement learning, especially rollout infrastructure, digital environments, and agent evaluation.

Previously, I received my B.S. in Data Science from UC San Diego and worked with Prof. Hao Zhang and Prof. Haojian Jin on AI agents and LLM reinforcement learning.
```

Open question:

- Resolved: mention Prof. Hao Zhang in the Ph.D. intro; mention Prof. Hao Zhang and Prof. Haojian Jin in the About background sentence.

## Selected Work

Replace the current project card grid with a compact list.

Suggested rendering:

```text
GamingAgent
LLM/VLM gaming agents and model evaluation through games.
[GitHub]

NanoRollout
Scalable rollout infrastructure for agentic inference and LLM reinforcement learning.
[Project]

Ace Attorney AI Gameplay Demo
AI agent playing Ace Attorney game with 1 million views.
[Demo]

GRL
Multi-turn RL training system for post-training LLMs on games.
[GitHub]
```

Do not show GitHub star badges in the first simplified version.

Do not show colorful role badges in the first simplified version.

## Publications

Keep publications inline on the homepage, but make each item compact:

```text
LMGame-Bench: How Good are LLMs at Playing Games?
ICLR 2026. One-sentence summary.
[Paper] [Code]
```

Open question:

- Add author names now or wait until the publication list grows?

Recommendation:

- For now, omit long author lists on the homepage unless authorship order is important for credibility.
- Publication detail pages can keep richer metadata.

## Experience Section

Decision for first iteration: remove the large Experience section from the homepage.

Reasoning:

- Incoming Ph.D. and Google already appear above the fold and in News.
- Education can be covered in About.
- Teaching can wait unless it is strategically important.

## Acceptance Criteria

- Homepage reads cleanly from top to bottom without relying on a sidebar.
- The first screen communicates identity, current status, and links.
- Projects become "Selected Work" and use a text list.
- Publications remain visible but compact.
- Experience is removed; background remains as one sentence in About.
