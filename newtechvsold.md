# CAG Project — Old vs New Technology Comparison

> A comprehensive analysis of the **CAG_Website** (legacy) vs **new_cag_ui** (modern rewrite) codebases.

---

## 📁 Project Overview

| Attribute | 🏛️ Old — `CAG_Website` | 🚀 New — `new_cag_ui` |
|---|---|---|
| **Project Type** | Full-stack Monolith | Frontend SPA (Decoupled) |
| **Language** | PHP 8.1+ | TypeScript 5 |
| **Framework** | CakePHP 5.3.6 | Next.js 16.3.1 |
| **UI Layer** | Server-side rendered `.ctp` templates | React 19 components (`.tsx`) |
| **Styling** | Legacy CSS / Theme plugins | Tailwind CSS v4 |
| **Package Manager** | Composer (PHP) | npm (Node.js) |
| **Entry Point** | `index.php` → `webroot/index.php` | `src/app/layout.tsx` |
| **Dev Server** | Apache / Docker | `next dev` (Node.js) |

---

## 🛠️ Technology Stack Comparison

### Core Runtime & Framework

| Category | Old (`CAG_Website`) | New (`new_cag_ui`) |
|---|---|---|
| **Runtime** | PHP ≥ 8.1 | Node.js (via Next.js) |
| **Framework** | CakePHP 5.3.6 | Next.js 16.3.1 |
| **UI Library** | None (Blade-style `.ctp` views) | React 19.2.8 |
| **Type Safety** | None (PHP loosely typed) | TypeScript 5 (strict) |
| **Architecture** | MVC (Model–View–Controller) | Component-based + App Router |
| **Routing** | CakePHP Router (convention-based) | Next.js App Router (file-system) |
| **SSR/SSG** | SSR by default (every request) | Hybrid: SSR + SSG + Client-side |

### Frontend / Styling

| Category | Old | New |
|---|---|---|
| **CSS Approach** | Theme plugin CSS + `element/` partials | Tailwind CSS v4 + `globals.css` |
| **Fonts** | System fonts / static CSS | Google Fonts via `next/font` (Noto Sans, DM Sans) |
| **Templating Engine** | CakePHP `.ctp` (PHP in HTML) | JSX / TSX (React components) |
| **Asset Pipeline** | Custom `AssetsController`, manual CDN | Next.js `Image`, `public/`, CDN-ready |
| **Component Model** | CakePHP View Cells + Helpers | Reusable React components (`/Components`) |

### Dependencies

| Package | Old (`composer.json`) | New (`package.json`) |
|---|---|---|
| **Core Framework** | `cakephp/cakephp` 5.3.6 | `next` 16.3.1 |
| **UI** | — | `react` 19.2.8, `react-dom` 19.2.8 |
| **PDF Generation** | `friendsofcake/cakepdf`, `mpdf/mpdf` | — (Not yet implemented) |
| **Excel Export** | `phpoffice/phpspreadsheet` | — (Not yet implemented) |
| **Authentication** | `cakephp/authentication` 4.2, `cakephp/authorization` 3.5 | — (To be implemented) |
| **QR Code** | `endroid/qr-code` 4.8 | — |
| **Mobile Detection** | `mobiledetect/mobiledetectlib` 4.8 | CSS responsive (built-in) |
| **PDF Parsing** | `smalot/pdfparser` 2.0 | — |
| **Migrations** | `cakephp/migrations` 4.0 | — (API-driven, no direct DB) |
| **CSS Framework** | — | `tailwindcss` 4, `@tailwindcss/postcss` |
| **Linting** | `cakephp/cakephp-codesniffer` | `eslint` 9, `eslint-config-next` |
| **Type System** | — | `typescript`, `@types/react`, `@types/node` |

---

## 🏗️ Architecture Comparison

### Old — `CAG_Website` (Monolithic MVC)

```
CAG_Website/
├── src/
│   ├── Application.php         ← App bootstrap, middleware registration
│   ├── Controller/             ← 133+ controllers (HomeController, AuditReportController…)
│   │   ├── Admin/              ← Admin-specific controllers
│   │   ├── Api/                ← REST API controllers
│   │   └── Webapi/             ← Legacy web API
│   ├── Model/
│   │   ├── Table/              ← 187 ORM Table classes (database access)
│   │   ├── Entity/             ← Entity classes
│   │   ├── Behavior/           ← Reusable model behaviors
│   │   └── Validation/         ← Custom validators
│   ├── Middleware/             ← 9 custom middleware (CSRF, CDN, sanitize…)
│   ├── View/
│   │   ├── AppView.php         ← Base view class
│   │   ├── Helper/             ← Custom template helpers
│   │   └── Cell/               ← View Cells (reusable components)
│   ├── Routing/                ← Custom route rules
│   ├── Lib/                    ← Utility libraries
│   └── Shell/                  ← CLI commands (WebCron)
├── templates/                  ← 100+ template directories (.ctp files)
├── plugins/                    ← Theme plugins
├── webroot/                    ← Public static files (JS, CSS, images)
├── config/                     ← App config, routes, seeds
├── Dockerfile                  ← Containerization
└── docker-compose.yml          ← Docker orchestration
```

### New — `new_cag_ui` (Decoupled Next.js)

```
new_cag_ui/
├── src/
│   ├── app/                    ← Next.js App Router
│   │   ├── layout.tsx          ← Root layout (Header, Footer, Breadcrumb)
│   │   ├── globals.css         ← Global styles (86 KB)
│   │   ├── (pages)/            ← Route groups
│   │   │   ├── About/          ← About section pages
│   │   │   ├── Career-Engagement/
│   │   │   ├── Home-page/
│   │   │   ├── Our-Presence/
│   │   │   ├── Reports/
│   │   │   └── Resources/
│   │   └── Assets/             ← App-level assets
│   ├── Components/             ← Layout components
│   │   ├── Header/             ← Site header
│   │   ├── Footer/             ← Site footer
│   │   ├── Breadcrumb/         ← Dynamic breadcrumb (path-aware)
│   │   ├── Hero/               ← Hero sections
│   │   └── Menu/               ← Navigation menus
│   ├── Reusable components/    ← Shared UI components
│   │   ├── Cards/              ← Card variants
│   │   └── Side Menu/          ← Sidebar navigation
│   ├── config/
│   │   └── site.ts             ← Site-wide config (name, tagline, etc.)
│   ├── lib/
│   │   ├── api.ts              ← API client layer
│   │   └── dataManager.ts      ← Data management utilities
│   └── types/
│       └── index.ts            ← TypeScript type definitions
├── public/                     ← Static files
├── next.config.ts              ← Next.js configuration
├── tsconfig.json               ← TypeScript config
├── tailwind.config / postcss   ← Styling toolchain
└── eslint.config.mjs           ← Linting rules
```

---

## 🔀 Routing Comparison

| Aspect | Old | New |
|---|---|---|
| **Routing style** | Convention-based (CakePHP auto-routing) | File-system routing (App Router) |
| **URL pattern** | `/controller/action/param` | `/folder/subfolder` (directory = route) |
| **Dynamic routes** | Query params, CakePHP route config | Next.js `[slug]` / `(group)` folders |
| **i18n Routing** | `LanguageRoutingMiddleware` (EN/HI) | Not yet implemented |
| **Admin prefix** | `/admin/*` prefix routing | Not yet implemented |
| **API routes** | `/api/*` controllers + Webapi dir | `lib/api.ts` (external API calls) |
| **Breadcrumb** | Server-rendered partials | Dynamic client component (`usePathname`) |

---

## 🗄️ Data Layer Comparison

| Aspect | Old | New |
|---|---|---|
| **Database** | MySQL (`cag_revamp`) + PostgreSQL schema | No direct DB (API consumer) |
| **ORM** | CakePHP ORM (187 Table classes) | None — `lib/dataManager.ts` fetches from API |
| **Migrations** | `cakephp/migrations` with Seeds | Not applicable |
| **Data Models** | CakePHP Entities + Behaviors | TypeScript interfaces (`types/index.ts`) |
| **Caching** | CakePHP Cache component (Redis/File) | Next.js built-in caching (`fetch` cache) |
| **Auth / Session** | Session-based auth + Parichay SSO | Not yet implemented |

---

## 🔐 Security Comparison

| Security Feature | Old | New |
|---|---|---|
| **CSRF Protection** | `CsrfProtectionMiddleware` (built-in) | Next.js server actions (built-in) |
| **Input Sanitization** | `SanitizeRequestMiddleware` (custom, 12 KB) | TypeScript types + React escaping |
| **File Upload Security** | `FileValidationMiddleware` + `BlockMaliciousUploadMiddleware` | Not yet implemented |
| **Host Validation** | `HostHeaderMiddleware` | Next.js `next.config.ts` (headers) |
| **CDN Response** | `CdnResponseMiddleware` | Next.js `Cache-Control` headers |
| **Authentication** | CakePHP Auth + `cakephp/authentication` | Not yet implemented |
| **SSO** | Parichay SSO integration | Not yet implemented |

---

## 🧩 Component / Reusability Comparison

| Pattern | Old | New |
|---|---|---|
| **Reusable UI** | CakePHP View Cells, Helpers | React functional components (`.tsx`) |
| **Layout** | `AppView.php` + `layout/` templates | `layout.tsx` (Root Layout) |
| **Navigation** | DB-driven menus via `MenusTable` | Static `Menu/` component |
| **Breadcrumb** | Static partial or manual per page | Smart dynamic component (path-mapped) |
| **Card Components** | PHP partials / `element/` files | `Reusable components/Cards/` |
| **Sidebar** | PHP view cells | `Reusable components/Side Menu/` |
| **Header/Footer** | Template + Cell | Dedicated `Header/` & `Footer/` components |

---

## 📐 Page Count & Coverage

| Section | Old Templates | New Pages |
|---|---|---|
| **Home** | `Home/` (complex, 99KB HomeController) | `Home-page/` |
| **About** | `FormerCag/`, `History/`, `OrganisationChart/`, etc. | `About/About-Us/`, `About/Index-Menu-About/` |
| **Reports / Audit** | `AuditReport/`, `OldAuditReports/`, `StateAccountsReport/`, `StatusOfAuditReports/`, `StudyReports/` | `Reports/` |
| **Resources** | `Circulars/`, `Guidelines/`, `Manuals/`, etc. | `Resources/` |
| **Our Presence** | `SubsitesOrgStruct/`, `DeputationInHQ/`, etc. | `Our-Presence/` |
| **Career & Engagement** | `RecruitmentNotices/`, `Examination/`, `Training/`, `YoungProfessional/` | `Career-Engagement/` |
| **Admin Panel** | Full `Admin/` controller + templates | Not yet implemented |
| **ICISA** | 15+ ICISA controllers + templates | Not yet implemented |
| **Total Coverage** | ~100+ template directories | 6 top-level sections (in progress) |

---

## 🚀 Developer Experience Comparison

| DX Aspect | Old | New |
|---|---|---|
| **Hot Reload** | PHP — requires server restart / manual refresh | `next dev` — instant HMR |
| **Type Safety** | None | Full TypeScript |
| **IDE Autocomplete** | Limited (PHP) | Excellent (TS + React) |
| **Testing** | PHPUnit (`phpunit/phpunit`) | Not yet configured |
| **Code Generation** | `cakephp/bake` scaffolding | None (manual) |
| **Containerization** | Docker + `docker-compose.yml` + `Dockerfile` | None (dev only) |
| **CI/CD** | `.travis.yml` (Travis CI) | Not yet configured |
| **Code Style** | PHP CodeSniffer (`cakephp-codesniffer`) | ESLint 9 (`eslint-config-next`) |
| **Build Output** | PHP — no build step | `next build` → static/hybrid bundle |
| **Deployment** | Apache + Supervisor + opcache | Vercel / Node server |

---

## 📋 Feature Gap Analysis

Features present in `CAG_Website` **not yet** implemented in `new_cag_ui`:

| Feature | Old Status | New Status |
|---|---|---|
| Admin Panel | ✅ Full CRUD admin | ❌ Not started |
| Multi-language (EN/HI) | ✅ i18n middleware + DB | ❌ Not started |
| Parichay SSO | ✅ Integrated | ❌ Not started |
| PDF/Excel Export | ✅ CakePDF + PhpSpreadsheet | ❌ Not started |
| Search | ✅ `SearchController` | ❌ Not started |
| Newsletter / Subscribers | ✅ DB-backed | ❌ Not started |
| Photo / Video Gallery | ✅ Full gallery system | ❌ Not started |
| Grievance / Contact Us | ✅ Form submission + DB | ❌ Not started |
| Public Consultants | ✅ Complex tracking system | ❌ Not started |
| Audit Reports (full) | ✅ Complex + filters | 🔄 In progress |
| Breadcrumb | ✅ Server-rendered | ✅ Dynamic client component |
| Header / Footer | ✅ CakePHP partial | ✅ React components |
| About Section | ✅ Multiple sub-pages | 🔄 Partially done |
| Our Presence | ✅ Full org structure | 🔄 Partially done |
| ICISA Sub-site | ✅ 15+ controllers | ❌ Not started |

---

## 🧠 Summary — Key Differences

| Dimension | Old Tech | New Tech |
|---|---|---|
| **Paradigm** | Server-side monolith | Decoupled frontend |
| **Language** | PHP 8.1 | TypeScript 5 |
| **Scalability** | Vertical (single server) | Horizontal (CDN, Vercel Edge) |
| **Developer Onboarding** | High (PHP + CakePHP conventions) | Lower (React + Next.js ecosystem) |
| **SEO** | Server-rendered HTML (great SEO) | Hybrid SSR/SSG (great SEO) |
| **Performance** | PHP processing per request | Static generation + edge caching |
| **Maintainability** | Large, tightly coupled codebase | Modular, typed components |
| **Feature Completeness** | ~100% (production) | ~20–25% (in active development) |
| **Database** | Direct ORM → MySQL | API consumer (no direct DB) |
| **Deployment Complexity** | High (Docker, Apache, PHP, MySQL) | Low (`npm run build` / Vercel) |

---

*Generated: 2026-08-25 | Workspace: `c:\Users\yokes\OneDrive\Desktop\new CAG`*
