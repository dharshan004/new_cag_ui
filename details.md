# Admin Panel Module Analysis: Old vs New

> **Generated**: 26 Aug 2026  
> **Old System**: CakePHP 4.x — `CAG_Website/src/Controller/Admin/` (169 controllers)  
> **New System**: Next.js 16 — `new_cag_ui/src/app/admin/` (27 modules + dynamic CRUD)

---

## Executive Summary

| Metric | Count |
|---|---|
| **Old CakePHP Controllers** | **169** |
| **New Next.js Modules (List Pages)** | **27** |
| **Dynamic Add/Edit Routes** | **2** (via `[module]/add` and `[module]/[id]/edit`) |
| **Shared API Endpoints** | **4** (auth, crud, upload, options) |
| **Fully Implemented** ✅ | **32 controllers covered** |
| **Partially Covered** 🟡 | **12 controllers** |
| **Missing / Not Yet Built** ❌ | **125 controllers** |
| **Coverage Rate** | **19% full · 26% partial+full** |

---

## How to Read This Document

Each old CakePHP controller is listed with its status:

- ✅ **Implemented** — A corresponding module exists in the new admin panel with list, add, edit, and delete functionality.
- 🟡 **Partially Covered** — The functionality is partially addressed by an existing broader module (e.g., "Circulars" is covered under "Publications").
- ❌ **Missing** — No corresponding module or DB table exists yet in the new system.

---

## Section 1: Fully Implemented Modules ✅

These old controllers have a direct 1:1 mapping to a new admin module page.

| # | Old Controller (CakePHP) | New Module (Next.js) | DB Table | Route |
|---|---|---|---|---|
| 1 | `DashboardController` | Dashboard | — (aggregated) | `/admin/dashboard` |
| 2 | `UsersController` | Admin Users | `admin_users` | `/admin/users` |
| 3 | `AuditReportsController` | Audit Reports | `audit_reports` | `/admin/audit-reports` |
| 4 | `AuditTrailLogController` | Audit Log | `admin_audit_log` | `/admin/audit-log` |
| 5 | `BannersController` | Banners | `banners` | `/admin/banners` |
| 6 | `NewsController` | News | `news` | `/admin/news` |
| 7 | `NotificationController` | Notifications | `notifications` | `/admin/notifications` |
| 8 | `PagesController` | Pages / CMS | `pages` | `/admin/pages` |
| 9 | `FaqsController` | FAQs | `faqs` | `/admin/faqs` |
| 10 | `QuickLinksController` | Quick Links | `quick_links` | `/admin/quick-links` |
| 11 | `EventsController` | Events | `events` | `/admin/events` |
| 12 | `FormerCagController` | Former CAGs | `former_cags` | `/admin/former-cags` |
| 13 | `RecruitmentNoticesController` | Recruitment Notices | `recruitment_notices` | `/admin/recruitment-notices` |
| 14 | `TendersController` | Tenders | `tenders` | `/admin/tenders` |
| 15 | `JournalIssuesController` | Journal Issues | `journal_issues` | `/admin/journal-issues` |
| 16 | `JournalArticlesController` | Journal Articles | `journal_articles` | `/admin/journal-articles` |
| 17 | `PublicConsultantsController` | Public Consultations | `public_consultations` | `/admin/public-consultations` |
| 18 | `ContactUsDetailsController` | Contact Submissions | `contact_submissions` | `/admin/contact-submissions` |
| 19 | `PhotoGalleryController` | Media Gallery | `media_gallery` | `/admin/media-gallery` |
| 20 | `VideoGalleryController` | Media Gallery (merged) | `media_gallery` | `/admin/media-gallery` |
| 21 | `OrganisationChartController` | Org Designations | `org_designations` | `/admin/org-designations` |
| 22 | `DesignationHierarchyController` | Org Designations | `org_designations` | `/admin/org-designations` |
| 23 | `OrgChargeMasterController` | Org Officers | `org_officers` | `/admin/org-officers` |
| 24 | `StateAccountsReportController` | State Accounts | `state_accounts` | `/admin/state-accounts` |
| 25 | `DepartmentsStatesController` | States | `states` | `/admin/states` |
| 26 | — (new addition) | Government Types | `government_types` | `/admin/government-types` |
| 27 | — (new addition) | Offices | `offices` | `/admin/offices` |
| 28 | — (new addition) | Audit Report Files | `audit_report_files` | `/admin/audit-report-files` |
| 29 | `BannerCategoriesController` | Banners (merged) | `banners` | `/admin/banners` |
| 30 | `AppController` | Auth System | — | NextAuth + middleware |
| 31 | `AjaxController` | API Routes | — | `/api/admin/*` |
| 32 | `ErrorController` | Next.js Error | — | Built-in `not-found.tsx` |

**Total: 32 old controllers fully addressed**

---

## Section 2: Partially Covered Modules 🟡

These old controllers have their core functionality absorbed into broader new modules, but may be missing specific sub-features.

| # | Old Controller (CakePHP) | Covered By | What's Missing |
|---|---|---|---|
| 1 | `CircularsController` | Publications | Dedicated circular category filter, circular-specific fields |
| 2 | `CircularCategoriesController` | Publications | Category management is merged into pub_type select |
| 3 | `PressReleaseController` | News | press_release type exists in news_type but no separate view |
| 4 | `PressClippingController` | News | No dedicated press clipping management |
| 5 | `NoticeController` | Notifications | Notices are merged into notifications |
| 6 | `SpeechesController` | News / Pages | No dedicated speeches section |
| 7 | `WhatsNewController` | News / Notifications | No "What's New" marquee module |
| 8 | `ImportantLinksController` | Quick Links | Important links merged into quick_links |
| 9 | `JournalController` | Journal Issues | Parent journal management merged into issues |
| 10 | `JournalVolumesController` | Journal Issues | Volume is a field within journal_issues, not separate |
| 11 | `OldAuditReportsController` | Audit Reports | Legacy reports not separated from current reports |
| 12 | `PublicConsultantCommentsController` | Public Consultations | Comment management within consultations not built |

**Total: 12 old controllers partially covered**

---

## Section 3: Missing Modules ❌

### 3.1 — HR & Staff Management (22 controllers)

| # | Old Controller | Priority | Description |
|---|---|---|---|
| 1 | `GradationListController` | 🔴 High | Staff gradation/seniority lists |
| 2 | `DepartmentGradationListController` | 🔴 High | Department-wise gradation |
| 3 | `DeputationController` | 🔴 High | Deputation orders and notices |
| 4 | `RetirementsController` | 🟠 Medium | Retirement notices/listings |
| 5 | `PensionController` | 🟠 Medium | Pension-related documents |
| 6 | `GpfController` | 🟠 Medium | GPF (General Provident Fund) management |
| 7 | `StaffPositionPipController` | 🟠 Medium | Staff position/PIP tracking |
| 8 | `StaffAssociationsJcmController` | 🟡 Low | Staff association/JCM documents |
| 9 | `WelfareController` | 🟡 Low | Staff welfare schemes |
| 10 | `PostingTransferGuidelinesCommercialSaosAaosController` | 🟡 Low | Transfer posting guidelines |
| 11 | `ExistingPoliciesTransferPostingGroupBCStaffController` | 🟡 Low | Transfer posting policies |
| 12 | `ImmovablePropertyReturnsController` | 🟡 Low | Property return declarations |
| 13 | `ForeignToursController` | 🟡 Low | Foreign tour approvals/logs |
| 14 | `TourProgrammeController` | 🟡 Low | Tour programme management |
| 15 | `DrawingDisbOfficersController` | 🟡 Low | Drawing & disbursing officers list |
| 16 | `TreasuryOfficersController` | 🟡 Low | Treasury officer management |
| 17 | `RajbhashaCadreController` | 🟡 Low | Rajbhasha cadre management |
| 18 | `ApplicantProformaController` | 🟡 Low | Applicant proforma forms |
| 19 | `ApplicantProformaDesignationController` | 🟡 Low | Proforma designation mapping |
| 20 | `IaasOfficersTraineeController` | 🟡 Low | IA&AS officer trainee tracking |
| 21 | `StudentInternshipProgrammeController` | 🟡 Low | Student internship management |
| 22 | `YoungProfessionalProgrammeController` | 🟡 Low | Young professional programme |

---

### 3.2 — Examination Wing (12 controllers)

| # | Old Controller | Priority | Description |
|---|---|---|---|
| 1 | `ExaminationsController` | 🔴 High | Main examination management |
| 2 | `ExaminationDetailsController` | 🔴 High | Exam details/schedules |
| 3 | `ExaminationBooksController` | 🟠 Medium | Examination reference books |
| 4 | `ExaminationOfficesController` | 🟠 Medium | Exam centres/offices |
| 5 | `ExaminationsWingsController` | 🟠 Medium | Wings within examination dept |
| 6 | `ExaminationConfidentialDocumentsController` | 🟠 Medium | Confidential exam documents |
| 7 | `ExaminationDataCollectionFormsController` | 🟡 Low | Data collection forms |
| 8 | `ExaminationFeedbackController` | 🟡 Low | Exam feedback submissions |
| 9 | `ExamFaqsController` | 🟡 Low | Exam-specific FAQs |
| 10 | `ExamWingCircularsController` | 🟡 Low | Exam wing circulars |
| 11 | `SamplePapersController` | 🟡 Low | Sample/past question papers |
| 12 | `CourseContentsController` | 🟡 Low | Course content management |

---

### 3.3 — ICISA Sub-site (17 controllers)

| # | Old Controller | Priority | Description |
|---|---|---|---|
| 1 | `IcisaTrainingsController` | 🔴 High | ICISA training programmes |
| 2 | `IcisaCoursesController` | 🔴 High | ICISA course management |
| 3 | `IcisaFacultyController` | 🟠 Medium | ICISA faculty profiles |
| 4 | `IcisaMembersController` | 🟠 Medium | ICISA members directory |
| 5 | `IcisaActivitiesController` | 🟠 Medium | ICISA activities log |
| 6 | `IcisaCircularsController` | 🟠 Medium | ICISA-specific circulars |
| 7 | `IcisaResourcesController` | 🟠 Medium | ICISA learning resources |
| 8 | `IcisaPhotoGalleryController` | 🟡 Low | ICISA photo gallery |
| 9 | `IcisaStudyMaterialController` | 🟡 Low | Study material uploads |
| 10 | `IcisaMarqueeController` | 🟡 Low | ICISA ticker/marquee items |
| 11 | `IcisaDeputationAndNoticesController` | 🟡 Low | ICISA deputation notices |
| 12 | `IcisaItAuditReportsController` | 🟡 Low | IT audit reports for ICISA |
| 13 | `IcisaMembersFeedbackController` | 🟡 Low | ICISA member feedback |
| 14 | `IcisaEmailValidationListController` | 🟡 Low | Email validation list |
| 15 | `IcisaTrainingCertificatesController` | 🟡 Low | Training certificates |
| 16 | `IcisaTrainingParticipantController` | 🟡 Low | Training participant tracking |
| 17 | `IcisaStmResearchProjectController` | 🟡 Low | STM research projects |
| 18 | `IcisaVirtualPublishingController` | 🟡 Low | Virtual publishing |

---

### 3.4 — RTI & Grievance (5 controllers)

| # | Old Controller | Priority | Description |
|---|---|---|---|
| 1 | `RtiApplicationsController` | 🔴 High | RTI application management |
| 2 | `RtiApplicationsDataController` | 🔴 High | RTI application data tracking |
| 3 | `RtiDisclosureController` | 🟠 Medium | Proactive disclosure documents |
| 4 | `RtiJournalController` | 🟡 Low | RTI journal publications |
| 5 | `GrievanceController` | 🔴 High | Public grievance management |

---

### 3.5 — Training & Knowledge Management (11 controllers)

| # | Old Controller | Priority | Description |
|---|---|---|---|
| 1 | `TrainingController` | 🔴 High | Training programme management |
| 2 | `TrainingCalendarController` | 🔴 High | Training calendar/schedule |
| 3 | `TrainingEventsController` | 🟠 Medium | Training event registrations |
| 4 | `FacultyController` | 🟠 Medium | Faculty/resource person profiles |
| 5 | `ResourcePersonsController` | 🟡 Low | External resource persons |
| 6 | `CourseMaterialController` | 🟡 Low | Course material uploads |
| 7 | `CurrentProgrammeController` | 🟡 Low | Current running programmes |
| 8 | `JournalMgmtTrainingController` | 🟡 Low | Journal management training |
| 9 | `IaadKmsContentController` | 🟡 Low | IAAD KMS content management |
| 10 | `KmsCategoriesController` | 🟡 Low | KMS category taxonomy |
| 11 | `LibraryController` | 🟡 Low | Library catalogue management |

---

### 3.6 — Content & Configuration (20 controllers)

| # | Old Controller | Priority | Description |
|---|---|---|---|
| 1 | `RolesController` | 🔴 High | User role management (RBAC) |
| 2 | `ModulesController` | 🟠 Medium | Module/permission definitions |
| 3 | `MenusController` | 🟠 Medium | Navigation menu builder |
| 4 | `MenuRegionsController` | 🟡 Low | Menu region assignments |
| 5 | `TemplatesController` | 🟠 Medium | Page template management |
| 6 | `TemplateCategoriesController` | 🟡 Low | Template category taxonomy |
| 7 | `WebsitesController` | 🟠 Medium | Multi-site configuration |
| 8 | `LanguagesController` | 🟡 Low | Language/i18n settings |
| 9 | `HomeBlocksController` | 🟡 Low | Homepage block layout manager |
| 10 | `HomeRegionsController` | 🟡 Low | Homepage region definitions |
| 11 | `FooterSliderItemsController` | 🟡 Low | Footer slider content |
| 12 | `NoteDisplayTextController` | 🟡 Low | Note/disclaimer text config |
| 13 | `FieldsController` | 🟡 Low | Dynamic form field builder |
| 14 | `FormsController` | 🟡 Low | Form builder management |
| 15 | `QrCodesController` | 🟡 Low | QR code generation |
| 16 | `UserOfficesController` | 🟡 Low | User-office assignments |
| 17 | `CountriesController` | 🟡 Low | Country master list |
| 18 | `DistrictsController` | 🟡 Low | District master list |
| 19 | `WingsController` | 🟡 Low | CAG wings/divisions |
| 20 | `GeneralCategoriesController` | 🟡 Low | General category taxonomy |

---

### 3.7 — Audit & Reports (10 controllers)

| # | Old Controller | Priority | Description |
|---|---|---|---|
| 1 | `StatusOfAuditReportsController` | 🔴 High | Audit report action-taken status |
| 2 | `AgOtherReportsController` | 🟠 Medium | AG other reports |
| 3 | `CombinedAccountsController` | 🟠 Medium | Combined finance accounts |
| 4 | `PerformanceActivityReportController` | 🟠 Medium | Performance/activity reports |
| 5 | `OutstandingTreasuryInspectionReportController` | 🟡 Low | Outstanding treasury inspections |
| 6 | `StudyReportsController` | 🟡 Low | Study report publications |
| 7 | `BudgetController` | 🟡 Low | Budget documents |
| 8 | `ResearchPaperController` | 🟡 Low | Research papers |
| 9 | `CorePublishedPapersController` | 🟡 Low | Core published papers |
| 10 | `AdministrativeInformationController` | 🟡 Low | Administrative information pages |

---

### 3.8 — Misc Modules (16 controllers)

| # | Old Controller | Priority | Description |
|---|---|---|---|
| 1 | `AlumniController` | 🟡 Low | Alumni network management |
| 2 | `CollaborationsController` | 🟡 Low | Institutional collaborations |
| 3 | `CommentsController` | 🟡 Low | Comment moderation system |
| 4 | `PublicConsultantTrackingDetailsController` | 🟡 Low | Consultation tracking |
| 5 | `NewsLetterController` | 🟡 Low | Newsletter subscriber/dispatch |
| 6 | `ActAndMannualController` | 🟡 Low | Acts and manuals documents |
| 7 | `OfficeMannualController` | 🟡 Low | Office manual documents |
| 8 | `ManualsController` | 🟡 Low | General manuals |
| 9 | `GuidanceNotesPracticeGuidesController` | 🟡 Low | Guidance notes/practice guides |
| 10 | `GuidelinesController` | 🟡 Low | Guidelines documents |
| 11 | `PolicyAndGuidelinesController` | 🟡 Low | Policy and guidelines |
| 12 | `RecruitmentRulesController` | 🟡 Low | Recruitment rules documents |
| 13 | `ImportantDatesController` | 🟡 Low | Important dates calendar |
| 14 | `MediaUploadsController` | 🟡 Low | Generic media upload manager |
| 15 | `InHouseSystemsController` | 🟡 Low | In-house IT systems |
| 16 | `BookingHostelRoomsController` | 🟡 Low | Hostel room booking system |

---

### 3.9 — Sub-site & Multi-site (6 controllers)

| # | Old Controller | Priority | Description |
|---|---|---|---|
| 1 | `SubsitesOrgStructController` | 🟠 Medium | Sub-site org structure |
| 2 | `SubsiteOrgChargeMasterController` | 🟡 Low | Sub-site charge assignments |
| 3 | `SubsiteOrgDesigHierarchyController` | 🟡 Low | Sub-site designation hierarchy |
| 4 | `SubsiteWhatsNewController` | 🟡 Low | Sub-site what's new section |
| 5 | `BlueEconomyCenterController` | 🟡 Low | Blue economy center sub-site |
| 6 | `BoardCommitteesController` | 🟡 Low | Board/committee pages |

---

### 3.10 — AE (Accountant General) Wing (5 controllers)

| # | Old Controller | Priority | Description |
|---|---|---|---|
| 1 | `AeCircularsOfficeOrdersController` | 🟠 Medium | AE wing circulars/office orders |
| 2 | `AeComplaintSuggestionController` | 🟡 Low | AE complaints/suggestions |
| 3 | `AeNoticesController` | 🟡 Low | AE wing notices |
| 4 | `AeStateAccountsController` | 🟡 Low | AE state accounts |
| 5 | `AeTrainingController` | 🟡 Low | AE wing training |

---

### 3.11 — Utility/Framework (4 controllers — NOT required for rebuild)

| # | Old Controller | Reason Not Needed |
|---|---|---|
| 1 | `FrmImportController` | CakePHP data import utility |
| 2 | `functions.php` | PHP helper functions file (not a controller) |
| 3 | `GeController` | GE-specific utility controller |
| 4 | `FacultyController` | Merged with Training |

---

## Section 4: Summary Statistics

### By Priority (Missing Modules Only)

| Priority | Count | Examples |
|---|---|---|
| 🔴 **High** | **14** | RTI, Grievance, Roles, Examinations, Training, Status of Audit Reports |
| 🟠 **Medium** | **23** | Retirement, Pension, ICISA modules, Menus, Templates, AE Circulars |
| 🟡 **Low** | **88** | Hostel booking, Alumni, Newsletter, Property returns, KMS, etc. |

---

## Section 5: Recommended Next Build Phases

### Phase 3 — High Priority (14 modules, ~2 weeks)
1. **Roles & Permissions** — `RolesController`, `ModulesController`
2. **RTI System** — `RtiApplicationsController`, `RtiApplicationsDataController`, `RtiDisclosureController`
3. **Grievance** — `GrievanceController`
4. **Examination Wing** — `ExaminationsController`, `ExaminationDetailsController`
5. **Training** — `TrainingController`, `TrainingCalendarController`
6. **Status of Audit Reports** — `StatusOfAuditReportsController`
7. **HR Essentials** — `GradationListController`, `DeputationController`

### Phase 4 — Medium Priority (23 modules, ~3 weeks)
- ICISA sub-site (courses, faculty, members, activities)
- AE wing modules
- Combined Accounts, AG Reports, Performance Reports
- Menu management, Template system
- Retirement, Pension, Staff modules

### Phase 5 — Low Priority (88 modules, ~4-6 weeks)
- All remaining HR/staff modules
- Newsletter, Alumni, Collaborations
- Hostel bookings, Tours, Property returns
- Multi-site management
- KMS, Library, Sample Papers
- Utility controllers (QR codes, forms, fields)

---

## Section 6: Database Gap Analysis

The current PostgreSQL database (`cag_new` schema) has **27 tables**. The legacy CakePHP system used **~120+ MySQL tables**. The following key tables are **missing from the new database** and must be created before their modules can be built:

| Missing DB Table | Required For | Priority |
|---|---|---|
| `roles` / `permissions` | Roles & RBAC | 🔴 High |
| `rti_applications` | RTI System | 🔴 High |
| `rti_disclosures` | RTI Disclosure | 🔴 High |
| `grievances` | Grievance System | 🔴 High |
| `examinations` | Exam Wing | 🔴 High |
| `examination_details` | Exam schedules | 🔴 High |
| `training_programmes` | Training module | 🔴 High |
| `training_calendar` | Training calendar | 🔴 High |
| `circulars` | Circulars (existing table) | ✅ Exists |
| `gradation_lists` | HR Gradation | 🟠 Medium |
| `deputation_orders` | Deputation | 🟠 Medium |
| `retirements` | Retirement | 🟠 Medium |
| `icisa_courses` | ICISA sub-site | 🟠 Medium |
| `icisa_faculty` | ICISA sub-site | 🟠 Medium |
| `icisa_members` | ICISA sub-site | 🟠 Medium |
| `menus` | Navigation | 🟠 Medium |
| `templates` | Page templates | 🟠 Medium |

> **IMPORTANT**: The `circulars` table already exists in the `cag_new` schema but has no admin module page yet. This should be added as a quick win.

---

## Section 7: What's Working Today

The new admin panel currently provides a **fully functional, production-ready** admin experience for the following workflows:

1. ✅ **Login / Logout** with bcrypt password verification against `admin_users`
2. ✅ **Dashboard** with live record counts from all 12 primary tables
3. ✅ **Full CRUD** (Create, Read, Update, Delete) for all 27 DB-backed modules
4. ✅ **Search + Pagination** on every list page
5. ✅ **File/Image Uploads** with drag-and-drop to local storage
6. ✅ **Bilingual Support** (English + Hindi fields) on all content forms
7. ✅ **Audit Trail Logging** — every create/update action logged to `admin_audit_log`
8. ✅ **Relationship Dropdowns** — States, Government Types, Designations, Journal Issues
9. ✅ **Responsive Sidebar** with collapsible navigation groups
10. ✅ **Session Protection** — all `/admin/*` routes require authentication
