# Contributing

Developer guide for getting started with and contributing to this project.

## What is this?

A German-language static marketing site for Entruempelung (junk removal) and Entsorgung (waste disposal) services in Berlin and surrounding areas. The site is built with [Jigsaw](https://jigsaw.tighten.com/) (a static site generator using Blade templates) and deployed automatically via [Netlify](https://www.netlify.com/).

## Prerequisites

- **PHP 8.3+** (note: Composer dependencies are platform-constrained to PHP 8.3 for Netlify compatibility)
- **Composer**
- **Node.js** (LTS recommended) and **npm**

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url> && cd entruempelung-berlin-umgebung.de

# 2. Install dependencies
composer install
npm install

# 3. Build the site locally
npm run dev

# 4. View the output
# Open build_local/index.html in your browser
```

For live-rebuilding while you work:

```bash
npm run watch
```

## Project Structure

```
source/                     # All site source files live here
  _layouts/main.blade.php   # Base HTML layout (head, header, footer)
  _components/              # Reusable Blade components
  *.blade.php               # Page templates (index, anfrage, entruempelung, etc.)
  assets/                   # CSS, JS, fonts, images

config.php                  # Site metadata, SEO defaults (local)
config.production.php       # Production overrides (base URL, etc.)
listeners/                  # Jigsaw event listeners (e.g. sitemap generation)
bootstrap.php               # Registers Jigsaw events
webpack.mix.js              # Laravel Mix config (triggers Jigsaw builds)
netlify.toml                # Netlify build and deploy settings
```

## What to Edit (and What Not To)

**Edit freely:**
- `source/` -- pages, layouts, components, assets
- `config.php` / `config.production.php` -- site metadata and SEO
- `listeners/`, `bootstrap.php` -- build events
- `webpack.mix.js`, `netlify.toml` -- build configuration

**Do not edit:**
- `build_local/`, `build_production/` -- these are generated output; changes will be overwritten
- `node_modules/`, `vendor/` -- managed by npm/Composer
- `template/` -- legacy reference material, not part of the active site

## Build Commands

| Command | Description |
|---|---|
| `npm run dev` | Build for local development (output: `build_local/`) |
| `npm run watch` | Rebuild on file changes |
| `npm run prod` | Production build (output: `build_production/`) |
| `npm run check` | Alias for `npm run prod` -- use before committing |

## Key Conventions

### Content Language
All user-facing copy is in **German**. Keep it that way unless explicitly told otherwise.

### SEO
- Global SEO defaults live in `config.php` / `config.production.php`.
- Per-page overrides (title, description) go in the `@php` block at the top of each Blade template.
- Canonical URLs are derived from `$page->getUrl()` and `$page->baseUrl`.

### Internal Links
Use absolute site paths: `/anfrage`, `/entruempelung`, etc.

### Styles
- The active stylesheet is `source/assets/css/style.css`.
- Sass sources exist in `source/assets/sass/` but the Mix CSS compilation step is currently commented out. If you modify Sass, make sure `style.css` gets updated.
- The site uses Bootstrap 5 for layout and components.

### JavaScript
- All custom JS lives in `source/assets/js/custom.js`.
- Must remain **vanilla JS** -- no jQuery.
- Handles: mobile menu, header popups, homepage slider, contact form conditional fields, and form submission with inline feedback.

### Images
- Optimize JPEGs at quality 80 when adding or replacing images.
- Keep filenames and paths stable (they may be referenced in SEO or external links).

### Structured Data
- JSON-LD for `WebSite` and `LocalBusiness` is emitted on all pages.
- `BreadcrumbList` is emitted on content pages (not the homepage).
- Keep schema data in sync with values in `config.php` / `config.production.php`.

## Contact Form (`/anfrage`)

The contact form is a Netlify Form. If you're editing it, these attributes and IDs must stay intact:

- `name="contact"`, `method="POST"`, `data-netlify="true"`
- reCAPTCHA attributes and nodes
- IDs: `contact-form`, `form-success`, `form-submit-button`, `form-status`, `form-error`

These are used by both Netlify's form handling and the JS submission flow in `custom.js`.

## Deployment

Pushes to `master` trigger an automatic Netlify build. The build runs:

```bash
composer install --no-dev --no-interaction && npm run prod
```

The `build_production/` directory is published. Netlify runs PHP 8.3, which is why Composer dependencies are platform-constrained to that version.

## Before You Commit

1. Run `npm run check` (production build) and make sure it passes.
2. Check the output in `build_local/` after `npm run dev`:
   - Pages load with working asset links
   - Navigation active states are correct
   - Meta title, description, and canonical tags are present
   - Contact form works (conditional fields show/hide, submission flow)
   - `build_local/sitemap.xml` is generated
