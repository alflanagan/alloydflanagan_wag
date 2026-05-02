# alloydflanagan_wag — Claude Context

Personal website for A. Lloyd Flanagan (https://alloydflanagan.com).
Originally a Wagtail project; Wagtail was removed and the site now uses
plain Django 5.2.

The canonical source is GitLab (GitHub is a mirror):
https://gitlab.com/a-lloyd-flanagan-group/alloydflanagan_wag

---

## Repository layout

```
/                          ← repo root
├── Dockerfile             ← production image (python:3.14.0-trixie)
├── context.Dockerfile     ← dummy image for testing .dockerignore
├── docker-compose.yml     ← local dev stack (wagtail + postgres + redis)
├── docker-entrypoint-initdb.d/
│   └── setup-database.sql ← creates dev DB user + database on first run
├── .dockerignore          ← excludes .venv, .yarn, media, .env*, *.bak etc.
├── .env                   ← gitignored; holds DATABASE_URL for production
├── fly.toml               ← Fly.io config (app: alloydflanagan-wag, region: iad)
├── fly-preview.yml        ← GitHub Actions workflow: PR review apps on Fly.io
├── mise.toml              ← tool versions (node 24, python 3.14.2)
├── Makefile               ← docker-compose helpers + fly.io exec shortcuts
├── Procfile               ← release: migrate; web: gunicorn (Heroku-style)
├── figma_ready_component_list_consulting_developer_site.md
│                          ← Figma component planning doc for site redesign
└── app/                   ← Django project root (Docker WORKDIR /app)
    ├── manage.py
    ├── pyproject.toml     ← Python deps, ruff/isort config
    ├── package.json       ← JS deps and scripts
    ├── webpack.config.js  ← bundles app/alloydflanagan/src/ → static/dist/bundle.js
    ├── Makefile           ← dev task runner (lint, format, test, server)
    ├── uv.lock
    ├── yarn.lock
    ├── .prettierrc
    ├── .yarnrc.yml        ← pins yarn 4.12.0
    ├── stylelint.config.js
    └── alloydflanagan/    ← Django project package
        ├── settings/
        │   ├── base.py
        │   ├── dev.py
        │   └── production.py
        ├── urls.py
        ├── wsgi.py
        ├── middleware.py
        ├── src/           ← JS Web Components (webpack entry point: index.js)
        ├── static/
        │   ├── css/
        │   │   ├── index.css
        │   │   └── variables.css   ← all design tokens (CSS custom properties)
        │   └── dist/               ← webpack output (not committed; run yarn build)
        ├── templates/     ← project-level templates (base.html, components/)
        ├── blog/
        ├── home/
        ├── about_me/
        ├── search/
        └── design_system/
```

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Python | 3.14 (requires-python `>=3.14,<3.15`) |
| Web framework | Django 5.2 |
| WSGI server | Gunicorn |
| Database | PostgreSQL (prod), SQLite dev fallback via file |
| Caching | Redis (prod) / DummyCache (dev) |
| Static files | WhiteNoise |
| Frontend | Lit 3 Web Components, Webpack 5 |
| JS linter | StandardJS (eslint-based, no semicolons, single quotes) |
| CSS linter | Stylelint |
| JS formatter | Prettier |
| Python linter | Ruff + flake8 |
| Import sorter | isort |
| Python formatter | Black |
| HTML formatter | djhtml |
| Python env | uv |
| Node env | Yarn 4 (Berry) |
| Deployment | Fly.io |

Key Django packages: `django-htmx`, `django-debug-toolbar` (dev only),
`django-structlog`, `djangorestframework`, `dj-database-url`, `pillow`,
`psycopg` (v3).

---

## Django apps

| App | URL prefix | Status |
|-----|-----------|--------|
| `home` | `/` | Active |
| `about_me` | `/about/` | Active |
| `design_system` | `/design` | Active |
| `search` | — | Active (view only, no model) |
| `blog` | `/blog/` | **In progress** — URL commented out; has requirements doc, models, stub DRF APIView |

Each app follows the standard Django layout: `models.py`, `views.py`,
`urls.py`, `admin.py`, `templates/<app>/`, `migrations/`. Some apps
also have a `src/` directory for app-specific Lit components.

---

## Frontend architecture

JavaScript is written as **Lit 3 Web Components** and registered as
native custom elements. The entry point is `alloydflanagan/src/index.js`,
which imports and registers all components.

**Custom elements defined:**

| Element | File |
|---------|------|
| `<page-header>` | `src/page_header.js` |
| `<menu-link>` | `src/menu_link.js` |
| `<hero-block>` | `src/hero.js` |
| `<about-section>` | `about_me/src/about_section.js` |
| `<principles-block>` | `src/principles.js` |
| `<unsplash-credit>` | `src/unsplash_credit.js` |

Webpack bundles everything to `alloydflanagan/static/dist/bundle.js`
(loaded via `<script type="module">` in `base.html`).

**CSS design tokens** live in `alloydflanagan/static/css/variables.css`.
All components use `var(--token-name)` — never hard-coded values. Tokens
include colors, typography, spacing (8px grid), layout widths, borders,
shadows, motion, and z-index. Full dark-mode support via
`@media (prefers-color-scheme: dark)`.

---

## Settings

Three settings files, all in `alloydflanagan/settings/`:

- `base.py` — shared config; reads `DATABASE_URL` via `dj-database-url`
- `dev.py` — `DEBUG=True`, debug-toolbar, `DummyCache`,
  `DisableBrowserCacheMiddleware`; tries to import `local.py`
- `production.py` — `DEBUG=False`; reads `DJANGO_SECRET_KEY` and
  `DJANGO_ALLOWED_HOSTS` from env; tries to import `local.py`

An optional `settings/local.py` (not in git) can be used for personal
overrides in both envs.

`DJANGO_SETTINGS_MODULE` is set via environment:
- docker-compose → `alloydflanagan.settings.dev`
- Dockerfile/production → `alloydflanagan.settings.production`

---

## Development workflow

### Starting local dev

```sh
# from repo root
make start        # docker compose up --wait
make stop         # docker compose down --remove-orphans
make shell        # exec bash in wagtail container (as app user)
make rootshell    # exec bash in wagtail container (as root)
make dbshell      # exec bash in postgres container
```

Docker-compose mounts key source dirs into the running container so
edits are live without rebuilding. The `.venv` directory is
intentionally **not** mounted.

### Dev credentials (docker-compose only)

```
DB: postgres://wagtail:development@localhost:5432/alloydflanagan
Django superuser: lloyd / lloyd  (email: lloyd@me.com)
SECRET_KEY: soveryverysecret
```

### Creating a superuser locally

```sh
docker compose exec -it wagtail bash
uv run python manage.py createsuperuser
```

### Running tasks (inside container or with uv/yarn directly)

All Python commands must be run via `uv run` (picks up the `.venv`):

```sh
# from app/
uv run python manage.py <command>

make dev-server   # uv run python manage.py runserver 0.0.0.0:8080
make run-server   # migrate + collectstatic + gunicorn (production target)
```

JS commands use Yarn:

```sh
# from app/
yarn build        # webpack bundle
yarn watch        # webpack --watch
yarn test         # mocha
yarn lintjs       # StandardJS check
yarn formatjs     # StandardJS --fix
yarn stylelint    # CSS lint
yarn style-fix    # CSS lint --fix
```

### Linting (app/Makefile)

```sh
make lint         # isort + black + flake8 + djhtml (all Python/HTML)
make isort        # import sort only
make black        # format only
make flake8       # lint only
make djhtml       # HTML template indent (2 spaces)
make lintjs       # JS (StandardJS)
make formatjs     # JS fix
make lintcss      # CSS (stylelint)
make formatcss    # CSS fix
```

---

## Code style

### Python

- Line length: **100**
- Formatter: `black`
- Linter: `ruff` + `flake8`
- Imports: `isort` with Django section ordering
  (`FUTURE › STDLIB › DJANGO › THIRDPARTY › FIRSTPARTY › LOCALFOLDER`),
  multi-line output 3
- Migrations excluded from all linting
- Run everything via `uv run`

### JavaScript

- **No semicolons**, single quotes, trailing commas (StandardJS + Prettier)
- ES modules (`"type": "module"` in package.json)
- Webpack config is ESM (`webpack.config.js`, uses `import`/`export default`
  and `fileURLToPath` to reconstruct `__dirname`)
- Lit components: use `html` and `css` tagged template literals; always
  use design tokens

### CSS / HTML templates

- All CSS values must use design tokens from `variables.css` — no magic numbers
- HTML templates: 2-space indent enforced by `djhtml`
- Stylelint config in `stylelint.config.js`

---

## Deployment (Fly.io)

App name: `alloydflanagan-wag`, primary region: `iad`.  
Separate Fly Postgres app: `alf-wag-db`.

```sh
# from repo root Makefile
make fly_dbshell   # open Django dbshell on the fly machine
make fly_console   # open Fly console
make fly_users     # count Django users on fly machine
```

The production Docker image installs uv via pip, then
`uv sync --frozen --no-dev`, then installs Node 24 via `n` and runs
`yarn build`. The `CMD` is `make run-server` (migrate → collectstatic →
gunicorn on port 8080).

---

## Notes & known issues

### Blog (in progress)
- Blog URL is commented out in `urls.py`. See `blog/requirements.md`
  for the spec.
- `blog/views.py` `BlogPostAPIView` is a stub (`pass`) — not wired to
  any URL pattern.
- `blog/templates/blog/blog_index_page.html` has the post loop
  commented out (Wagtail remnants).

### Wagtail remnants (to clean up)
- `home/models.py` has commented-out StreamField definitions for
  `header` and `content`.
- `search/views.py` has the entire search implementation commented
  out — Wagtail `Page`/`Query` imports that no longer apply.
- `templates/components/tech_note.html` still credits Wagtail in the
  footer despite its removal.

### Frontend
- CSS typo in `alloydflanagan/src/hero.js`: `var(--borde-width)` should
  be `var(--border-width)`.
- Three nav links in `page_header.js` are disabled placeholders:
  "About This Site", "Blog", "Portfolio".
- `alloydflanagan/src/index.bak` is a stale backup file (old
  Shoelace-based imports) — can be deleted.

### Models
- `about_me/models.py` is empty — no fields defined yet.
- `design_system/models.py` has open architectural questions in
  comments (whether the app should be model-driven, whether
  `variables.css` should become a template).

### Search
- `search` app has no model; it only has a view and templates.

### Build & environment
- Webpack output (`alloydflanagan/static/dist/`) is **not** committed
  — `static/*` and `dist/` are gitignored in `app/.gitignore`. Run
  `yarn build` after cloning.
- `sqlite3.db`, `media/*`, and `app/static/*` (collectstatic output)
  are all gitignored.
- `.ruff_cache/` is inside `app/` and gitignored.
- `mise.toml` at root specifies tool versions for local development
  outside Docker.
