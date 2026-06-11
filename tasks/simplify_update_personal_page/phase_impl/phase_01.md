# Phase 01: Content and Navigation Decisions

## Goal

Settle the content before changing layout or styling. The first pass should make the homepage accurate, current, and focused.

## Files Likely Involved

- `_pages/about.md`
- `_config.yml`
- `_data/news.yml`
- `_data/navigation.yml`
- `_data/projects.yml`

## Final Identity Copy

Homepage intro:

```text
I am an incoming Ph.D. student at UC San Diego HDSI, advised by Prof. Hao Zhang.
I am a Software Engineering Intern at Google, starting June 15, 2026.
```

Research wording:

```text
I work on agentic inference and reinforcement learning for language models.
```

## News Items

Recommended first two items:

```yaml
- date: 2026-06-15
  title: "Starting as a Software Engineering Intern at Google."
  icon: "fa-briefcase"
  type: "career"

- date: 2026-03-01
  title: "Incoming Ph.D. student at UC San Diego HDSI, advised by Prof. Hao Zhang."
  icon: "fa-graduation-cap"
  type: "education"
```

Open date question:

- If the Ph.D. enrollment is "Spring 2026" but no exact date should be shown, use `2026-03-01` only as a sorting date and render it as `Spring 2026` with a custom label.
- If the site keeps date formatting from Liquid, exact dates are easier to maintain.

## NanoRollout

Selected work entry:

```yaml
- name: "NanoRollout"
  description: "Scalable rollout infrastructure for agentic inference and LLM reinforcement learning."
  url: "https://cocoa-org.notion.site/nanorollout"
  type: "project"
  role: "work"
```

Open question:

- The user confirmed the Notion URL is intended to be public. It should still be link-checked in Phase 04 before launch.

## About Background Copy

Use this simplified background sentence:

```text
Previously, I received my B.S. in Data Science from UC San Diego and worked with Prof. Hao Zhang and Prof. Haojian Jin on AI agents and LLM reinforcement learning.
```

Do not mention an incomplete master's degree on the public homepage.

## Navigation

Recommended visible navigation for the first iteration:

```yaml
main:
  - title: "Home"
    url: /
```

Reasoning:

- Blog is empty and should not be linked.
- CV is intentionally removed for now.
- Publications and selected work are visible on the homepage.

Alternative:

```yaml
main:
  - title: "Home"
    url: /
  - title: "GitHub"
    url: https://github.com/yuxuandexter
  - title: "LinkedIn"
    url: https://www.linkedin.com/in/yuxuan-zhang-dexter
```

Use the alternative only if the top bar should serve as the primary link row.

## Config Updates

Recommended site metadata:

```yaml
title: "Yuxuan Zhang"
description: "Incoming Ph.D. student at UC San Diego HDSI working on agentic inference and LLM reinforcement learning."
```

Recommended author metadata:

```yaml
bio: "Incoming Ph.D. student at UC San Diego HDSI. Agentic inference and LLM reinforcement learning."
employer: "UC San Diego"
github: "yuxuandexter"
twitter: "Yuxuan_Zhang13"
linkedin: "yuxuan-zhang-dexter"
googlescholar: "https://scholar.google.com/citations?user=Cc8YPukAAAAJ&hl=en"
```

Email should not be exposed as a direct `mailto:` link in the sidebar. Until Phase 02 introduces the final intro block, the homepage should render it as text:

```text
Email: yuz165 [at] ucsd [dot] edu
GitHub: https://github.com/yuxuandexter
X: https://x.com/Yuxuan_Zhang13
LinkedIn: https://www.linkedin.com/in/yuxuan-zhang-dexter
Google Scholar: https://scholar.google.com/citations?user=Cc8YPukAAAAJ&hl=en
```

If the homepage removes the sidebar, author metadata still matters for SEO and fallback pages.

## Acceptance Criteria

- Homepage copy says "incoming Ph.D. student" unless the user decides otherwise.
- Google internship update uses the concrete date June 15, 2026.
- Blog is removed from visible navigation.
- CV is not visible in primary navigation.
- NanoRollout is included as selected work; final link validation remains in Phase 04.
- `_config.yml` no longer describes the old MS-student-only status.
