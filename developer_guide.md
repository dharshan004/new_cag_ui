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
