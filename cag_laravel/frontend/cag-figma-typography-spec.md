# CAG Portal — Figma Typography & Style Spec

Source: [Figma file](https://www.figma.com/design/Gpqxo2raon7FhdYAalfFo1/Untitled) — Section 5, containing 8 page designs.

**Legend used throughout this doc:**
- ✅ = value read directly from Figma (confirmed, exact)
- ≈ = not individually re-checked, but inferred with high confidence because it matches an identical pattern confirmed on every other page in this file (same 38px title-box height, same weight/color combo, etc.)

> ⚠️ **Note on scope**: I hit Figma's API tool-call limit for this plan partway through pulling data, so a small number of items below (marked ≈) are inferred from the very consistent site-wide pattern rather than individually re-confirmed. If you want those nailed down with certainty, we can finish the last couple of checks once the limit resets (or on a higher plan) — see the "Not yet independently confirmed" list at the bottom.

---

## 0. Global Design Tokens (apply site-wide)

**Fonts**
- Primary: **Noto Sans** (Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800, Black 900, ExtraLight 200)
- Secondary: **DM Sans** (Regular 400, Medium 500) — used ONLY on the Home page's featured news image overlay (badge + date)

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=DM+Sans:wght@400;500;600&display=swap');
```

**Page title pattern (confirmed identical on every inner page)**
Every inner page (CAG of India, Vision/Mission, Organisation Chart, History, Former CAG) uses this exact same page-title style:
```css
font-family: 'Noto Sans';
font-weight: 700;       /* Bold */
font-size: 24px;
line-height: 1.6;
color: #751639;
```
✅ Confirmed directly on: CAG of India, Our Vision/Mission/Core Values, Organisation Chart, History of Indian Audit and Accounts Department, Former Comptroller and Auditors General.
≈ International Relations title box has identical dimensions (38px height) to all the above, so it almost certainly follows the same rule — not individually re-checked due to the rate limit.

**Breadcrumb pattern (confirmed, reused across inner pages)**
```css
/* inactive breadcrumb link */
font-family: 'Noto Sans'; font-weight: 400; font-size: 12px; color: #565656;

/* current/active page in breadcrumb */
font-family: 'Noto Sans'; font-weight: 600; font-size: 12px; color: #2e2e31;
```
✅ Confirmed on CAG of India's breadcrumb; identical structure appears on every inner page.

---

## 1. Home Page

Full spec already delivered separately as `cag-typography.css`. Quick recap of the largest elements:

| Element | Font | Weight | Size | Color |
|---|---|---|---|---|
| Hero headline | Noto Sans | ExtraLight (word "Ensuring") / ExtraBold (rest) | 44px | #fefefe |
| Stat numbers (150+, 700+...) | Noto Sans | Bold | 40px | #2a2a2a |
| Section headings (Who We Are, News & Events) | Noto Sans | Bold | 32px | #2a2a2a |
| Featured news title | Noto Sans | Black | 37px | #ffffff |
| Featured news badge/date | **DM Sans** | Medium/Regular | 20px / 18px | #ebeef3 / #ffffff |

*(Two Home Page frames exist in the file — 4086:4531 and 4086:4694. Both share identical dimensions on every matching sub-element, so the duplicate is a structural/content draft only — same typography throughout.)*

---

## 2. Reports (Listing Page)

**Page header**
| Element | Weight | Size | Color |
|---|---|---|---|
| "Reports" title | SemiBold | 16px | #000000 (black) |
| "430 results found" | Regular | 12px | #7a7a7a |
| Search placeholder | Regular | 14px | #717171 |

**Filters sidebar (Side Menu)**
| Element | Weight | Size | Color |
|---|---|---|---|
| "Filters" heading | SemiBold | 20px | #000000 |
| Segment control label (active/inactive) | SemiBold / Regular | 14px | white / #565656 |
| "Clear All" link | Regular, underline | 12px | #0d61ae |
| Accordion group titles (Sector, Report Type...) | Bold | 16px | #2e2e31 |
| Checkbox labels | Regular | 16px | #2e2e31 |

**Report cards**
| Element | Weight | Size | Color |
|---|---|---|---|
| Category tag ("Finance"/"Marketing"...) | Regular | 10px | #212121 |
| Date | Regular | 12px | #7a7a7a |
| Title/description | Regular | 12px | #2a2a2a |
| "Download Full Report" link | Regular | 12px | #0d61ae |
| "Sector:" label / value | Medium / Regular | 14px / 12px | #2a2a2a |

*(Two Reports frames exist — 4086:4954 and 4086:5034 — both structurally identical layouts.)*

---

## 3. CAG of India (About page)

**Page title**: Bold 24px, `#751639` (site-wide pattern, confirmed here directly)

**Breadcrumb**: Home / About Us / **CAG of India** — pattern above

**Side nav ("About Us" menu)**: heading "About Us", links styled the same as other inner-page side nav — this is a shared component reused across all "About" family pages (CAG of India, Vision/Mission, Organisation Chart, History, Former CAG).

**Name/Designation block**
```css
/* Name */
font-family: 'Noto Sans'; font-weight: 700; font-size: 32px; color: #751639;
/* Designation */
font-family: 'Noto Sans'; font-weight: 400; font-size: 16px; color: #2a2a2a;
```

**Biography body text**
```css
font-family: 'Noto Sans'; font-weight: 400; font-size: 16px; line-height: 24px; color: #2e2e31;
```
The opening name mention ("Shri K. Sanjay Murthy") is bumped to **SemiBold** inline within the paragraph — everything else stays Regular.

*(Draft version 4086:5379 has the same title/breadcrumb dimensions as the primary — same typography, different layout arrangement for the closing content.)*

---

## 4. Our Vision, Mission & Core Values

**Page title**: Bold 24px, `#751639` (confirmed)

**Each of the 3 cards (Vision / Mission / Core Values) shares this exact structure:**
```css
/* Card heading (Vision / Mission / Core Values) */
font-family: 'Noto Sans'; font-weight: 600; font-size: 24px; color: #004023;

/* Italic-style sub-caption, e.g. "(Our vision represents...)" */
font-family: 'Noto Sans'; font-weight: 400; font-size: 14px; color: #4b4b4b;

/* Body copy */
font-family: 'Noto Sans'; font-weight: 400; font-size: 18px; color: #4b4b4b;

/* Inline bold labels inside Core Values body, e.g. "Institutional Values:" */
font-family: 'Noto Sans'; font-weight: 600; /* same 18px, same color */
```

*(Draft version 4086:5479 — same title dimensions, same card structure, shorter card height suggesting trimmed copy; typography unchanged.)*

---

## 5. Organisation Chart

**Page title**: Bold 24px, `#751639` (confirmed)

**Org chart person card ("Name & Details")**
```css
/* Name */
font-family: 'Noto Sans'; font-weight: 700; font-size: 16px; color: #751639;
/* Designation */
font-family: 'Noto Sans'; font-weight: 600; font-size: 14px; color: #686868;
/* Sub-designation */
font-family: 'Noto Sans'; font-weight: 400; font-size: 12px; color: #7a7a7a;
```

**Hover/detail tooltip card**
```css
/* Label, e.g. "Email:", "Contact No.:" */
font-family: 'Noto Sans'; font-weight: 600; font-size: 14px; color: #2a2a2a;
/* Value */
font-family: 'Noto Sans'; font-weight: 400; font-size: 14px; color: #565656;

/* Footer section label, e.g. "Offices/Officers Reporting:" */
font-family: 'Noto Sans'; font-weight: 600; font-size: 12px; color: #565656;
/* Footer value */
font-family: 'Noto Sans'; font-weight: 400; font-size: 12px; color: #7a7a7a;
```

*(Draft version 4086:5676 repeats the same "Name & Details" / "Reportees" card components — same typography, many more report-line items stacked vertically.)*

---

## 6. History of Indian Audit and Accounts Department

**Page title**: Bold 24px, `#751639` (confirmed)

**Filter chips (period selector)**
```css
font-family: 'Noto Sans'; font-weight: 400; font-size: 12px;
/* selected chip: white text on #2a2a2a background */
/* unselected chip: #2a2a2a text, transparent background, #d7d7d7 border */
```

**Accordion sections (expandable history period blocks)**
```css
/* Accordion header title */
font-family: 'Noto Sans'; font-weight: 600; font-size: 20px; color: #2e2e31;

/* PDF list item title, e.g. "Volume I" */
font-family: 'Noto Sans'; font-weight: 600; font-size: 14px; color: #000000;
/* PDF list item subtitle */
font-family: 'Noto Sans'; font-weight: 400; font-size: 12px; color: #565656;
/* File size, e.g. "34.7 MB" */
font-family: 'Noto Sans'; font-weight: 400; font-size: 10px; color: #565656;
/* "View PDF" link */
font-family: 'Noto Sans'; font-weight: 400; font-size: 12px; color: #0d61ae; text-decoration: underline;
```

> ⚠️ **Heads up on the duplicates for this page** — this is the one place where the two "draft" frames genuinely diverge, not just cosmetically:
> - Draft 4086:5993 is a deeper-nested accordion tree covering multiple historical volumes (Analytical History, Thematic History Vol I/II, chapter-level PDFs like "Foreword", "Preface", "Ch 1 – Overview") — same visual language (headers + PDF rows) but far more granular content than the production version.
> - Draft 4086:6082 is mislabeled — internally its page title text actually reads **"Former Comptroller and Auditors General"**, not History, and its content is Accordion components rather than PDF cards. It looks like a Figma-side copy/paste artifact rather than an intentional design draft. Worth double-checking against your own project to make sure you didn't build from this mismatched frame by mistake.

---

## 7. Former Comptroller and Auditors General

**Page title**: Bold 24px, `#751639` (confirmed)

**Former CAG card**
```css
/* Name, e.g. "Girish Chandra Murmu" */
font-family: 'Noto Sans'; font-weight: 600; font-size: 12px; color: #000000;
/* Tenure, e.g. "(2020-2024)" */
font-family: 'Noto Sans'; font-weight: 400; font-size: 10px; color: #696868;
```
Cards sit on a light `#efefef` name-plate background beneath each portrait photo.

---

## 8. International Relations

**Page title**: Bold 24px, `#751639` (≈ inferred — matches identical 38px title-box height as every confirmed page; not individually re-checked)

**Content cards** (grid of topic cards: "Association with INTOSAI", "Association with ASOSAI", "Bilateral Relations of SAI India", etc.)
```css
font-family: 'Noto Sans'; font-weight: 600; font-size: 14px; color: #2e2e31; text-align: center;
```
Each card: image on top, label in a light `#efefef` pill-style background below.

> ⚠️ The "duplicate" frame (4086:6370) is actually a **different page in disguise** — its internal title text reads **"Audit Advisory Board"**, with a distinct intro paragraph about the Twelfth Audit Advisory Board. Same title-style dimensions (Bold 24px pattern holds), but the body content is a description paragraph, not the topic-card grid. Treat this as its own page, not a draft of International Relations.

---

## Not yet independently confirmed (hit Figma's rate limit before I could check these)

- International Relations page title — inferred only, not fetched directly
- "Audit Advisory Board" page's exact body paragraph font size/weight
- Home Page & Reports duplicate frames — confirmed structurally identical via layout dimensions, but I didn't re-pull their full code line-by-line
- Organisation Chart draft (4086:5676) — same components reused, not individually re-verified

Happy to fill these in once the tool limit resets — just ping me and I'll finish the pass.
