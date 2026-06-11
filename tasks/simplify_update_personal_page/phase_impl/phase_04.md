# Phase 04: Polish and Launch Readiness

## Goal

Polish the simplified homepage and verify that it is ready to deploy.

## Files Likely Involved

- All files modified in Phases 01-03.
- `_publications/*`, if publication metadata needs small cleanup.
- Generated `_site/` output, if built locally, should not be committed unless already part of the repo workflow.

## Content Polish

Check:

- intro says incoming Ph.D. student at UC San Diego HDSI;
- advisor is Prof. Hao Zhang;
- Google internship uses June 15, 2026;
- research focus is agentic inference and LLM reinforcement learning;
- About mentions B.S. in Data Science from UC San Diego and worked with Prof. Hao Zhang and Prof. Haojian Jin;
- no unfinished master's degree is mentioned;
- publication titles and excerpts do not contain non-breaking spaces or unusual hyphen characters that may wrap poorly.

## GitHub Metrics

Refresh build-time metrics:

```bash
npm run update:github-metrics
```

Expected behavior:

- `GamingAgent` uses `yuxuandexter` contributor commits, stars, and ICLR 2026.
- `NanoRollout` uses repo stars and fixed impact metrics, not personal commit count.
- `GRL` remains in the data file but is hidden from the homepage.
- `Tunix` uses `yuxuandexter` contributor commits and repo stars.

## Build Check

Run:

```bash
bundle exec jekyll build --trace
```

Current status: local Bundler/Jekyll dependencies are installed and the build should pass.

## Local Preview

Run:

```bash
bundle exec jekyll serve -H localhost --port 4000 --no-watch
```

Open:

```text
http://localhost:4000
```

Check desktop and mobile widths.

## Link Audit

Check:

- Email text is obfuscated and not a mailto link.
- GitHub link.
- X link.
- LinkedIn link.
- Google Scholar link.
- Prof. Hao Zhang link.
- Prof. Haojian Jin link.
- Google-related text has no incorrect external link unless intentionally added.
- NanoRollout GitHub URL and blog URL are public and stable.
- Paper links.
- Code links.
- Demo link.

## Content Audit

Check:

- The page says "incoming Ph.D. student" if that is still the desired wording.
- Google internship uses June 15, 2026.
- Blog is not visible in nav.
- CV is not visible in nav.
- `_config.yml` metadata is not stale.
- No template sample pages are linked from the main homepage experience.
- Footer does not expose template credits, duplicate social links, or RSS links that make the page feel unfinished.

## Visual QA

Desktop:

- First screen shows name, role, core links, and maybe the beginning of About.
- Line length is comfortable.
- Section headings are visible but not oversized.
- Selected Work is scannable.

Mobile:

- Intro does not wrap awkwardly.
- Link row wraps cleanly.
- News dates do not collide with text.
- Selected Work and Publications remain readable.

## Deployment

After verification:

```bash
git status --short
git diff
```

Then commit and push through the existing GitHub Pages workflow.

The GitHub metrics workflow can be run manually with `workflow_dispatch` after deployment, or it will refresh weekly.

## Acceptance Criteria

- Jekyll build passes.
- Homepage is visually checked locally.
- Empty Blog nav is gone.
- CV is hidden from primary navigation.
- GitHub metrics are generated from the updater script.
- All visible external links are valid.
- The final diff only includes intentional planning/implementation changes.
