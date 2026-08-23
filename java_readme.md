# Comptroller and Auditor General of India (CAG) Portal Prototypes

This workspace contains responsive HTML/CSS/JS prototype mockups for the new web portal of the **Comptroller and Auditor General of India (CAG)**. 

The screens in this folder appear to have been generated or exported from a Figma design workspace (using Figma node tracking attributes like `data-node-id`).

---

## 📂 Project Structure

Below is an overview of the directory layout and the purpose of each folder:

```text
Java Version 1/
│
└── Java/
    ├── Home Page/                       # Landing Page for the CAG Portal
    │   ├── index.html                   # HTML structure of the landing page
    │   ├── styles.css                   # Custom stylesheets for layout and design
    │   ├── script.js                    # Interactive elements (nav, menu toggles, accessibility)
    │   └── assets/                      # Page-specific image/icon assets
    │
    ├── Home Page - Quick Links/         # Asset folder containing SVGs used in quick-link components
    │
    └── Reports/                         # Audit reports and state accounting screens
        ├── Reports - Overview/          # Mockup for reports listing and search overview
        ├── Reports - Details/           # Detail page mockup for a single audit report
        │
        ├── Accounts - Overview/         # State Accounts Overview screen (Andhra Pradesh mockup - Variant 1)
        ├── Accounts - Overview 2/       # State Accounts Overview screen (Andhra Pradesh mockup - Variant 2)
        ├── Accounts - Overview 3/       # State Accounts Overview screen (Andhra Pradesh mockup - Variant 3)
        │
        └── Accounts - Archieve/         # Supplementary assets/exports for archive files (e.g., Figma SVGs and images)
```

---

## 🛠️ Key Features & Technologies

- **Modern Semantic HTML5**: Built using modern structure standards (`<header>`, `<main>`, `<section>`, `<nav>`, `<aside>`, `<footer>`) with accessibility support (`aria-*` labels).
- **Responsive Vanilla CSS**: Stylesheet layout relies on clean vanilla CSS matching CAG's brand aesthetics (corporate blue, deep gold, and light grays).
- **Vanilla JavaScript**: Used for interactive client-side behaviors, including:
  - Mobile responsive navigation menus.
  - Accessibility options toggles.
  - Interactive modal popovers (e.g., Quick Links popup).
  - Tabbed panels and accordion menus.
- **Figma Alignment**: HTML nodes contain `data-node-id` attributes pointing directly back to the source Figma canvas elements, making iterations and sync operations easy to trace.

---

## 🚀 How to View the Prototype

Since these are static frontend prototype pages, you can run them directly in your browser:

1. **Option A: Direct Open**
   - Double-click any `index.html` file (e.g., [Home Page/index.html](file:///c:/Users/SEC/Downloads/Java%20Version%201/Java/Home%20Page/index.html) or [Reports - Overview/index.html](file:///c:/Users/SEC/Downloads/Java%20Version%201/Java/Reports/Reports%20-%20Overview/index.html)) to open it directly in your web browser.

2. **Option B: Local Dev Server (Recommended)**
   - To ensure absolute paths and cross-origin assets load correctly, launch a local web server from the project root:
     ```bash
     # Example using Node.js 'serve'
     npx serve
     
     # Or using Python's built-in server
     python -m http.server 8000
     ```
   - Navigate to `http://localhost:8000/Java/Home%20Page/` in your browser.
