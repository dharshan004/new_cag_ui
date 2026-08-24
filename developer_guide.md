# Developer Reference, Migration & Troubleshooting Guide

This guide serves as a technical reference and troubleshooting log for the Comptroller and Auditor General (CAG) portal frontend migration project. It documents the implemented layouts, navigation systems, directory structures, and steps to bypass common build or development errors.

---

## 1. Implemented Layouts & Navigation (Version 2)

### A. Navigation Mega-Menus
- **Location**: [src/Components/Menu/Menu.tsx](file:///c:/Users/SEC/Desktop/new%20struc/src/Components/Menu/Menu.tsx)
- **Features**: 
  - Dynamic React-state controllers toggle centered mega-dropdown grids for **About Us** and **Global Relations** on click or hover.
  - Automatically handles click-outside detection and `Escape` key close hooks.
  - Content columns match the prototype groupings (Who We Are, Leadership, Governance, International Bodies, Bilateral, Training, Contact).

### B. Grouped Sidebars
- **About Us Sidebar**: [AboutusSidemenu.tsx](file:///c:/Users/SEC/Desktop/new%20struc/src/Reusable%20components/Side%20Menu/Aboutus_sidemenu/AboutusSidemenu.tsx)
  - Displays links organized into three distinct sub-sections: *Who We Are*, *Leadership & Legacy*, and *Governance & Mandate*.
- **Our Presence Sidebar**: [OurPresenceLayout.tsx](file:///c:/Users/SEC/Desktop/new%20struc/src/app/(pages)/Our-Presence/OurPresenceLayout.tsx)
  - Unified parent layout wrapper for all presence office subpages.
  - Structured into *State Level Offices*, *Central Audit Offices*, and *Training Institutes*.
  - Dynamically highlights active tabs based on URL queries (e.g. `?filter=defense` or `?filter=ae`).

### C. Added Routes & Dynamic Catch-All
- **About Us Pages**:
  - [Constitutional Provisions](file:///c:/Users/SEC/Desktop/new%20struc/src/app/(pages)/About/About-Us/Constitutional-Provisions/page.tsx)
  - [Duties & Powers Act](file:///c:/Users/SEC/Desktop/new%20struc/src/app/(pages)/About/About-Us/Duties-&-Powers-Act/page.tsx)
  - [Audit Regulation](file:///c:/Users/SEC/Desktop/new%20struc/src/app/(pages)/About/About-Us/Audit-Regulation/page.tsx)
- **Global Relations Page**: [\[slug\]/page.tsx](file:///c:/Users/SEC/Desktop/new%20struc/src/app/(pages)/About/Index-Menu-About/Global-relations/[slug]/page.tsx)
  - Single dynamic catchment file that handles all 13 subpage routes (ASOSAI, INTOSAI, Bilateral Relations, iCED, iCISA, NAAA, iCAL, and Contact Wing).
  - Main [Global-relations/page.tsx](file:///c:/Users/SEC/Desktop/new%20struc/src/app/(pages)/About/Index-Menu-About/Global-relations/page.tsx) index route performs a server-side redirect to the default INTOSAI page for seamless navigation.

---

## 2. Directory Structure & Permissions (Junction Link)
If the project root folder is renamed on disk (e.g. from `new struc` to `cag_ui_dn`), file operations inside IDE systems might fail due to path configuration blocks.
- **Solution**: Create a Junction link pointing the workspace location to the physical location:
  ```powershell
  cmd /c mklink /j "c:\Users\SEC\Desktop\new struc" "C:\Users\SEC\Desktop\cag_ui_dn"
  ```
This maps both paths dynamically and ensures native tools read and write code correctly.

---

## 3. Critical Troubleshooting Logs

### Error 1: Windows PowerShell Script Execution Policy Block
When running terminal commands like `npm run dev` or `npm run build`, PowerShell might throw an authorization exception:
> *SecurityError: File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.*

#### Steps to Clear Error:
1. In Windows PowerShell environments, `.ps1` files require signing policies.
2. Bypass this by targeting the command batch file executable directly:
   - Run **`npm.cmd run dev`** instead of `npm run dev`
   - Run **`npm.cmd run build`** instead of `npm run build`

---

### Error 2: TypeScript Unintentional Comparison Error (TS2367)
When filtering training institutes, compiling generated the following compiler warning:
> *error TS2367: This comparison appears to be unintentional because the types '"central" | "state"' and '"institute"' have no overlap.*

#### Steps to Clear Error:
1. Check the `Office` interface declaration in [src/types/index.ts](file:///c:/Users/SEC/Desktop/new%20struc/src/types/index.ts). The type property is restricted to the union `'central' | 'state' | 'training'`.
2. Do not attempt comparisons outside the union (e.g. `'institute'`).
3. Replace the comparison filter in [Traning-Institutes/page.tsx](file:///c:/Users/SEC/Desktop/new%20struc/src/app/(pages)/Our-Presence/Index-Menu/Traning-Institutes/page.tsx):
   - **Incorrect**: `setOffices(data.filter(x => x.type === 'training' || x.type === 'institute'));`
   - **Correct**: `setOffices(data.filter(x => x.type === 'training'));`

---

### Error 3: Next.js App Router 404 Route Spaces Issue on Windows
Next.js App Router does not support spaces in folder names. Accessing URL paths like `/About/About Us` translates to URL-encoded `%20` requests which fail to map correctly on Windows filesystems, resulting in 404 errors.

#### Steps to Clear Error:
1. Rename all app route folders to follow **kebab-case** naming conventions (using hyphens, no spaces):
   - `About Us` ➔ `About-Us`
   - `Index Menu -About` ➔ `Index-Menu-About`
   - `Home page` ➔ `Home-page`
   - `Our Presence` ➔ `Our-Presence`
   - `Index Menu` ➔ `Index-Menu`
   - `Central Audit Offices` ➔ `Central-Audit-Offices`
   - `State Level Offices` ➔ `State-Level-Offices`
   - `Traning Institutes` ➔ `Traning-Institutes`
   - `Career Engagement` ➔ `Career-Engagement`
2. Update all file references, paths, imports, and `<Link>` references in the code to match.
3. Delete the `.next/` directory to clear old TS validator cache and run the build again.

---

### Error 4: PostCSS `@import` Order Priority Crash
When importing external Google Fonts in `globals.css`, placing `@import url(...)` after Tailwind directives caused the Next.js compiler/PostCSS parser to crash with a build error:
> *PostCSS `@import` rule must precede all other rules in a stylesheet.*

#### Steps to Clear Error:
1. Open the primary stylesheet file `src/app/globals.css`.
2. Move any `@import url("https://fonts.googleapis.com...")` to the absolute top lines of the file.
3. Ensure no CSS variables, resets, or `@import "tailwindcss";` macros precede the font import.

---

### Error 5: ECMAScript Inline React Style Parsing Error
Adding `object-fit: 'cover'` inside the JSX inline `style={{ ... }}` parameter generated a compilation parse error:
> *Parsing ecmascript source code failed: Expected a semicolon.*

#### Steps to Clear Error:
1. Recall that React inline styling requires JavaScript objects where key names cannot contain hyphens unless they are strings.
2. Convert the kebab-case key `object-fit` into camelCase `objectFit` style parameters:
   - **Incorrect**: `style={{ object-fit: 'cover' }}`
   - **Correct**: `style={{ objectFit: 'cover' }}`

---

### Error 6: Dropdown Menu Hover Boundary Separation
When hovering over navigation bar headers, moving the mouse downwards towards the absolute mega-menus (Global Relations and About Us) triggered `onMouseLeave` on the parent, closing the menu prematurely before the cursor could reach it.

#### Steps to Clear Error:
1. Open `src/app/globals.css` and search for mega-menu classes (`.about-us-megamenu` and `.global-relations-megamenu`).
2. Add a transparent padding/border bridge on the top of the absolute menu to cover the physical gap:
   - Apply `border-top: 28px solid transparent;` and `margin-top: -28px;` to span the space.
   - Use `background-clip: padding-box;` to prevent the menu background color from bleeding into the transparent hover zone.

---

### Error 7: Dynamic Translation Content Hydration Mismatch
Updating static English subpages in Next.js Server Components by hardcoding matching state fields triggered hydration errors because the HTML generated on the server differed from the client-side state values.

#### Steps to Clear Error:
1. Convert the wrapper component layout (`AboutLayout.tsx`) into a Client Component using `'use client';`.
2. Implement a standard client-side `useEffect` callback that listens to `'languageChange'` broadcasts.
3. Defer initial translation lookup reads to run purely on client mount, and leverage a recursive DOM `TreeWalker` to dynamically translate text nodes without modifying server-side components.

---

### Error 8: SVG Icon Color Contrast / Invisible Assets on Hover
When hovering over `.quick-link` items, changing their backgrounds to theme dark green (`#0a3d30`) made the dark outline SVG icons illegible (due to poor contrast) and made natively white SVGs completely invisible against the white card defaults.

#### Steps to Clear Error:
1. To turn grey SVGs white on card hover: apply a CSS filter rule `.quick-link:hover .quick-link__icon { filter: invert(100%) brightness(200%); }`.
2. To handle natively white SVG icons (like *Latest Reports*):
   - Add a custom `.quick-link__icon--white-base` helper class.
   - Apply `filter: brightness(0) opacity(0.7);` to darken the white icon to grey by default when on a white background card.
   - Set `.quick-link:hover .quick-link__icon--white-base { filter: none; }` to restore it to its original white color as the card background turns green.
3. For `.cag-card` (Who We Are) cards: they natively contain white icons in green squares with white borders. On hover, we keep their icon and square backgrounds in the original theme green and white to maintain clean visual layouts and avoid contrast filters.

---

### Error 9: Non-Clickable Video Card Layout & Nested Interactive Actions
When displaying the "Latest Videos" section on the home page, the video cards did not trigger playback when the background or text details were clicked. Only the tiny play icon button in the center was active, and nesting button elements inside clickable card structures caused HTML semantic validation warnings and double click triggers.

#### Steps to Clear Error:
1. Open `src/app/(pages)/Home-page/News & Events/NewsEvents.tsx`.
2. Move the `onClick` handler (`setActiveVideo`) up to the `<article className="video-card">` container to make the entire card clickable.
3. Convert the inner `<button>` element inside the banner wrapper into a semantically valid `<div>` element to avoid double-bubbling and HTML validation errors.
4. Open `globals.css` and append `cursor: pointer;` with a smooth hover translation (`transform: translateY(-2px);` and a soft shadow) to the `.video-card` styling class to match the interaction models of the rest of the site.

---

## 4. Maintenance Guidelines for Future Developers

### How to add a new Global Relations Subpage
1. Open [Global-relations/\[slug\]/page.tsx](file:///c:/Users/SEC/Desktop/new%20struc/src/app/(pages)/About/Index-Menu-About/Global-relations/[slug]/page.tsx).
2. Append an entry inside the `GLOBAL_RELATIONS_DATA` lookup dictionary:
   ```typescript
   'lowercase slug name': {
     title: 'Display Title of the Page',
     group: 'International Bodies' | 'Bilateral Relations' | 'Audit Engagements' | 'Training Institutes',
     logo: 'logo-filename.png',
     description: 'Detailed overview paragraph contents...'
    }
    ```
3. Add the route destination to the mega-dropdown list inside [Menu.tsx](file:///c:/Users/SEC/Desktop/new%20struc/src/Components/Menu/Menu.tsx) so visitors can select it from the navbar.

---

## 5. Updates & Enhancements Implemented (August 23, 2026)

### A. Font Integration (Google Fonts Inter)
- **Files**: [src/app/layout.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/layout.tsx), [src/app/globals.css](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/globals.css)
- **Details**: 
  - Integrated the dynamic Google font loader (`next/font/google`) in the main layout file.
  - Linked the default Tailwind CSS font token `--font-sans` inside the `@theme` block in `globals.css` directly to the `Inter` font, ensuring a uniform visual aesthetic across all pages.

### B. Next.js 15/16 Async Params Resolution
- **Files**: [Global-relations/\[slug\]/page.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/(pages)/About/Index-Menu-About/Global-relations/[slug]/page.tsx), [Reports/\[id\]/page.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/(pages)/Reports/[id]/page.tsx)
- **Details**: 
  - Fixed Next.js runtime exceptions concerning synchronous param accesses.
  - Unwrapped dynamic slug params asynchronously using the React hook `React.use(params)` before parsing details.

### C. Persistent LocalStorage CMS Database (`dataManager.ts`)
- **Files**: [dataManager.ts](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/lib/dataManager.ts), [api.ts](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/lib/api.ts)
- **Details**:
  - Built a centralized client-side data controller that operates over `localStorage` to manage CRUD operations (reports, office locations, news).
  - Wired mock API fetches inside `api.ts` to retrieve presence statistics dynamically from this manager, making the frontend completely ready for integration with any custom administrator CMS control panel.

### D. Responsive Details Layout & Unified Navigation
- **Files**: [Reports/\[id\]/page.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/(pages)/Reports/[id]/page.tsx), [globals.css](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/globals.css)
- **Details**:
  - Cleaned up duplicate local breadcrumb rows in report details.
  - Resolved details card squishing issues by widening container restrictions.
  - Changed absolute hardcoded image heights/widths (`1312px` and `635px`) in the banner and sidebar cards to use percentage scaling (`100%`) with `object-fit: cover` to fit cleanly on narrow tablet and mobile viewports.

### E. User Interface Interaction & Clicks
- **Files**: [Header.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/Components/Header/Header.tsx), [LatestReports.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/(pages)/Home-page/Latest%20Audit%20Reports%20&%20Accounts/LatestReports.tsx), [WhoWeAre.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/(pages)/Home-page/Who%20We%20Are/WhoWeAre.tsx), [NewsEvents.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/(pages)/Home-page/News%20&%20Events/NewsEvents.tsx)
- **Details**:
  - Overrode Figma export hidden overlays (`opacity: 0`) in the navbar search block to make text inputs visible, and bound search execution triggers to both `Enter` keys and magnifying glass clicks.
  - Upgraded latest audit carousel cards, directory grids, training institutes, constitutional core value cards, and trending/featured news headers to be fully clickable, wrapping them in Next.js router callbacks with hover scaling animations.
  - Handled stopPropagation on nested links to prevent event bubbling.

---

## 6. Real-Time Hindi Translation & Visual Interaction Upgrades (August 24, 2026)

### A. Site-Wide Hindi Broadcast System
- **Files**: [Header.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/Components/Header/Header.tsx), [Footer.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/Components/Footer/Footer.tsx), [Menu.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/Components/Menu/Menu.tsx), [AboutLayout.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/(pages)/About/AboutLayout.tsx), [AboutusSidemenu.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/Reusable%20components/Side%20Menu/Aboutus_sidemenu/AboutusSidemenu.tsx), [FormerCAGCards.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/Reusable%20components/Cards/Former%20CAG%20Cards/FormerCAGCards.tsx), [\[slug\]/page.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/(pages)/About/Index-Menu-About/Global-relations/[slug]/page.tsx)
- **Details**:
  - Bound client-side state listeners (`'languageChange'`) across the header utility buttons, search inputs, dropdown navigations, sidebar sections, tenures/bios, and dynamic pages.
  - Formatted a comprehensive policy overlays translation mapping inside `Footer.tsx` for terms, hyperlinking rules, archives, and accessibility declarations.
  - Deployed a DOM Tree-Walker lookup table in `AboutLayout.tsx` that replaces text nodes dynamically, allowing all static informational subpages to translate simultaneously without template duplication.

### B. Noto Sans Devanagari Font Integration
- **Files**: [globals.css](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/globals.css)
- **Details**:
  - Configured `@import url` for Google Fonts' *Noto Sans Devanagari* font weight family in `globals.css` (positioned strictly before the Tailwind directive to avoid compiler crashes).
  - Appended Devanagari to the primary `--font-sans` family declaration, guaranteeing matching visual weight geometry for Hindi characters.

### C. Time-Based Banner Slider
- **Files**: [Banner.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/(pages)/Home-page/Banner/Banner.tsx)
- **Details**:
  - Engineered an auto-updating slideshow cycling through 4 descriptive institutional slides every **3 seconds** (using React `setInterval` with `3000ms`).
  - Added transition cross-fades (`opacity 1s ease-in-out`) between backgrounds and layered controls safely above them.
  - Linked pagination dots to slide states, adding `tabIndex={0}` and keyboard `onKeyDown` listeners to ensure screen-reader and WCAG accessibility.

### D. Green Hover States & SVG Inversion
- **Files**: [globals.css](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/globals.css), [WhoWeAre.tsx](file:///c:/Users/SEC/Downloads/new_cag_ui-version2/new_cag_ui-version2/src/app/(pages)/Home-page/Who%20We%20Are/WhoWeAre.tsx)
- **Details**:
  - Configured `.quick-link:hover` and `.cag-card:hover` to transition backgrounds to theme dark green, text to white, and lift containers slightly via smooth transforms and shadows.
  - Applied CSS filters (`filter: invert(100%) brightness(200%)`) on grey SVG image outlines of `.quick-link` cards to convert them to white.
  - Set `.cag-card` (Who We Are) cards to retain their native white icons inside green squares with white borders on hover, preventing contrast conflicts and maintaining grid symmetry.
  - Removed the default active green state from *Latest Reports* to maintain default home grid symmetry, using a smart brightness filter to render its white SVG icon in a matching grey shade when not hovered.

