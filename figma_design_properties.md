# Figma Design System Properties & Style Cheat Sheet

This document compiles the **exact styling properties, typography specifications, color tokens, and layout spacing** extracted from the project codebase and global styles. It is designed to assist developers and designers in checking, validating, and correcting the UI design implementation.

---

## 1. Global Design Tokens

### Color Palette
The CAG web application uses a formal, institutional color palette comprising greens, maroons, golds, and custom grays:

| Token Name | Hex Code | Visual Application |
| :--- | :--- | :--- |
| **Institutional Green** | `#0a3d30` | Main branding, focus states, tree nodes, icons, and primary buttons |
| **Institutional Green Hover** | `#072921` | Hover states for primary green elements |
| **Institutional Green Light** | `#e6ecea` | Light green background tint for cards, panels, and active states |
| **Institutional Maroon** | `#751639` | Primary page headers, active navigation sidebar items, borders, and accents |
| **Maroon Text** | `#801e42` | Call-to-action typography and emphasis states |
| **Accent Gold** | `#ffce7b` | Hero section lines, quick-link button background, and highlighting elements |
| **Accent Gold 2** | `#ffc158` | Darker gold gradient steps and selected status indicators |
| **Text Dark** | `#2a2a2a` | Primary body typography, general text labels |
| **Text Mid** | `#565656` | Subheadings, dates, metadata text, and secondary description copy |
| **Text Light Grey** | `#4d4d4d` | Menu text, inactive navigation tabs, and secondary labels |
| **Background Grey** | `#eee` | Background for utility bars, table headers, and secondary sections |
| **Light BG / Page BG** | `#fafafa` | Alternate section background, cards grid background |
| **Border Mid Grey** | `#d7d7d7` | Cards outline, search boxes, and table borders |
| **Border Light Grey** | `#e6e6e6` | Sidebar lists, inner panel dividers, and thin separating lines |

### Typography Rules
*   **Font Family:** `Inter, sans-serif` (imported from Google Fonts: `Inter:wght@300;400;500;600;700;800`).
*   **Default Size:** `16px` with a line-height of `1.6` for standard paragraph text.
*   **Smoothing:** `antialiased` rendering on all devices.

---

## 2. Global Site Shell Components

### Utility Bar
*   **Background:** `#eee` (`var(--bg-grey)`)
*   **Padding:** `8px 64px` (desktop)
*   **Height:** `32px`
*   **Layout:** `display: flex; align-items: center; justify-content: flex-end; gap: 8px;`
*   **Typography:** Links are `font-size: 10px`, color `#2a2a2a` (`var(--text-dark)`), height `24px`.
*   **A11y & Language Toggles:** Toggle boxes are `24px x 24px`, font-size `12px`, with an opacity background of `0.1` and border `#2a2a2a`.

### Main Navigation Bar
*   **Background:** `#ffffff`
*   **Border Bottom:** `1px solid #d7d7d7` (`var(--border-grey)`)
*   **Padding:** `4px 64px`
*   **Min-Height:** `72px`
*   **Layout:** `display: flex; align-items: center; gap: 40px;`
*   **Branding Logo:** Width `64px` (crest/symbol). H1 text is `font-size: 14px`, `font-weight: 700`, `letter-spacing: -0.02em` (tight tracking), color `#2a2a2a`. Sub-label is `font-size: 12px`, color `#717171` (`zinc-500`).
*   **Navigation items:** `font-size: 14px`, color `#4d4d4d` (`var(--text-light-grey)`), padding `4px 8px`. Active item utilizes `color: #751639` (`var(--maroon)`), `font-weight: 600`, and `text-decoration: underline`.
*   **Search Box Input:** Width `308px`, height `32px`, border `1px solid #d7d7d7`, radius `4px`. Input placeholder has `font-size: 14px`, color `#717171`.

### Institutional Footer
*   **Background:** `#2a2a2a` (`var(--text-dark)`)
*   **Text Color:** `#ffffff`
*   **Padding:** `24px 64px` (desktop)
*   **Layout:** Vertical column structure with dynamic grids:
    *   **Footer Columns (Quick Links / External Portals):** Heading is `font-size: 14px`, `font-weight: 600`, color `zinc-400`, uppercase with letter-spacing. Links are `font-size: 14px`, color `zinc-300`, hover transition to `#0a3d30`.
    *   **Footer Logo/Branding:** Crest image width `38px`, height `48px`. Title paragraph is `font-size: 12px`, `font-weight: 600`. Sub-paragraph is `font-size: 10px`, `font-weight: 400`, top margin `4px`.
    *   **Footer Divider:** Width `1px`, background `#ffffff`, opacity `0.4`, min-height `120px`.
    *   **Footer Copyright Row:** Padding-top `32px` on border-top `1px solid zinc-800`. Copyright text is `font-size: 14px`, color `zinc-400`. Links are `font-size: 14px`, hover underline.

---

## 3. Page-Specific Styling Properties

### Home Page
*   **Target Page Route:** `/`
*   **Layout Wrapper:** `max-width: 1440px; margin: 0 auto;`

#### A. Hero Banner
*   **Container Height:** `680px`
*   **Background Overlay:** `linear-gradient(90deg, rgba(9,12,30,0.88) 0%, rgba(9,12,30,0.6) 38%, rgba(9,12,30,0.2) 68%, rgba(9,12,30,0) 100%)`
*   **Content Padding/Position:** Left `120px`, top `228px`, width `581px`.
*   **Gold Accent Line:** Border-top `2px solid #ffce7b`, width `93px`.
*   **Main Heading (H1):**
    *   Line 1: `font-size: 24px`, `font-weight: 400`, letter-spacing `2px`, line-height `56px`.
    *   Line 2: `font-size: 44px`, `font-weight: 800`, line-height `56px`, color `#fefefe`.
    *   Accent highlight: color `#ffce7b` (`var(--gold)`).
*   **Subtext:** `font-size: 20px`, line-height `32px`, color `#fefefe`, max-width `581px`.
*   **CTAs:** Buttons have a height of `48px`, padding `8px 16px`, radius `8px`. Primary button has background `#ffffff`, color `#801e42` (`var(--maroon-text)`). Secondary outline button has border `1px solid #ffffff`, color `#ffffff`.
*   **Quick Links Overlay (Bottom Right):** Button width `80px`, height `80px`, border-radius `50%`, background `#ffce7b`, shadow `4px 4px 10px rgba(0,0,0,0.3)`. Popover width `466px`, background `#ffffff`, radius `8px`, shadow `4px 4px 20px rgba(0,0,0,0.25)`. Popover items have border-left `1px solid #751639`, font-size `14px`, color `#2a2a2a`.

#### B. Audit Reports catalog slider
*   **Section Wrapper:** Padding `64px 64px`, background `linear-gradient(232deg, rgb(159,56,94) 1.4%, rgb(117,22,57) 59.7%, rgb(0,0,0) 172%)`
*   **Header H2:** `font-size: 32px`, `font-weight: 700`, color `#ffffff`. Description text is `font-size: 16px`, color `#ffffff`, max-width `1100px`.
*   **Report Slider Cards:** Width `394px`, background `#ffffff`, radius `8px`, vertical layout gap `24px`.
    *   **Card Banner Photo:** Height `248px`, object-fit `cover`. Tag label is `font-size: 10px`, padding `4px 8px`, background `#000000`, color `#ffffff`.
    *   **Card Title (H3):** `font-size: 24px`, `font-weight: 600`, line-height `30px`, color `#2a2a2a`.
    *   **Card Excerpt (P):** `font-size: 16px`, `font-weight: 500`, line-height `1.2`, color `#2a2a2a`.
    *   **Card Date Badge:** `font-size: 14px`, `font-weight: 600`, padding `8px`, background `#f3f3f3`, radius `4px`.
*   **Slider Navigation Controls:** Action buttons are `48px x 48px`, border-radius `8px`, border `1px solid #2e2e31` (active state) or background `#f5f5f5` (disabled state).

#### C. Most Viewed Section
*   **Layout Grid:** `display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr);`
*   **Card Structure:** Border-right `1px solid #d7d7d7`, border-bottom `1px solid #d7d7d7`. Background `#ffffff`.
*   **Active Link State:** Background `#0a3d30` (`var(--green-dark)`), shadow `4px 4px 10px 10px rgba(0,0,0,0.05)`, border-radius `8px` top-left. Text color switches to `#ffffff`.
*   **Typography:** Link labels are `font-size: 16px`, `font-weight: 600`, color `#2a2a2a` / `#ffffff`.

#### D. Who We Are Cards Grid
*   **Layout Container:** Flex wrap with layout gap `24px`.
*   **Card Dimensions:** Width `310px`, background `#ffffff`, radius `8px`, padding `16px`, shadow `4px 4px 2px rgba(0,0,0,0.02)`.
*   **Card Decorators:** Icon box is `48px x 48px`, background `#0a3d30`, border-radius `8px`. Divider line is `1px solid #e6e6e6`.
*   **Typography:** Card titles are `font-size: 16px`, `font-weight: 600`, color `#0a3d30`. Description copy is `font-size: 12px`, color `#565656`.

#### E. Key Statistics Band
*   **Section Wrapper:** Background `#751639` (`var(--maroon)`), border-radius `8px`, padding `66px`.
*   **Layout:** Horizontal distribution, gap `48px`.
*   **Stat items:** Icon width `64px`, height `64px`. Number typography is `font-size: 40px`, `font-weight: 800`, color `#ffffff`. Caption text is `font-size: 14px`, color `#ffffff`, line-height `1.5`, with line breaks.

---

### Reports Search Directory
*   **Target Page Route:** `/Reports`
*   **Layout Wrapper:** `max-width: 1440px; margin: 0 auto; padding: 40px 64px 96px;`

#### A. Directory Header Row
*   **Layout:** `display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-bottom: 32px;`
*   **Title H1:** `font-size: 24px`, `font-weight: 600`, color `#000000`. Count sub-label is `font-size: 12px`, color `#7a7a7a`.
*   **Search Box Wrapper:** Width `464px`, border `1px solid #4d4d4d`, radius `8px`. Search input padding is `12px 24px`, `font-size: 14px`.

#### B. Sidebar Filters Panel
*   **Panel Dimensions:** Width `320px`, background `#ffffff`, border `1px solid #e6e6e6`, radius `8px`, shadow `4px 4px 10px rgba(0,0,0,0.04)`.
*   **Panel Spacing:** Padding `24px` with a vertical flex gap of `24px`.
*   **Heading H2:** `font-size: 20px`, `font-weight: 600`, color `#000000`. Panel divider is `1px solid #d7d7d7`.
*   **Segmented Control (Toggle):** Height `32px`, background `#f5f4f7`, border `1px solid #ededed`, radius `8px`, padding `2px`. Toggle button text is `font-size: 14px`, color `#565656`. Active toggle button has background `#751639` (`var(--maroon)`), color `#ffffff`, and shadow `0px 1px 10px 1px rgba(0,0,0,0.03)`.
*   **Year Select Box:** Label has `font-size: 12px`, `font-weight: 600`, color `#2e2e31`. Select element has border `1px solid #d7d7d7`, radius `4px`, padding `12px`, `font-size: 12px`, color `#818181`.
*   **Accordion Filters (Level/Sector/Type):** Header headings are `font-size: 16px`, `font-weight: 500`/`700` (`filter-group__title--bold`), color `#2e2e31`. Custom checkboxes have a square size of `16px x 16px`, border `1px solid #565656`, checking background color `#751639` (`var(--maroon)`).

#### C. Directory Cards Grid
*   **Layout:** Vertical column stack, gap `24px`.
*   **Report Row Card:** Background `#ffffff`, border `1px solid #e6e6e6`, radius `8px`, padding-bottom `16px`.
    *   **Tag badges:** `font-size: 10px`, padding `4px 8px`, border-radius `4px`. Sector badge has background `rgba(10, 61, 48, 0.1)` (`cag-green/10`), color `#0a3d30`. Date label is `font-size: 12px`, color `#7a7a7a`.
    *   **Title Link:** `font-size: 18px`, `font-weight: 700`, color `#2a2a2a`. Hover states highlight color to `#751639`.
    *   **Download CTA:** Link is `font-size: 12px`, color `#0d61ae` (link blue), download icon is `24px x 24px`.

---

### Reports Details Page
*   **Target Page Route:** `/Reports/[id]`
*   **Layout Wrapper:** `max-width: 1440px; margin: 0 auto; padding: 48px 64px 96px;`

#### A. Document Header Row
*   **Breadcrumbs:** Path text has `font-size: 12px`, color `#565656` (`var(--text-mid)`). Active path has `font-weight: 600`, color `#2e2e31`. Back links have a flex layout, color `#565656`.
*   **Header Meta Row:**
    *   H1 Title: `font-size: 16px`, `font-weight: 700`, color `#2a2a2a`.
    *   Date label: `font-size: 12px`, color `#7a7a7a`.
    *   Tag Badge: Background `#c7e3fc` (light blue), color `#212121`, `font-size: 10px`, padding `4px 8px`, radius `4px`.
    *   Sector label: `font-size: 14px`, color `#2a2a2a`.
    *   Download CTA Button: Link color `#0d61ae`, `font-size: 12px`, hover underline. Icon size `24px x 24px`.

#### B. Document Card Details
*   **Card Container:** Background `#ffffff`, border `1px solid #e6e6e6`, radius `8px`, vertical gap `24px`, padding-bottom `16px`.
*   **Banner Section:** Height `440px`, overflow hidden, border-radius `8px 8px 0 0`. Image has absolute overlay.
*   **Caption Text:** `font-size: 12px`, color `#2a2a2a`, padding `0 24px`.
*   **Body Content Layout:** Paragraph font-size is `14px`, color `#2a2a2a`, line-height `28px`.
*   **Columns layout:** Flex layout gap `16px`.
    *   **Pull Quote typography:** `font-size: 32px`, `font-weight: 700`, color `#751639` (`var(--maroon)`), line-height `28px`.
    *   **Side Portrait Photo:** Image box width `481px` (max-width `40%`), mask height `672px`, radius `8px`. Image object-fit cover.

---

### State Accounts Page
*   **Target Page Route:** `/Reports/accounts`
*   **Layout Wrapper:** `max-width: 1440px; margin: 0 auto; padding: 40px 64px 96px;`

#### A. Title & Layout
*   **Page Heading:** `font-size: 24px`, `font-weight: 700`, color `#751639` (`var(--maroon)`), line-height `1.6`.
*   **Layout Columns:** Flex items align-start, gap `14px`.

#### B. Sidebar Directory Controls
*   **Search Box (States list search):** Height `32px`, border `1px solid #d7d7d7`, radius `4px`, padding `4px 8px`. Icon width `14px`, height `14px`. Input has `font-size: 14px`.
*   **States Scrollable List:** Max-height `300px`, vertical scrollbar width `6px`, scrollbar thumb color `#bfbfbf`.
    *   **List Item Button:** Padding `8px 16px`, background `#ffffff`, radius `4px`, `font-size: 14px`, `font-weight: 600`, color `#2a2a2a`.
    *   **Active Item state:** Background `rgba(117, 22, 57, 0.08)` (maroon tint), color `#751639`, `font-weight: 700`.

#### C. Main Document Panel
*   **Header Tabs:** Active tab button has background `#751639`, color `#ffffff`, `font-size: 12px`, `font-weight: 500`, radius `8px 8px 0 0`. Inactive tab button has color `#888888`.
*   **Archive Trigger Button:** Background `#751639`, border-radius `4px`, padding `8px`, `font-size: 12px`, color `#ffffff`. Icon is `16px x 17px`.
*   **Years Card:** Background `#ffffff`, border `1px solid #e6e6e6`, radius `8px`, padding `24px`, shadow `4px 4px 10px rgba(0,0,0,0.04)`.
    *   **Year Document Rows:** Height `56px`, background `#fafafa`, border-left `2px solid #751639`, padding `8px 16px`. Title label is `font-size: 14px`, `font-weight: 600`. Download link is `font-size: 12px`, color `#0d61ae`. Meta size caption is `font-size: 10px`, color `#565656`.

---

### Vision, Mission & Core Values Page
*   **Target Page Route:** `/About/About-Us/Our-Vision,-Mission-&-Core-Values`
*   **Layout Columns:** Flex items align-start, gap `24px`.
*   **Sidebar Navigation (About Us):** Width `310px`, background `#ffffff`, border `1px solid #e6e6e6`, padding `24px`. Group headings are `font-size: 16px`, `font-weight: 700`, color `#2a2a2a`. Sidebar links are `font-size: 14px`, color `#2a2a2a`, left-border `1px solid #d7d7d7`. Active link has background `rgba(117, 22, 57, 0.08)`, color `#751639`, and `font-weight: 600`.
*   **Page Content Card:** Background `#ffffff`, border `1px solid #d7d7d7`, radius `12px`, padding `32px`, shadow `0 1px 3px rgba(0,0,0,0.05)`.
*   **Typography:**
    *   Page H2: `font-size: 30px`, `font-weight: 800`, color `#2a2a2a`, bottom border `1px solid #e6e6e6` with padding-bottom `16px`.
    *   Section Headings (H3): `font-size: 18px` (`text-lg`), `font-weight: 700`, color `#2a2a2a`, top margin `16px` (`mt-4`).
    *   Vision Accent block: Italic, left border `4px solid #0a3d30` (institutional green), left-padding `16px` (`pl-4`).
    *   Lists: `font-size: 14px` (`text-sm`), color `#565656` (`zinc-600`), vertical line spacing.

---

### Organisation Chart Page
*   **Target Page Route:** `/About/About-Us/Organisation-Chart`
*   **Layout:** Reuses the general `AboutLayout` shell.

#### A. Hierarchical Tree Diagram
*   **Container Card:** Background `#ffffff`, border `1px solid #d7d7d7`, radius `12px`, padding `32px`.
*   **Diagram title:** H2 title is `font-size: 24px`, `font-weight: 700`, color `#2a2a2a`. Sub-caption is `font-size: 14px`, color `#565656`.
*   **Root Leader Node (CAG):** Center aligned. Width `256px` (`w-64`), padding `16px`, border-radius `8px`, background `#0a3d30` (`cag-green`), text color `#ffffff`. Name heading is `font-size: 14px` (`text-sm`), `font-weight: 600`. Designation text is `font-size: 12px`, opacity `0.9`.
*   **Connecting lines:** Width `4px` (`w-1`), height `32px` (`h-8`), background `rgba(10, 61, 48, 0.3)` (`cag-green/30`).
*   **Sub-level Nodes (Dy. CAGs):** Width `224px` (`w-56`), padding `16px`, border-radius `8px`, background `#e6ecea` (`cag-green-light`), border `1px solid rgba(10, 61, 48, 0.2)`. Hover border color transitions to `#0a3d30`. Name text is `font-size: 12px`, color `#0a3d30`, `font-weight: 600`. Designation text is `font-size: 10px`, color `#565656`.

#### B. Officer Contact Details Modal
*   **Overlay backdrop:** Background `rgba(0, 0, 0, 0.4)`, backdrop blur `4px`.
*   **Modal box:** Max-width `448px` (`w-full max-w-md`), background `#ffffff`, radius `12px`, padding `24px`, shadow `0 25px 50px -12px rgba(0,0,0,0.25)`.
*   **Modal Header:** Icon avatar is `48px x 48px`, background `rgba(10, 61, 48, 0.1)`, text color `#0a3d30`, `font-size: 18px`, `font-weight: 700`. Name is `font-size: 16px`, `font-weight: 700`, color `#2a2a2a`. Designation text is `font-size: 12px`, color `#565656`.
*   **Modal Info Rows:** Border-top `1px solid #d7d7d7`, padding-top `16px`. Labels are `font-size: 14px`, color `#565656`. Value fields are `font-weight: 500`, color `#2a2a2a`.

---

### History of IAAD Page
*   **Target Page Route:** `/About/About-Us/History-of-Indian-Audit-ans-Accounts-Department`
*   **Layout:** Reuses the general `AboutLayout` shell.
*   **Document List Table Container:** Background `#ffffff`, border `1px solid #d7d7d7`, radius `12px`, padding `24px`. H3 heading is `font-size: 18px`, `font-weight: 700`, color `#2a2a2a`. Sub-caption is `font-size: 12px`, color `#565656`.
*   **Table grid:**
    *   Header Row: Background `#ffffff`, text color `zinc-700`, padding `12px 24px`, `font-size: 14px`, `font-weight: 600`.
    *   Divider: Border-bottom `1px solid #d7d7d7` between rows.
    *   Volume Chapter column: `font-weight: 500`, color `#0a3d30` (`cag-green`).
    *   Title column: Color `#2a2a2a` (`text-dark`).
    *   Size column: Color `zinc-500`, `font-size: 14px`.
    *   Action column: Link buttons are `font-size: 12px` (`text-xs`), background `#0a3d30`, color `#ffffff`, padding `6px 12px` (`px-3 py-1.5`), border-radius `4px`, hover background `#072921`.

---

### Former CAGs Gallery Page
*   **Target Page Route:** `/About/About-Us/Former-Comptroller-and-Auditors-General`
*   **Gallery Grid:** `display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;` (2 columns desktop).
*   **Legacy Card:** Background `#ffffff`, border `1px solid #d7d7d7`, radius `12px`, padding `24px`, shadow `4px 4px 2px rgba(0,0,0,0.02)`. Transition translation on hover `translateY(-4px)` with shadow expansion.
*   **Card Layout:** Flex layout starting at items-start, gap `16px`.
*   **Placeholder Avatar:** Width `56px` (`w-14`), height `56px` (`h-14`), border-radius `50%`, background `zinc-200`, text color `zinc-500`, `font-weight: 700`.
*   **Card Text details:**
    *   Leader Name: `font-size: 16px`, `font-weight: 700`, color `#2a2a2a`.
    *   Tenure badge text: `font-size: 12px` (`text-xs`), color `#0a3d30` (`cag-green`), `font-weight: 600`, top margin `2px` (`mt-0.5`).
    *   Description excerpt: `font-size: 12px` (`text-xs`), color `#565656` (`zinc-500`), line-height `1.6`, top margin `8px`.

---

### CAG Profile Page
*   **Target Page Route:** `/About/About-Us/Cag-Of-India`
*   **Layout:** Reuses the general `AboutLayout` shell.

#### A. Bio Header Card
*   **Container:** Relative position, flex items-center, gap `24px`, padding `24px`, background `#ffffff`, border `1px solid #eaeaea`, radius `8px`, shadow `0 4px 20px rgba(102,138,227,0.08)`.
*   **SVG Swoosh Decoration:** Position absolute, right `-100px`, width `300px`, height `100%`, z-index `0`, opacity `0.15`.
*   **Portrait Photo Frame:** Position relative, z-index `1`, flex shrink `0`, width `200px` (`w-[200px]`), height `150px` (`h-[150px]`), radius `6px`, shadow `0 4px 12px rgba(0,0,0,0.15)`. Image object-fit cover.
*   **Details box:** Position relative, z-index `1`, flex columns, gap `8px`. Name heading is `font-size: 28px`, `font-weight: 700`, color `#751639` (`var(--maroon)`). Title text is `font-size: 15px`, color `#2a2a2a`, `font-weight: 500`.

#### B. Biography Copy
*   **Container (`cag-bio`):** Flex columns, gap `16px`, `font-size: 15px`, line-height `1.6`, color `#2e2e31`. Paragraph tags have zero margins.

---

### International Relations Page
*   **Target Page Route:** `/About/About-Us/International-Relations`
*   **Layout:** Reuses the general `AboutLayout` shell.
*   **International Relations Hero swoosh card:** Height auto, background `#751639` (`var(--maroon)`), text color `#ffffff`, border-radius `8px`, padding `48px`, overflow hidden, display flex, justify-between, items-center, gap `24px`.
*   **Swoosh Decorator:** Linear gradient overlay `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 60%)`.
*   **Title typography:** `font-size: 32px`, `font-weight: 700`, line-height `1.2`.
*   **Logo Symbol Frame:** 96px circle with background `rgba(255,255,255,0.15)`, padding `16px`, image object-fit contain.

---

### Audit Advisory Board Page
*   **Target Page Route:** `/About/About-Us/Audit-Advisory-Board`
*   **Layout:** Reuses the general `AboutLayout` shell.
*   **Content wrapper:** Reuses the same structure as the History page table. Board members are categorized under dynamic columns, displaying name and external/internal membership badges with font-size `12px`. Title headings are styled at `text-3xl font-extrabold` in `#2a2a2a`.
