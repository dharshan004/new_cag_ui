# Next.js Project Structure & Directory Specifications

This document outlines the file layout of the frontend Next.js application inside the `frontend/` directory, detailing the purpose and meaning of each file and folder.

---

## 1. Directory Tree Overview

```text
frontend/
├── public/                       # Static public assets
│   └── assets/                   # Logos, static seals, and icon vectors
│
├── src/                          # Application source directory
│   ├── app/                      # Next.js App Router Pages and Layouts
│   │   ├── layout.tsx            # Global Application Shell (header, footer, styles)
│   │   ├── globals.css           # Global Tailwind and custom anim stylesheet
│   │   ├── page.tsx              # Home landing page index
│   │   │
│   │   ├── presence/             # Presence Directory Route
│   │   │   └── page.tsx          # Interactive state office pin-map index
│   │   │
│   │   ├── reports/              # Reports Catalog Directory Route
│   │   │   └── page.tsx          # Paginated audits table with filter accordions
│   │   │
│   │   └── about/                # Institutional Pages Route Group
│   │       └── [subcategory]/    # Dynamic subcategory layout template
│   │           └── page.tsx      # Subpages (Vision, Chart, Former CAGs, Board)
│   │
│   ├── components/               # UI Component Directory
│   │   ├── common/               # Global components (Navbar, Footer, Card, Hero)
│   │   ├── reports/              # Reports directory list controls
│   │   ├── about/                # Institutional charts and download tables
│   │   └── presence/             # Interactive vector map pins
│   │
│   ├── lib/                      # Common Utilities and Fetch Clients
│   │   └── api.ts                # Dynamic fetch connections to FastAPI uvicorn
│   │
│   └── types/                    # System TypeScript Definitions
│       └── index.ts              # ShaktiDB model response maps
│
├── .env.local                    # Local environment settings (API URL)
├── next.config.ts                # Next.js compiler configuration
├── tsconfig.json                 # TypeScript compiler configuration
└── package.json                  # Dependencies registry (Next 15, Tailwind v4)
```

---

## 2. Directory & File Meanings

### A. Root Configuration Files
*   **`package.json`**: Specifies system dependencies (`next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `eslint`).
*   **`tsconfig.json`**: Configures TypeScript compiler settings, import path aliases (e.g. `@/*` pointing to `src/*`), and JSX options.
*   **`.env.local`**: Holds local environment variables. Contains `NEXT_PUBLIC_API_URL=http://localhost:8000`, defining the FastAPI server endpoint. This ensures the frontend pulls data dynamically.
*   **`next.config.ts`**: Options for Next.js builds, asset optimization, and redirect configurations.

### B. Route Pages Router (`src/app/`)
Under Next.js App Router, folders represent path segment URLs:
*   **`layout.tsx`**: The entry shell wrapper. Any header or navigation bar placed here persists across all routes, preventing redundant page rendering.
*   **`globals.css`**: The main CSS stylesheet. Imports Tailwind CSS and contains custom scrollbars and transition styles.
*   **`page.tsx`**: Resolves to the main home route `/`.
*   **`presence/`**: Resolves to `/presence`, rendering the office mapping catalog.
*   **`reports/`**: Resolves to `/reports`, rendering the paginated search grid.
*   **`about/[subcategory]/page.tsx`**: Resolves to `/about/*` (e.g. `/about/vision-mission`, `/about/organisation-chart`). The bracket notation `[subcategory]` defines a **Dynamic Route Parameter**, letting a single page file dynamically render content based on the URL value.

### C. Components (`src/components/`)
Contains standalone modular parts to avoid code duplication:
*   **`common/`**: Site-wide common blocks (Header Navbar, Footer, Breadcrumbs, generic Cards, and Hero blocks).
*   **`reports/`**: Sidebar filters, item listing rows, and pagers specific to audit documents.
*   **`presence/`**: Vector pins maps.
*   **`about/`**: Hierarchy trees and table matrices specific to institutional records.

### D. System Libraries (`src/lib/`)
*   **`api.ts`**: Setup for dynamic REST API calls. Centralizes fetch headers and error parsing.
