# Admin Panel & Connection Bugs Audit Report

Below is a detailed list of bugs, security vulnerabilities, and connection issues discovered in the admin panel and the public frontend integration.

---

### 1. Dynamic Column Mismatch & DB Crashes in CRUD API Route
*   **File**: [`src/app/api/admin/crud/route.ts`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/app/api/admin/crud/route.ts)
*   **Description**: The POST endpoint unconditionally appends auditing columns (`created_by`, `created_at` on create; `updated_by`, `updated_at` on update) to the query data.
*   **Impact**: When editing or adding records to tables without these columns (e.g. `states`, `government_types`, `org_designations`, `journal_articles`), the database query fails with `column "created_by" does not exist` or `column "updated_by" does not exist` and returns a 500 error, crashing the admin form.
*   **Fix**: Check the database catalog or `information_schema.columns` at runtime to filter out auditing keys that do not exist on the target table.

---

### 2. Missing Translation Fields in Admin Banner Configuration
*   **File**: [`src/lib/admin-modules.ts`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/lib/admin-modules.ts)
*   **Description**: The form config block for the `banners` module is missing the `subtitle_hi` field under `formFields`, despite the public landing page (`Banner.tsx`) checking `b.subtitle_hi` for Hindi rendering.
*   **Impact**: Administrators cannot input or update Hindi subtitles for home banners.
*   **Fix**: Add `{ name: 'subtitle_hi', label: 'Subtitle (Hindi)', type: 'text', isHindi: true }` to the `banners` module configuration.

---

### 3. Missing Audit Logging for Deletion Actions
*   **File**: [`src/Components/admin/GenListPage.tsx`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/Components/admin/GenListPage.tsx)
*   **Description**: When an admin deletes a record, the server action `await query('DELETE FROM ...')` runs directly without performing any authorization validation or logging the action.
*   **Impact**: Any administrator can delete records without leaving any trace in `admin_audit_log`, violating audit logs compliance.
*   **Fix**: Fetch session credentials inside the server action using `auth()`, retrieve the IP address from request headers, and perform a corresponding `INSERT INTO admin_audit_log` call.

---

### 4. Delete Action Crash on Database Constraint Violations
*   **File**: [`src/Components/admin/GenListPage.tsx`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/Components/admin/GenListPage.tsx)
*   **Description**: The delete form action does not wrap the database operation in a `try...catch` block.
*   **Impact**: If an admin tries to delete a record linked to other tables via foreign keys (e.g., deleting a `government_type` currently in use by an `audit_report`), the query throws a foreign key constraint violation, which bubbles up and crashes Next.js with a red application crash screen.
*   **Fix**: Wrap the server action in a `try...catch` block and return a status state to show user-friendly feedback instead of crashing the page.

---

### 5. Inaccessible Reports & Client-Side Filtering Bug
*   **Files**: [`src/app/(pages)/Reports/page.tsx`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/app/\(pages\)/Reports/page.tsx) and [`src/app/api/reports/route.ts`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/app/api/reports/route.ts)
*   **Description**: The database API endpoint `/api/reports` paginates results, returning only 10 reports at a time. The public reports page fetches `/api/reports` without passing filters or pagination parameters, and filters results purely client-side.
*   **Impact**:
    *   Only the first 10 reports stored in the database are ever loaded. The remaining reports are completely hidden from the public.
    *   If filters (e.g. year, sector) are applied that don't match any of the first 10 reports, the user sees "0 results" even if matching reports exist in the database.
    *   There are no page numbers or pagination controls on the public page.
*   **Fix**: Update the frontend to pass the active page and filters as query parameters to `/api/reports` and handle the pagination server-side.

---

### 6. Dynamic CMS Pages Disconnected from Database
*   **Files**: [`src/app/(pages)/About/Index-Menu-About/*`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/app/\(pages\)/About/Index-Menu-About), [`src/app/(pages)/About/About-Us/Former-Comptroller-and-Auditors-General/page.tsx`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/app/\(pages\)/About/About-Us/Former-Comptroller-and-Auditors-General/page.tsx), and [`src/app/(pages)/Reports/accounts/page.tsx`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/app/\(pages\)/Reports/accounts/page.tsx)
*   **Description**: While the admin panel provides pages to edit CMS pages (`/admin/pages`), former CAGs (`/admin/former-cags`), and resources (`/admin/publications`), the frontend public pages are entirely static and hardcoded.
*   **Impact**: Any addition, modification, or deletion made by administrators in the admin panel has absolutely no effect on the public website.
*   **Fix**: Update frontend routes to dynamically query their corresponding API endpoints (e.g., `/api/pages/[slug]`, `/api/former-cags`).

---

### 7. Language Translation Disconnect for Live DB Data
*   **File**: [`src/app/(pages)/Home-page/News & Events/NewsEvents.tsx`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/app/\(pages\)/Home-page/News%20&%20Events/NewsEvents.tsx)
*   **Description**: The frontend news cards map database news titles into `news.title` (`n.title_en`). During rendering, the page checks `isHindi ? HINDI_NEWS_TRANSLATIONS[news.id].title : news.title`.
*   **Impact**: Because live news items have numeric IDs (e.g. `4`) which do not exist in the hardcoded fallback translation map `HINDI_NEWS_TRANSLATIONS` (which only contains mock IDs like `news-1`), the title and description will default to the English fields even when the language toggle is set to Hindi. The live database field `title_hi` is ignored.
*   **Fix**: Update the details selection to fall back to the live database values: `isHindi ? (news.title_hi || news.title) : news.title`.

---

### 8. File Upload Security (Arbitrary File Upload Vulnerability)
*   **File**: [`src/app/api/admin/upload/route.ts`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/app/api/admin/upload/route.ts)
*   **Description**: The file upload API route extracts the extension directly from the uploaded file's name and saves the file to `/public/admin-uploads` without validating MIME-types or checking an extension blocklist/allowlist.
*   **Impact**: A malicious authenticated user can upload executable scripts (e.g. `.js`, `.exe`) or files containing scripts (e.g., `.svg`, `.html`) leading to Stored Cross-Site Scripting (XSS) or remote code execution risks depending on web server configurations.
*   **Fix**: Restrict uploaded files to a strict allowlist of extensions (e.g., `.pdf`, `.png`, `.jpg`, `.jpeg`, `.docx`).

---

### 9. File Upload Interruption on Form Submit
*   **Files**: [`src/Components/admin/FileUpload.tsx`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/Components/admin/FileUpload.tsx) and [`src/Components/admin/GenForm.tsx`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/Components/admin/GenForm.tsx)
*   **Description**: File uploads are run asynchronously. However, the form's "Save Record" submit button remains enabled while files are uploading.
*   **Impact**: An admin can hit save before the file finishes uploading, submitting the form with an empty or outdated URL path.
*   **Fix**: Track upload states in `GenForm` and disable the submit button until all uploads complete successfully.

---

### 10. Query Parameter Overwrite on List Page Pagination
*   **File**: [`src/Components/admin/GenListPage.tsx`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/Components/admin/GenListPage.tsx)
*   **Description**: The Next/Previous pagination links construct a new URL parameter string from scratch: `?page=${page + 1}&search=${search}`.
*   **Impact**: Any other URL parameters (such as filters, sorting orders, or custom parameters) are instantly lost when navigating pages.
*   **Fix**: Read existing URL query parameters using `useSearchParams` and merge them into the page link.

---

### 11. Unencrypted Remote Database Connections (Security Risk)
*   **File**: [`src/lib/db.ts`](file:///c:/Users/yokes/OneDrive/Desktop/new%20CAG/new_cag_ui/src/lib/db.ts)
*   **Description**: The pool is configured with `ssl: false` while connecting to a remote database server `10.10.182.225`.
*   **Impact**: Database queries, table data, and database credentials (`postgres`/`9342535504@dP`) are transmitted across the network in clear text, making them vulnerable to network interception.
*   **Fix**: Configure database connections to require SSL encryption in production.
