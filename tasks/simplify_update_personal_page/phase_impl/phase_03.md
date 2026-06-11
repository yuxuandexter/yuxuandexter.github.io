# Phase 03: Visual and Selected Work Redesign

## Goal

Make the page feel intentional, minimal, and academic without replacing the Jekyll theme. This phase also fixes the Selected Work section so it is compact but informative, not just plain text.

## Files Likely Involved

- `_sass/_page.scss`
- `_layouts/single.html`
- `_pages/about.md`
- `_data/projects.yml`

## Visual Direction

The target is a restrained academic profile:

- readable line length;
- plain text links;
- light section dividers;
- no heavy cards;
- no colorful badges;
- no marketing-style hero;
- no decorative backgrounds.
- a small penguin avatar in the intro, not the oversized raw image.
- selected work entries with role, metrics, links, and one-line descriptions.

## Page Width and Spacing

Recommended:

- Keep content max width around 760-860px if the sidebar is removed.
- Use section spacing to create hierarchy.
- Make headings smaller and quieter than the current page title.

Implementation direction:

```scss
.page--home {
  max-width: 820px;
}
```

The layout should add a `page--home` class only for `/`, so width and homepage-specific styling do not affect publication detail pages.

## Intro Styling

Decision:

```scss
.home-intro {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;

  h1 {
    margin-bottom: 0.25rem;
  }

  .home-role {
    margin-bottom: 0.25rem;
    color: $dark-gray;
  }

  .home-links a {
    margin-right: 0.8rem;
  }
}
```

Keep the links text-based. Avoid button styling.

Avatar:

- Use `images/profile_naive_penguine.jpg`.
- Render around 136-144px.
- Use circular crop.
- On mobile, stack the avatar and text.

## News Styling

Current news style is close, but can be lighter:

- Keep date + content layout.
- Remove or lighten borders.
- Avoid icon color dominance.

Recommended:

```text
Jun 2026    I will join Google as a Software Engineering Intern.
Spring 2026 I will start my Ph.D. at UC San Diego HDSI.
```

If exact season labels are needed, add a `label` field in `_data/news.yml`.

## Selected Work Styling

Replace card styling with compact informative list styling:

```text
GamingAgent
LLM/VLM gaming agents and model evaluation through games.
Co-lead / top contributor / 254 commits / 938 stars / ICLR 2026
[GitHub] [Paper] [Website]

NanoRollout
Scalable rollout infrastructure for agentic inference and LLM reinforcement learning.
Contributor / 29 stars / 500-worker SWE-Bench eval / 300K+ trajectories
[GitHub] [Blog]

Tunix
A lightweight JAX-based library for LLM post-training.
Contributor / 11 commits / 2.3k stars / Google open source / LLM post-training
[GitHub]
```

Remove or stop using:

- `.project-grid`
- `.project-item`
- `.project-role`
- GitHub star shields

Metrics are static values in `_data/projects.yml`, not runtime GitHub requests. GitHub contributor API currently recognizes `yuxuandexter` as #1 contributor on GamingAgent with 254 commits, as the listed contributor on GRL with 164 commits, and as a Tunix contributor with 11 commits. NanoRollout does not currently credit `yuxuandexter` in the public contributors endpoint, so use repo/impact metrics there rather than personal commit counts. GRL is kept in the data file but hidden from the homepage after Tunix replaces it in Selected Work.

## Publications Styling

Keep each publication as a compact block:

```scss
.publication-item {
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid $lighter-gray;
}
```

Decision: remove button classes for Paper / Code links. Text links look more consistent with the desired academic style.

## Link System Iteration

After review, use one shared action-link treatment for both Selected Work and Publications:

```text
Title
Role / metadata / metrics
Short description.
GitHub  Paper  Website
```

Implementation direction:

- do not float project links to the right of the title;
- do not use bracketed links or button-like links;
- keep title links dark and quiet;
- place action links on the final line of each item;
- use the same `.item-links` class for project links and publication links;
- keep prose links as normal inline links.

## Masthead

Recommended:

- Rename visible title from "About Me" to "Yuxuan Zhang" via `_config.yml`.
- Keep navigation minimal.
- Consider reducing masthead height only if the page feels cramped after Phase 02.

Do not over-invest in masthead styling during this phase.

## Color Palette

Use existing theme colors with restraint:

- Text: existing dark gray / near black.
- Links: existing info color or a slightly darker blue.
- Borders: very light gray.
- No new palette unless the existing link color looks too bright after implementation.

## Acceptance Criteria

- No visible card grid for selected work.
- No colorful role badges.
- No star shields on the homepage.
- Penguin avatar is constrained to a small, intentional size.
- Homepage has a readable centered width after sidebar removal.
- Selected Work includes role, metrics, descriptions, and links.
- Links are easy to scan but do not look like buttons.
- Mobile layout does not create cramped columns.
- The page feels like an academic profile, not a product landing page.
