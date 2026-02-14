# CLAUDE.md

## Unified Agent Guide
This file mirrors `AGENTS.md` so agent guidance stays consistent across tools.

## Project Overview
- German-language static marketing site for Entruempelung/Entsorgung services in Berlin and surrounding areas.
- Built with Jigsaw (Blade templates), deployed via Netlify.

## Tech Stack
- PHP/Composer: `tightenco/jigsaw`, `samdark/sitemap`
- Node: Laravel Mix + `laravel-mix-jigsaw`
- Frontend: Bootstrap 5, jQuery, Swiper, Magnific Popup, Isotope

## Repository Structure
- `source/`: canonical site source
- `source/_layouts/main.blade.php`: base HTML layout
- `source/_components/`: reusable Blade components
- `source/*.blade.php`: page templates (`index`, `anfrage`, `entruempelung`, `entsorgung`, `aufloesung`, `umzug`, `transport`)
- `source/assets/`: static CSS/JS/fonts/images
- `listeners/GenerateSitemap.php`: sitemap generation listener
- `bootstrap.php`: registers Jigsaw events
- `config.php` / `config.production.php`: site metadata + base URL
- `webpack.mix.js`: Mix config that triggers Jigsaw builds
- `netlify.toml`: Netlify build/publish settings

## Source of Truth
- Edit: `source/`, `config*.php`, `listeners/`, `bootstrap.php`, `webpack.mix.js`, `netlify.toml`
- Do not hand-edit generated output: `build_local/`, `build_production/`
- Treat `template/` as reference-only source material, not active pages
- Do not edit dependency directories directly: `node_modules/`, `vendor/`

## Build Commands
- Install dependencies: `npm install` and `composer install`
- Local build: `npm run dev` (outputs to `build_local/`)
- Watch mode: `npm run watch`
- Production build: `npm run prod` (outputs to `build_production/`)
- Netlify build: `npm run prod`, publish directory: `build_production`

## Editing Rules
- Keep user-facing copy in German unless explicitly requested otherwise.
- Preserve SEO defaults in `config*.php` and per-page SEO overrides in page-level Blade `@php` blocks.
- Keep canonical URL behavior tied to `$page->getUrl()` and `$page->baseUrl`.
- Reuse existing components before introducing duplicate markup blocks.
- Keep internal links as absolute site paths (example: `/anfrage`).

## Form and JS Constraints
- `source/anfrage.blade.php` is a Netlify form and must keep:
  - `name="contact"`
  - `method="POST"`
  - `data-netlify="true"`
  - recaptcha attributes/nodes
  - `id="contact-form"` and `id="form-success"` (used by JS)
- `source/assets/js/custom.js` currently handles:
  - mobile menu cloning
  - sliders/filter/scroll behavior
  - conditional contact fields (`#service`, `.conditional-group`)
  - form submit flow to `/` using URL-encoded payload

## CSS/Sass Workflow Notes
- Active stylesheet loaded by layout: `source/assets/css/style.css`
- Sass sources exist in `source/assets/sass/` and `source/assets/css/style.scss`
- Current `webpack.mix.js` has CSS/JS compilation steps commented out; Mix primarily triggers Jigsaw builds
- If Sass is changed, ensure `source/assets/css/style.css` is intentionally updated by your workflow

## Known Pitfall
- `source/_layouts/main.blade.php` includes `/assets/js/jquery.counterup.min.js`, but this file is not present in `source/assets/js/`.
- Keep layout script includes and actual asset inventory aligned when editing templates/assets.

## Validation Checklist
- Run `npm run dev` after changes.
- Verify output pages in `build_local/` exist and render with valid asset links.
- Spot-check:
  - nav active states
  - meta title/description/canonical tags
  - contact form behavior and conditional sections
  - `build_local/sitemap.xml` generation
