# Figma to Next.js Component Inventory & System Architecture

This document contains the deliverables requested in **Section 22** of the implementation prompt. It serves as the primary system specification mapping the Figma design system directly to Next.js components, routes, database tables, and API requirements.

---

## A. Page Inventory

Below is the inventory of all target pages identified from the 16 Figma mockups:

| Page | Target URL | Category | Subcategory | Core Purpose / Figma Layout reference |
| :--- | :--- | :--- | :--- | :--- |
| **Home Page** | `/` | None | None | Main landing hub (Mockups 1 & 2) |
| **Our Presence** | `/presence` | Presence | None | Interactive map of State Audit Offices |
| **Reports Directory** | `/reports` | Reports | None | Audits search engine and filter repository (Mockups 3 & 4) |
| **CAG of India Profile** | `/about/cag-profile` | About | cag-profile | Biography of current CAG (Mockup 14) |
| **Vision & Core Values** | `/about/vision-mission` | About | vision-mission | Mission statements (Mockups 7 & 8) |
| **Organisation Chart** | `/about/organisation-chart` | About | organisation-chart | IAAD hierarchical chart (Mockups 9 & 10) |
| **History of IAAD** | `/about/history` | About | history | Archival books & PDF chapters (Mockups 11 & 12) |
| **Former CAGs Gallery** | `/about/former-cags` | About | former-cags | Legacy gallery of former leaders (Mockup 13) |
| **International Relations**| `/about/international-relations`| About | international-relations| Global audit associations & strategic plans (Mockup 15)|
| **Audit Advisory Board** | `/about/audit-advisory-board` | About | audit-advisory-board | Board members profile tables (Mockup 16) |
| **Admin Dashboard** | `/admin` | Admin | None | Content editing & PDF uploads control panel |

---

## B. Component Inventory

The UI elements in the Figma design are grouped into three distinct categories based on reusability:

### 1. Global Components (Site-wide Shell)
*   `Navbar`: Main site header containing navigation lists and search triggers. (Static layout, dynamic routes).
*   `Footer`: Standard footer containing sitemap links, external links, and contact office info. (Static layout).
*   `Breadcrumb`: Dynamic link indicator mapping route levels (e.g. `Home / About / Organisation Chart`).
*   `Logo`: Main official seal of the Comptroller & Auditor General of India.

### 2. Shared Components (Cross-page Reusable)
*   `Hero`: Custom Jumbotron containing page headings, descriptions, and dynamic background graphics. (Used in Home, About, Reports, History).
*   `Card`: Reusable data card displaying an image, title, excerpt, and link. (Used in Former CAGs, News blocks, and landing pages).
*   `ReportCard`: Row card containing badges for sectors, administrative levels, audit types, publication date, and a download action trigger. (Used in Reports list and Home search results).
*   `SidebarFilters`: Vertical filter column featuring groups of radio buttons or check controls. (Used in Reports).
*   `Pagination`: Row element containing page indicators and Next/Prev controls. (Used in Reports list).
*   `DocumentTable`: Table display representing volume lists, chapters, file sizes, and download links. (Used in History).

### 3. Page-Specific Components (Isolated Logic)
*   `OrgChartTree`: A visual node hierarchy rendering connections between officer tags. (Organisation Chart page only).
*   `OfficerFlyout`: Modal overlay displaying contact numbers and email details for the selected officer. (Organisation Chart page only).
*   `MapPresence`: Scaled SVG map of India highlighting regional office locations. (Presence page only).

---

## C. Component Matrix

This matrix shows the intersection of pages (columns) and components (rows), confirming component reusability:

| Component | Home | Presence | Reports | Vision | Org Chart | History | Former CAGs | CAG Profile | Board | Reusable |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Navbar** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **Yes** |
| **Footer** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **Yes** |
| **Breadcrumb**| - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **Yes** |
| **Hero** | ✓ | - | ✓ | ✓ | - | ✓ | - | ✓ | - | **Yes** |
| **Card** | ✓ | ✓ | - | - | - | - | ✓ | - | - | **Yes** |
| **ReportCard**| ✓ | - | ✓ | - | - | - | - | - | - | **Yes** |
| **SidebarFilters**| - | - | ✓ | - | - | - | - | - | - | **Yes** |
| **Pagination**| - | - | ✓ | - | - | - | - | - | - | **Yes** |
| **DocumentTable**| - | - | - | - | - | ✓ | - | - | - | **Yes** |
| **OrgChartTree**| - | - | - | - | ✓ | - | - | - | - | *No (Specific)* |
| **MapPresence**| - | ✓ | - | - | - | - | - | - | - | *No (Specific)* |

---

## D. Next.js Routing Structure

```text
app/
├── layout.tsx                     # Root App Layout (Navbar + Footer)
├── page.tsx                       # Home Page (Mockups 1 & 2)
│
├── presence/
│   └── page.tsx                   # Presence / Map Directory
│
├── reports/
│   ├── page.tsx                   # Reports Index & Filters (Mockups 3 & 4)
│   └── [sector]/
│       └── page.tsx               # Dynamically filtered reports list
│
└── about/
    ├── page.tsx                   # Main Landing/Intro
    └── [subcategory]/
        └── page.tsx               # Dynamic subpages (Vision, History, CAG Profile, Board)
```

---

## E. Data Model Plan (ShaktiDB)

To support the dynamic CMS edits, the database will store these entities:

### 1. `Category` & `Subcategory`
Used to render the Navbar navigation lists and structure dynamic routing.
*   `Category`: `id` (PK), `name` (String), `slug` (String, Unique)
*   `Subcategory`: `id` (PK), `category_id` (FK), `name` (String), `slug` (String, Unique)

### 2. `PageContent`
Stores the editable content blocks of pages.
*   `id`: Primary Key
*   `slug`: String (Unique index matching subcategory route slugs, e.g., `'vision-mission'`, `'cag-profile'`)
*   `title`: String (Title block)
*   `content_html`: String (Main HTML body parsed from rich-text editor)
*   `hero_image_url`: String (Dynamic banner image)

### 3. `Report`
*   `id`: Primary Key
*   `title`: String (Index)
*   `sector`: String (Index) (e.g., Defence, Social, Transport)
*   `admin_level`: String (Index) (e.g., Union, State, Local)
*   `report_type`: String (Index) (e.g., Compliance, Performance)
*   `published_date`: Date
*   `file_url`: String (PDF file download path)

### 4. `Officer`
Builds the IAAD hierarchy Organisation Chart.
*   `id`: Primary Key
*   `name`: String
*   `designation`: String
*   `email`: String
*   `phone`: String
*   `tier`: Integer (Tier level in org chart hierarchy: 1 = CAG, 2 = Dy. CAG)
*   `parent_id`: Foreign Key (`Officer.id`, Nullable, references superior officer)

---

## F. API Requirements Mapping

This table connects frontend routes to backend FastAPI REST endpoints:

| Frontend Page | API Endpoint | HTTP Method | Payload / Query Parameters |
| :--- | :--- | :---: | :--- |
| Navbar / Header | `/api/navigation` | `GET` | Returns list of active categories & subcategories |
| Dynamic subpages | `/api/pages/{slug}` | `GET` | Returns page title, banner image, and HTML description |
| Reports Directory | `/api/reports` | `GET` | Query params: `sector`, `level`, `type`, `query`, `page`, `page_size` |
| Organisation Chart| `/api/officers` | `GET` | Returns hierarchy tree (officers with nested child arrays) |
| Former CAGs | `/api/former-cags` | `GET` | Returns full list of past CAG leaders, sorted by start date |
| Presence Map | `/api/presence` | `GET` | Returns State Audit Office names, coordinates, and contact details |

---

## G. Frontend Folder Structure

```text
frontend/
├── public/
│   └── assets/                     # Logos, static icons
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Base shell template
│   │   ├── page.tsx                # Home view
│   │   ├── presence/
│   │   │   └── page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   └── about/
│   │       └── [subcategory]/
│   │           └── page.tsx        # Router for Vision, Profile, History, Board
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── Button.tsx
│   │   ├── reports/
│   │   │   ├── SidebarFilters.tsx
│   │   │   ├── ReportCard.tsx
│   │   │   └── Pagination.tsx
│   │   └── about/
│   │       ├── OrgChartTree.tsx
│   │       ├── DocumentList.tsx
│   │       └── FormerCAGs.tsx
│   ├── lib/
│   │   ├── api.ts                  # Axios/Fetch client integration
│   │   └── utils.ts                # Date formatting, class helpers
│   └── types/
│       └── index.ts                # TypeScript interface mappings
```

---

## H. Dynamic Data Flow Mapping

This diagram maps how dynamic variables flow from the Admin input to the rendered Figma components:

### 1. Page Banners & Biographies (e.g. Vision/Mission, Profile)
```text
[Admin panel: Banner Image Upload & Rich Text Editor]
                         │
                         ▼
[ShaktiDB: PageContent table -> fields: hero_image_url, content_html]
                         │
                         ▼
[FastAPI: GET /api/pages/{slug} -> response keys: hero_image_url, content_html]
                         │
                         ▼
[Next.js page: Fetch API -> React props: title, image, content]
                         │
                         ▼
[Figma Components: <Hero bgImage={image} title={title}/>, <div dangerouslySetInnerHTML={content}/>]
```

### 2. Audit Reports Catalog
```text
[Admin panel: Add audit report PDF file and select Sector/Type badges]
                         │
                         ▼
[ShaktiDB: Report table -> fields: title, file_url, sector, admin_level]
                         │
                         ▼
[FastAPI: GET /api/reports?sector=Defence -> response array of report items]
                         │
                         ▼
[Next.js page: Fetch API -> Map to React prop: <ReportCard report={item} />]
                         │
                         ▼
[Figma Component: Rendered report download card showing metadata badges and PDF action link]
```

### 3. Organisational Tree List
```text
[Admin panel: Update Officer phone number or superior reporting lines]
                         │
                         ▼
[ShaktiDB: Officer table -> fields: phone, parent_id]
                         │
                         ▼
[FastAPI: GET /api/officers -> returns hierarchy nested JSON]
                         │
                         ▼
[Next.js page: State hook -> <OrgChartTree hierarchy={data} />]
                         │
                         ▼
[Figma Component: Tree node diagram with interactive cards showing updated telephone digits]
```

### 4. Reusable Generic Cards (Who We Are, News feed, Former CAGs)
```text
[Admin panel: Edit News item, upload landscape cover photo]
                         │
                         ▼
[ShaktiDB: News/Legacy table -> fields: title, description, image_url, link]
                         │
                         ▼
[FastAPI: GET /api/news -> returns array of news items]
                         │
                         ▼
[Next.js page: Map elements -> <Card title={item.title} content={item.description} image={item.image_url} href={item.link} />]
                         │
                         ▼
[Figma Component: Rendered news feed block showing picture, title, excerpt, and redirect arrow]
```

### 5. State Offices Presence Map
```text
[Admin panel: Add State Auditor office address, email details, and position coordinates]
                         │
                         ▼
[ShaktiDB: Office table -> fields: state, address, phone, email, lat, lng]
                         │
                         ▼
[FastAPI: GET /api/presence -> returns offices coordinates list]
                         │
                         ▼
[Next.js page: Fetch API -> state pins list mapped to <MapPresence offices={data} setSelectedOffice={setSelectedOffice} />]
                         │
                         ▼
[Figma Component: Map pin indicators at corresponding state lat/lng offsets, opening contact sidebar card on click]
```

### 6. Dynamic Hero Page Banners
```text
[Admin panel: Edit About Us category page title and banner graphic]
                         │
                         ▼
[ShaktiDB: PageContent table -> fields: title, subtitle, hero_image_url]
                         │
                         ▼
[FastAPI: GET /api/pages/vision-mission -> returns page banner configs]
                         │
                         ▼
[Next.js page: Server side props -> <Hero title={data.title} subtitle={data.subtitle} bgImage={data.hero_image_url} />]
                         │
                         ▼
[Figma Component: Emerald header block showing custom page titles and styled background layouts]
```
