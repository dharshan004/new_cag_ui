# Admin Panel to Frontend Mapping Reference

This document maps what modules/tables edited in the Admin Panel reflect on the public frontend website, the API endpoints involved, and the specific database columns mapped.

---

### 1. Home Banners (Hero Carousel)
*   **Database Table**: `banners`
*   **Admin Panel Path**: `/admin/banners`
*   **Frontend Page**: Homepage (`/Home-page`) - Top Slider Carousel
*   **API Endpoint**: `/api/home`
*   **MAPPED FIELDS**:
    *   `title_en` / `title_hi` $\rightarrow$ Dynamic slides slide titles
    *   `subtitle_en` / `subtitle_hi` $\rightarrow$ Dynamic slides subtitles
    *   `image_url` $\rightarrow$ Slide background photo
    *   `link_url` $\rightarrow$ Click redirection destination

---

### 2. News (Featured & Trending)
*   **Database Table**: `news`
*   **Admin Panel Path**: `/admin/news`
*   **Frontend Page**: Homepage (`/Home-page`) - News & Events grid section
*   **API Endpoint**: `/api/home`
*   **MAPPED FIELDS**:
    *   `title_en` / `title_hi` $\rightarrow$ News headlines
    *   `content_en` / `content_hi` $\rightarrow$ Description text / popup content
    *   `image_url` $\rightarrow$ Featured card banner image
    *   `news_type` $\rightarrow$ Determines placement (`featured` top card or `trending` sidebar items)
    *   `tag` $\rightarrow$ Category label badge (e.g. "Latest", "Finance")
    *   `publish_date` $\rightarrow$ Formatted publication date label

---

### 3. Home Notifications (Alert Feed)
*   **Database Table**: `notifications`
*   **Admin Panel Path**: `/admin/notifications`
*   **Frontend Page**: Homepage (`/Home-page`) - Right-hand side Notifications Feed
*   **API Endpoint**: `/api/home`
*   **MAPPED FIELDS**:
    *   `title_en` / `title_hi` $\rightarrow$ Notification link text
    *   `content_type` $\rightarrow$ Notification type label badge
    *   `link_url` or `file_url` $\rightarrow$ Direct URL target when clicked
    *   `publish_date` $\rightarrow$ Controls ordering

---

### 4. Audit Reports
*   **Database Table**: `audit_reports`
*   **Admin Panel Path**: `/admin/audit-reports`
*   **Frontend Page**: Reports directory (`/Reports`) and individual report view page (`/Reports/[id]`)
*   **API Endpoint**: `/api/reports` and `/api/reports/[id]`
*   **MAPPED FIELDS**:
    *   `title_en` / `title_hi` $\rightarrow$ Audit report title
    *   `sector` $\rightarrow$ Mapped to filter sidebar selections
    *   `report_type` $\rightarrow$ Mapped to filter sidebar audit types
    *   `gov_type_name` (linked from `government_type_id`) $\rightarrow$ Mapped to "Administrative Level" filter
    *   `state_name` (linked from `state_id`) $\rightarrow$ Mapped to State filter
    *   `date_tabled` / `year_of_report` $\rightarrow$ Mapped to Year dropdown selector
    *   `main_report_file` $\rightarrow$ "Download Full Report" PDF target link
    *   `noody_book_file` $\rightarrow$ "Read Noody Book" version link
    *   `youtube_video_url` $\rightarrow$ Video presentation embed frame
    *   `digital_report_url` $\rightarrow$ "Interactive Digital Report" link

---

### 5. Former CAGs Gallery
*   **Database Table**: `former_cags`
*   **Admin Panel Path**: `/admin/former-cags`
*   **Frontend Page**: `/About/About-Us/Former-Comptroller-and-Auditors-General`
*   **API Endpoint**: `/api/former-cags`
*   **MAPPED FIELDS**:
    *   `name_en` / `name_hi` $\rightarrow$ Officer name card label
    *   `tenure_from` & `tenure_to` $\rightarrow$ Combined tenure label (e.g. `(2020 - 2024)`)
    *   `image_url` $\rightarrow$ Headshot image

---

### 6. Offices Presence (Map Directory)
*   **Database Table**: `offices`
*   **Admin Panel Path**: `/admin/offices`
*   **Frontend Page**: Presence pages under `/Our-Presence/Index-Menu/*` (State-Level Offices, Central Audit Offices, Training Institutes)
*   **API Endpoint**: `/api/presence`
*   **MAPPED FIELDS**:
    *   `name_en` $\rightarrow$ Office name heading
    *   `address` $\rightarrow$ Mailing address
    *   `phone` / `email` $\rightarrow$ Contact details
    *   `latitude` / `longitude` $\rightarrow$ Coordinate points on Leaflet map
    *   `office_type` $\rightarrow$ Determines page routing layout placement (`state`, `central`, `training`)

---

### 7. Dynamic Pages override (CMS pages)
*   **Database Table**: `pages`
*   **Admin Panel Path**: `/admin/pages`
*   **Frontend Page**: Static dynamic routes (e.g., `/About/Index-Menu-About/Governance-&-Mandate`)
*   **API Endpoint**: `/api/pages/[slug]`
*   **MAPPED FIELDS**:
    *   `title_en` / `title_hi` $\rightarrow$ Custom CMS title header override
    *   `content_en` / `content_hi` $\rightarrow$ Dynamic HTML layout override (rendered inside page if slug is created in CMS)
