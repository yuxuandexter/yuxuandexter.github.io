# Simplify and Update Personal Page

## Objective

Redesign the personal homepage into a clean, single-page academic profile that clearly communicates:

- Yuxuan Zhang is an incoming Ph.D. student at UC San Diego HDSI, advised by Prof. Hao Zhang.
- Yuxuan Zhang will join Google as a Software Engineering Intern on June 15, 2026.
- The research focus is AI agents and efficient reinforcement learning systems for LLM post-training.
- Recent work, especially NanoRollout, should be visible without making the page feel like a portfolio landing page.

This task is planning-only for now. Site implementation should happen phase by phase after discussion.

## Current State

Relevant files:

- `_pages/about.md`: homepage content and homepage section loops.
- `_config.yml`: site title, description, author profile, sidebar links.
- `_data/navigation.yml`: top navigation; currently includes an empty Blog link.
- `_data/news.yml`: homepage news items; Google date needs updating.
- `_data/projects.yml`: project cards shown on homepage.
- `_data/experience.yml`: education, research, and teaching timelines.
- `_sass/_page.scss`: custom styles for news, projects, publications, and experience.

Current issues:

- The homepage still describes an older status and does not reflect incoming Ph.D. / Google intern updates.
- Blog is linked, but there is no `_posts` directory with published posts.
- CV can be temporarily removed to keep the page focused.
- The visual style is heavier than needed: cards, badges, star shields, thick dividers, and sidebar metadata make the page feel more like a template than a minimal academic profile.
- Some useful content exists in data files, but the homepage needs stronger prioritization.

## Target Direction

Use a restrained academic homepage structure, closer to:

1. Name and identity block.
2. Short links row.
3. About.
4. News.
5. Selected Work.
6. Publications.

The homepage should be the main product. Separate pages can remain for SEO or future use, but the user-facing navigation should stay minimal.

## Design Principles

- One page first.
- Plain academic typography.
- No marketing hero section.
- No heavy cards unless there is a strong reason.
- No empty navigation items.
- Make recent status changes concrete with exact dates.
- Prefer text links over button-like UI.
- Keep visual hierarchy from content, spacing, and typography rather than color badges.

## Proposed Information Architecture

Homepage:

```text
Yuxuan Zhang

Incoming Ph.D. student at UC San Diego HDSI, advised by Prof. Hao Zhang.
Incoming Software Engineering Intern at Google, starting June 15, 2026.

I work on AI agents and efficient reinforcement learning systems for LLM post-training.

Email / GitHub / LinkedIn / optional Scholar / optional X

About
News
Selected Work
Publications
```

Top navigation:

```text
Home
```

or, if external links are desired:

```text
Home / GitHub / LinkedIn
```

For the first simplification pass, remove Blog and CV from visible navigation.

## Phases

### Phase 01: Content and Navigation Decisions

Create a clean source of truth for current identity, recent updates, and links.

Primary questions:

- Should the homepage say "incoming Ph.D. student" or "Ph.D. student"?
- Which links should appear in the first screen?
- Should CV be completely hidden for now, or only removed from nav?
- Is the NanoRollout Notion URL public and stable enough to publish?

Output:

- Final homepage copy.
- Updated news items.
- Reduced nav plan.

Details: `phase_impl/phase_01.md`

### Phase 02: Homepage Structure

Restructure the homepage into a minimal one-page profile.

Primary choices:

- Keep or remove the Academic Pages sidebar on the homepage.
- Convert project cards into a lightweight "Selected Work" list.
- Keep publications inline, but make them compact.
- Decide whether Experience remains visible or is folded into About.

Output:

- Updated `_pages/about.md` structure.
- Possibly updated data file shape for selected work.

Details: `phase_impl/phase_02.md`

### Phase 03: Visual Simplification

Reduce template heaviness and make the page feel cleaner.

Primary choices:

- Lighter section spacing and dividers.
- Less color and fewer badges.
- Text-link style for Paper / Code / Project links.
- One consistent max-width for readable academic content.

Output:

- Scoped SCSS updates in `_sass/_page.scss`.
- Optional minor sidebar/nav SCSS updates if Phase 02 keeps the theme layout.

Details: `phase_impl/phase_03.md`

### Phase 04: Verification and Launch

Build, inspect, and publish only after the content and visual direction is stable.

Primary checks:

- Local Jekyll build succeeds.
- Homepage works on desktop and mobile.
- No empty nav pages.
- External links work.
- No stale metadata in `_config.yml`.

Output:

- Verified local preview.
- Final diff ready to commit and deploy.

Details: `phase_impl/phase_04.md`

## Out of Scope for First Iteration

- Full custom theme rebuild.
- Blog design.
- CV page redesign.
- New logo or brand system.
- Animated/interactive homepage.
- Large publication database work.

## Future Backlog

- Reintroduce Blog when there are real posts.
- Reintroduce CV after the PDF and homepage copy align.
- Add Google Scholar if the profile is ready.
- Add a dedicated project page only if NanoRollout or another project needs a richer public description.
- Add publication authors and stronger metadata if the publication list grows.

