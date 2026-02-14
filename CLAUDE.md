# CLAUDE.md — Yuxuan Zhang's Personal Page

## Owner

Yuxuan Zhang — M.S. in CS @ UC San Diego, advised by Prof. Hao Zhang and Prof. Haojian Jin.
Research focus: AI Agents (building agents + agentic RL training).

## Project Overview

A personal academic website hosted on GitHub Pages at <https://yuxuandexter.github.io>.
Built with **Jekyll** using the **Academic Pages** theme (Minimal Mistakes fork).

### Design Philosophy

**Clean. Simple. Elegant.**

- Prefer a single-page feel — the homepage should be the main hub.
- Minimize the number of nav links; avoid clutter.
- Every section should earn its place. If it's empty, remove it from nav.
- No unnecessary boilerplate pages (talks, teaching are disabled for now).

### Target Sections (on homepage or as pages)

| Section              | Status       | Notes                                              |
|----------------------|--------------|----------------------------------------------------|
| About / Bio          | Active       | Short intro, education, interests — on homepage    |
| Recent News          | Active       | Timeline of updates — data file: _data/news.yml    |
| Publications         | Active       | Inline on homepage + detail pages for SEO          |
| Open-Source Projects | Active       | Feature grid on homepage (uses _portfolio/)        |
| Experience           | Active       | Education + Research — data file: _data/experience.yml |
| Blog                 | Planned      | Section placeholder on homepage, enable when ready |
| CV                   | Active       | Separate page with embedded PDF                    |

## Tech Stack

| Layer       | Tool                                           |
|-------------|-------------------------------------------------|
| Framework   | Jekyll 4.x (Ruby)                              |
| Theme       | Academic Pages (Minimal Mistakes fork)          |
| Styling     | SCSS (`_sass/`), compiled to compressed CSS     |
| JS          | jQuery 3.7.1, FitVids, Magnific Popup, Smooth Scroll |
| Markdown    | kramdown with GFM                               |
| Icons       | Font Awesome, Academicons                       |
| Deployment  | GitHub Pages (auto-deploys from `master`)       |
| Package Mgr | Bundler (Ruby), npm (JS build only)             |

## Repository Structure

```
├── _config.yml            # Main Jekyll config (site metadata, author, collections)
├── _data/
│   └── navigation.yml     # Header nav links — toggle sections here
├── _pages/
│   ├── about.md           # Homepage (permalink: /)
│   ├── publications.html  # Publications archive
│   ├── portfolio.html     # Portfolio/projects archive
│   └── cv.md              # CV page (embeds PDF via iframe)
├── _publications/         # Markdown files per paper (YYYY-MM-DD-slug.md)
├── _portfolio/            # Markdown files per project (portfolio-N.md)
├── _posts/                # Blog posts (YYYY-MM-DD-title.md) — empty for now
├── _layouts/              # Liquid HTML templates
├── _includes/             # Reusable template partials
├── _sass/                 # SCSS source files
├── assets/                # Compiled CSS/JS, fonts
├── images/                # All images (profile, project screenshots, etc.)
├── files/                 # Downloadable files (resume PDF, paper PDFs)
├── deprecated/            # Archived old content — do not modify
├── Gemfile                # Ruby dependencies
└── package.json           # Node dependencies (JS build tooling)
```

## Key Files to Edit

### Content Changes (most common)

- **Homepage content**: `_pages/about.md`
- **Navigation links**: `_data/navigation.yml` (uncomment/add entries)
- **Add a publication**: create `_publications/YYYY-MM-DD-slug.md`
- **Add a project**: create `_portfolio/portfolio-N.md`
- **Add a blog post**: create `_posts/YYYY-MM-DD-title.md`
- **Update CV**: replace `files/Yuxuan_Resume.pdf`

### Site-wide Settings

- **Site metadata / author info**: `_config.yml` (requires server restart)
- **Styling overrides**: `_sass/_variables.scss` (colors, fonts, sizes)
- **Layout changes**: `_layouts/` and `_includes/`

## Content Conventions

### Publications (`_publications/`)

```yaml
---
title: "Paper Title"
collection: publications
category: conferences
permalink: /publication/slug
date: 2025-05-21
venue: "NeurIPS '25"
paperurl: "https://arxiv.org/abs/XXXX.XXXXX"
---
Abstract or short description here.
```

### Portfolio Projects (`_portfolio/`)

```yaml
---
title: "Project Name"
excerpt: "One-line description"
collection: portfolio
header:
  teaser: project-screenshot.png
---
Project details in markdown.
```

### Blog Posts (`_posts/`) — for future use

```yaml
---
title: "Post Title"
date: 2025-01-01
tags: [tag1, tag2]
---
Post content in markdown.
```

### Recent News (`_data/news.yml`)

```yaml
- date: 2025-05-21
  title: "Short headline describing the news"
  icon: "fa-file-text"  # Font Awesome icon (optional)
  link: "/path/or/url"   # Internal or external link (optional)
  type: "publication"    # Types: publication, release, award, talk (optional)
```

Display as timeline on homepage with most recent 5-7 items. Types of news to include:
- Paper submissions and acceptances
- Project releases and GitHub milestones
- Awards and recognition
- Conference talks and presentations

### Experience (`_data/experience.yml`)

```yaml
education:
  - degree: "M.S. in Computer Science"
    institution: "UC San Diego"
    period: "2024 - Present"
    advisors:
      - name: "Prof. Hao Zhang"
        url: "https://cseweb.ucsd.edu/~haozhang/"
      - name: "Prof. Haojian Jin"
        url: "https://www.haojianj.in/"
    focus: "AI Agents (building agents + agentic RL training)"

  - degree: "B.S. in Data Science"
    institution: "UC San Diego (Halıcıoğlu Data Science Institute)"
    period: "2020 - 2024"
    honors: "Summa cum laude (top 2%)"

research:
  - role: "Graduate Researcher"
    lab: "HaoAI Lab"
    institution: "UC San Diego"
    period: "2024 - Present"
    focus: "AI Agents research"
```

## Enabling the Blog

When ready to publish blog posts:

1. Create posts in `_posts/` following `YYYY-MM-DD-title.md` naming.
2. Uncomment the Blog link in `_data/navigation.yml`:
   ```yaml
   - title: "Blog"
     url: /year-archive/
   ```
3. The year-archive page at `_pages/year-archive.html` already exists.

## Development

### Local preview

```bash
bundle install          # first time only
jekyll serve -l -H localhost   # serves at http://localhost:4000
```

### Docker alternative

```bash
docker build -t jekyll-site .
docker run -p 4000:4000 --rm -v $(pwd):/usr/src/app jekyll-site
```

### JS build (rarely needed)

```bash
npm run build:js    # rebuild main.min.js
```

### Deploy

Push to `master` — GitHub Pages deploys automatically.

## Guidelines for Claude

When making changes to this site:

1. **Keep it minimal** — do not add pages, sections, or features unless explicitly asked.
2. **Homepage is king** — most content should live on or be accessible from `_pages/about.md`.
3. **Respect the theme** — work within Academic Pages conventions. Don't fight the framework.
4. **No dead links** — if a nav item points to an empty collection, disable it in `navigation.yml`.
5. **Images go in `images/`**, downloadable files in `files/`.
6. **Don't touch `deprecated/`** — it's archived content, leave it alone.
7. **Config changes require restart** — remind the user to restart `jekyll serve` after editing `_config.yml`.
8. **Publication categories** — currently only `conferences` is defined in `_config.yml`. Add new categories there if needed (e.g., `workshops`, `preprints`).
9. **Frontmatter matters** — every content file needs correct YAML frontmatter for Jekyll to process it.
10. **Test locally before pushing** — always suggest running `jekyll serve` to verify changes.
11. **Homepage is truly the hub** — All major sections appear on homepage with smooth scrolling. Detail pages exist but accessed via inline links.
12. **Data files for simple content** — Use `_data/` for news and experience (no detail pages needed).
13. **Collections for rich content** — Use `_publications/` and `_portfolio/` for content that needs detail pages and SEO.
14. **Minimal navigation** — Keep header nav to 3-4 links max. Sections accessed via homepage scrolling.
15. **Open-Source Projects** — Conceptually refers to the `_portfolio/` collection (keep technical implementation unchanged).

## Future Roadmap (User's Intent)

- [x] Add a "Recent News" section to homepage (timeline/list of updates)
- [x] Add "Experience" section with education and research
- [x] Consolidate homepage to be the single main page with all key info
- [x] Rename Portfolio to "Open-Source Projects" conceptually
- [ ] Start blog section when content is ready
- [x] Keep nav bar lean: Publications, Projects, CV
- [ ] Potentially simplify/customize the theme for a more personal aesthetic
