---
description: "Task breakdown for Blog Upload & Publishing Interface feature (002-blog-uploads)"
---

# Tasks: Blog Upload & Publishing Interface

**Feature**: Blog Upload & Publishing Interface (002-blog-uploads)  
**Input**: [plan.md](./plan.md), [spec.md](./spec.md), [data-model.md](./data-model.md), [quickstart.md](./quickstart.md)  
**Branch**: `002-blog-uploads`  
**Estimated Dev Time**: 4-6 hours across 5 phases  
**Build Constraint**: <60 seconds (Constitution Principle IV)

## Format: `- [ ] [TaskID] [P?] [Story] Description with file path`

- **[P]**: Parallelizable (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1-US7, or blank for setup/foundational)
- **File paths**: Exact locations (src/, public/, specs/)

---

## Phase 1: Setup & Shared Infrastructure

**Purpose**: Project initialization, types, and validation utilities  
**Checkpoint**: All utilities complete - foundation ready for form components  
**Status**: ✅ COMPLETE

- [x] T001 Create types directory structure and export interface `src/types/upload.ts` with UploadFormState, ValidationError, FileUploadPayload interfaces
- [x] T002 [P] Create `src/lib/uploadValidation.ts` with validation functions: validateTitle, validateAuthor, validateExcerpt, validateReadingTime, validateImageFile, validateAllFields
- [x] T003 [P] Create `src/lib/slugGenerator.ts` with slug generation logic: sanitizeToSlug (title → lowercase, remove special chars, trim to 100 chars), checkSlugCollision (against existing blogs.json), generateUniqueSlug (retry with timestamp suffix if collision)
- [x] T004 [P] Create `src/lib/blogDataManager.ts` with blog data I/O functions: readBlogsJson, getNextBlogId, addBlogEntry, validateBlogPostSchema
- [x] T005 [P] Create `src/lib/fileHandler.ts` with file operations: saveImageFile (to public/images/blog/), saveMarkdownFile (to src/data/posts/), generateFilePath, sanitizeFilename
- [x] T006 Update `src/types/blog.ts` to ensure BlogPost interface includes all 11 required properties: id, slug, title, author, publishedDate, excerpt, featuredImage, featuredImageAlt, content, tags, readingTimeMinutes (verify existing interface matches data-model.md)

---

## Phase 2: Foundational Components & Layout

**Purpose**: Reusable form components and upload page structure  
**Prerequisite**: Phase 1 utilities complete  
**Checkpoint**: All form components tested, upload page renders correctly  
**Status**: ✅ COMPLETE

- [x] T007 Create `src/components/FormError.tsx` as reusable error display component: accepts error message and field name, renders aria-live region for screen reader announcements, styled with Tailwind (text-red-600, bg-red-50 background optional)
- [x] T008 [P] Create `src/components/ImageUploadInput.tsx` component: file input for JPEG/PNG/WebP, preview display (Image component), drag-and-drop zone, size validation feedback, integrates uploadValidation.validateImageFile, handles default image fallback UI
- [x] T009 [P] Create `src/components/TagInput.tsx` component: textarea-style input for comma-separated tags, displays parsed tags as pills below input, integrates tag parsing logic, styled with Tailwind (rounded-md, border-gray-300, gap-2 for pills)
- [x] T010 [P] Create `src/components/ContentEditor.tsx` component: toggle between "Type Content" and "Upload Markdown" modes, textarea for typed content (min 50 chars), file input for .md files, mode picker with radio buttons or tabs, styled consistently with form elements
- [x] T011 Create `src/app/upload/page.tsx` as upload page wrapper: server component importing client form, header with "Upload New Blog Post" title (styled to match about/page.tsx gradient pattern), main container (max-w-4xl), wraps BlogUploadForm component, SSG-compatible
- [x] T012 Create `src/components/BlogUploadForm.tsx` main form component: 'use client' directive, useState for UploadFormState, onSubmit handler, renders: title field, author field, excerpt field, ImageUploadInput, ContentEditor, TagInput, reading time field, validation status, submit button (disabled while submitting), success message after submission redirects to /blog/[slug]

---

## Phase 3: User Story 1 - Create New Blog Post via Upload Form (P1)

**Goal**: Enable users to fill form and submit new blog post with all required metadata  
**Independent Test**: Navigate to /upload → complete form with valid data → submit → verify new post in blogs.json and accessible via URL  
**User Stories Addressed**: US1 (form creation, core submission flow)

- [x] T013 [US1] Implement form submission handler in BlogUploadForm.tsx: collect form state, call client-side validation, prevent submission on validation errors, handle error display
- [x] T014 [US1] Implement API route `src/app/api/upload/route.ts` with POST handler: receive form data, re-validate all fields server-side, sanitize inputs (XSS prevention), call blogDataManager to add entry, return success response with new slug or 400/500 on error
- [x] T015 [US1] Integrate slug generation in upload flow: call slugGenerator.generateUniqueSlug in API handler, store generated slug in BlogPost entry, prevent collisions, include slug in success response so UI can redirect
- [x] T016 [US1] Add success feedback in BlogUploadForm: show success message on successful submission, provide link to newly created post (/blog/[slug]), or auto-redirect after 2-second delay

---

## Phase 4: User Story 2 - Provide Optional Featured Image with Default Fallback (P1)

**Goal**: Allow optional image upload with automatic default assignment  
**Independent Test**: Submit form without image → verify blogs.json has default image path; Submit with image → verify custom image stored and referenced  
**User Stories Addressed**: US2 (optional image, default fallback), US6 (image validation)

- [ ] T017 [US2] Implement image mode toggle in ImageUploadInput: "Use Custom Image" vs "Use Default" radio/toggle, conditionally show file input based on selection, preserve selection state in form
- [ ] T018 [US2] Implement image file handling in fileHandler.ts: if no custom image, return default path (`/images/blog/default-blog-image.jpg`), if custom image provided, call saveImageFile with validated file, return stored image path
- [ ] T019 [US2] Integrate image storage in API handler: extract image from form data, call fileHandler based on mode, store resulting path in BlogPost.featuredImage, ensure featuredImageAlt populated (user input or auto-generated from title)
- [ ] T020 [US2] Add image preview component: display thumbnail of uploaded image in ImageUploadInput, show default image preview when "Use Default" selected, handle loading state and errors

---

## Phase 5: User Story 3 - Auto-Generate Required Metadata (P1)

**Goal**: Automatically generate ID, slug, and publish date without user input  
**Independent Test**: Submit form → verify blogs.json entry has sequential ID, URL-safe slug from title, ISO 8601 publishedDate  
**User Stories Addressed**: US3 (auto-generated metadata: ID, slug, date)

- [ ] T021 [US3] Implement ID generation in blogDataManager.ts: read blogs.json, determine next sequential ID (parseInt(max.id) + 1 or "1"), ensure uniqueness, return as string
- [ ] T022 [US3] Implement slug generation integration: sanitize title in slugGenerator, validate uniqueness against existing slugs in blogs.json, return generated slug to API handler, store in BlogPost.slug
- [ ] T023 [US3] Implement publishedDate auto-population in API handler: capture current ISO 8601 timestamp (new Date().toISOString()), store in BlogPost.publishedDate, ensure no future dates allowed (validation in uploadValidation.ts)

---

## Phase 6: User Story 4 - Write or Upload Blog Content (P1)

**Goal**: Support typed or uploaded Markdown content for blog post  
**Independent Test**: Submit with typed content → verify .md file created; Submit with .md file → verify content saved and rendered correctly  
**User Stories Addressed**: US4 (content input: typed or uploaded)

- [ ] T024 [US4] Implement content mode selection in ContentEditor.tsx: toggle between "Type Content" and "Upload Markdown", manage contentMode state, preserve user selection
- [ ] T025 [US4] Implement typed content flow: capture textarea input, validate minimum length (50+ chars), save as new .md file in src/data/posts/[slug].md, include simple metadata header if applicable (gray-matter format)
- [ ] T026 [US4] Implement uploaded Markdown flow: accept .md file upload from file input, validate file type (.md extension), read file content, save to src/data/posts/[slug].md, handle parsing errors gracefully
- [ ] T027 [US4] Store content reference in blogs.json: populate BlogPost.content field with filename reference (e.g., "my-new-post.md"), ensure content file exists before marking submission successful
- [ ] T028 [US4] Verify content rendering: test that saved Markdown renders correctly on blog detail page (/blog/[slug]) using existing Markdown renderer, headings/lists/code blocks render as expected

---

## Phase 7: User Story 5 - Tag Management for Blog Posts (P2)

**Goal**: Accept free-form comma-separated tags and parse to array  
**Independent Test**: Submit form with "React, Web Development, Tutorial" → verify blogs.json has tags array: ["React", "Web Development", "Tutorial"]  
**User Stories Addressed**: US5 (tag input: free-form, comma-separated), FR-011

- [ ] T029 [US5] Implement tag parsing logic in uploadValidation.ts: parse comma-separated string, trim whitespace from each tag, filter out empty strings, validate each tag max 50 chars, return string array
- [ ] T030 [US5] Integrate tag parsing in API handler: receive tagString from form, call tag parser, store parsed array in BlogPost.tags, ensure at least 1 tag provided (required field)
- [ ] T031 [US5] Display tags in form feedback: show parsed tags as pills/badges in TagInput component as user types, update in real-time, styled with Tailwind (bg-primary-100, text-primary-700, rounded-full px-2 py-1)
- [ ] T032 [US5] Ensure tags persist in blogs.json: verify tags array stored correctly in blogs.json entry, can be read back for blog display, support future tag filtering/search

---

## Phase 8: User Story 6 - Validate Form Input Before Submission (P1)

**Goal**: Validate all required fields and show clear error messages  
**Independent Test**: Submit empty form → errors for all empty fields; Invalid data → specific error messages; Valid data → submission succeeds  
**User Stories Addressed**: US6 (form validation), FR-002, FR-012, FR-013, FR-015

- [ ] T033 [US6] Implement field-level validation in uploadValidation.ts: validateTitle (required, ≤200 chars), validateAuthor (required, ≤100 chars), validateExcerpt (required, 100-500 chars), validateImageFile (JPEG/PNG/WebP only, ≤3MB), validateReadingTime (positive integer 1-60)
- [ ] T034 [US6] Integrate client-side validation in BlogUploadForm: on change/blur for each field, call validation function, update fieldErrors state, display FormError component for each invalid field
- [ ] T035 [US6] Prevent submission on validation errors: submit button disabled if any fieldErrors exist, show validation summary before submit attempt, provide clear message "Fix errors above to submit"
- [ ] T036 [US6] Implement server-side re-validation in API handler: re-validate all fields, reject with 400 if validation fails, return error details matching client-side format for consistency
- [ ] T037 [US6] Add image-specific validation: enforce MIME types (image/jpeg, image/png, image/webp only), enforce size limit (≤3145728 bytes / 3 MB), show specific error messages ("Image must be JPEG, PNG, or WebP" / "Image must be under 3 MB")
- [ ] T038 [US6] Test validation error messages: verify errors appear for empty title, empty author, excerpt <100 chars, invalid image format, oversized image, non-numeric reading time, confirm all messages are clear and specific

---

## Phase 9: User Story 7 - Confirm Submission and Show Success Feedback (P1)

**Goal**: Show clear success message and provide access to published post  
**Independent Test**: Submit valid form → success message appears; Click published post link → new post displays with correct data  
**User Stories Addressed**: US7 (success confirmation, post visibility), FR-016

- [ ] T039 [US7] Implement success message display in BlogUploadForm: after API response success, show success toast or message with text "Blog post published successfully!", display link to new post "View Published Post"
- [ ] T040 [US7] Implement post navigation: success message includes clickable link to /blog/[newSlug], or auto-redirect after 2 seconds to new post page, provide both options for UX flexibility
- [ ] T041 [US7] Verify new post data: test that successful submission results in all user data appearing on blog detail page: title, author, excerpt, featured image, content, tags, reading time all match what was submitted
- [ ] T042 [US7] Test blog list integration: verify new post appears in /blogs page with correct BlogCard rendering: title, excerpt, featured image, tags displayed correctly
- [ ] T043 [US7] Reset form after success: optional—after successful submission and redirect, form can reset to initial state for next upload (if user navigates back to /upload)

---

## Phase 10: Cross-Cutting Concerns & Polish

**Purpose**: Integration, validation, accessibility, performance, and final testing  
**Prerequisite**: All user stories (US1-US7) complete  
**Checkpoint**: Full feature complete, tested, ready for merge

- [ ] T044 [P] Implement accessibility: form uses semantic HTML (`<form>`, `<label>`, `<input>`), all inputs have associated labels, error messages in aria-live regions, keyboard navigation works throughout form (Tab/Enter/Escape), test with screen reader
- [ ] T045 [P] Implement type checking: run `npm run type-check` and fix any TypeScript errors, ensure strict mode compliance in all new files
- [ ] T046 [P] Implement linting: run `npm run lint` and fix any ESLint warnings in new files (BlogUploadForm.tsx, components, lib files, types)
- [ ] T047 [P] Test build performance: run `npm run build` and verify it completes in <60s (Constitution Principle IV), benchmark before and after to show impact
- [ ] T048 Verify sitemap generation: after successful submission and rebuild, verify `next-sitemap` includes new blog post (/blog/[slug]) in sitemap.xml
- [ ] T049 Test Markdown rendering: verify that Markdown files created during upload render correctly with headings, lists, code blocks, links; no rendering errors or console warnings
- [ ] T050 Test browser compatibility: verify form works in modern browsers (Chrome, Firefox, Safari, Edge), responsive design works on mobile/tablet/desktop (sm, md, lg breakpoints)
- [ ] T051 [P] Add console log cleanup: remove any debug console.log statements from submission handler, validation functions, file operations
- [ ] T052 Document the upload feature: update README.md with instructions for uploading new blog posts (if user-facing) or add developer notes to quickstart.md on testing new uploads locally
- [ ] T053 Final integration test: complete end-to-end workflow: navigate to /upload → fill form with all valid data → submit → success message → navigate to new post → verify all data rendered correctly

---

## Phase 11: Validation Checkpoint

**Purpose**: Ensure all requirements from spec.md are met  
**Prerequisite**: Phase 10 complete

- [ ] T054 [P] Validate against spec.md requirements: verify all 18 FR (Functional Requirements) are implemented and tested (FR-001 through FR-018)
- [ ] T055 [P] Validate against spec.md success criteria: verify all 8 SC (Success Criteria) are met (SC-001 through SC-008): <5 min form completion, 100% post visibility, validation, accessibility, build time, user success
- [ ] T056 [P] Validate against Constitution principles: verify feature complies with all 5 principles: Static-First (✅ SSG only, no runtime APIs), Type Safety (✅ TypeScript strict), Accessibility (✅ WCAG 2.1 AA), Performance (✅ <60s build), Content Structure (✅ Markdown + JSON)
- [ ] T057 Validate data model: verify blogs.json schema matches data-model.md BlogPost interface, all 11 properties present, validation rules enforced
- [ ] T058 Validate API contracts: verify form submission matches blog-post-upload.schema.json schema, response structure matches contract definitions
- [ ] T059 Run full test suite: unit tests (validation, slug generation, tag parsing) ✅ passing, integration tests (form submission, file writes) ✅ passing, E2E tests (full workflow) ✅ passing

---

## Dependencies & Execution Order

### Critical Path

1. **Phase 1 (Setup)**: ✅ MUST complete first - foundation for all other phases
   - No dependencies - start immediately
   - Blocks: Phase 2+

2. **Phase 2 (Foundational Components)**: ✅ MUST complete before form components
   - Depends on: Phase 1
   - Blocks: Phase 3+

3. **Phases 3-9 (User Stories 1-7)**: Can execute in priority order or in parallel
   - **US1 (Phase 3)**: Core submission flow - implement FIRST
   - **US2 (Phase 4)**: Optional image - can run in parallel with US3-5 (no dependencies on US1 code beyond form structure)
   - **US3 (Phase 5)**: Auto-generated metadata - can run in parallel with US2
   - **US4 (Phase 6)**: Content storage - depends on US1 form completion but content handling is independent
   - **US5 (Phase 7)**: Tag management - can run in parallel, depends on US1 form completion
   - **US6 (Phase 8)**: Validation - can run in parallel with content/tag phases
   - **US7 (Phase 9)**: Success feedback - depends on US1 submission complete
   - Blocks: Phase 10

4. **Phase 10 (Polish)**: Requires all user stories complete
   - Depends on: Phases 1-9 complete
   - Blocks: Phase 11

5. **Phase 11 (Validation)**: Final verification before merge
   - Depends on: Phase 10 complete
   - Final checkpoint

### User Story Dependencies

| Story | Priority | Depends On | Parallelizable After Phase 2 |
|-------|----------|-----------|------------------------------|
| US1 - Upload Form | P1 | Phase 2 ✅ | Yes (start first) |
| US2 - Optional Image | P1 | Phase 2 ✅ | Yes (can run with US3-5) |
| US3 - Auto-Generate Metadata | P1 | Phase 2 ✅ | Yes (can run with US2,4,5) |
| US4 - Content Upload | P1 | Phase 2 ✅ | Yes (can run with US2,3,5) |
| US5 - Tags | P2 | Phase 2 ✅ | Yes (can run with US2-4) |
| US6 - Validation | P1 | Phase 2 ✅ | Yes (can run with other stories) |
| US7 - Success Feedback | P1 | US1 (Phase 3) | No (depends on US1) |

### Parallel Execution Examples

**Example 1: 1-Person Sequential (4-6 hours)**
```
Phase 1 (Setup) → Phase 2 (Foundational) → 
  US1 (3-Form Submission) → 
  US2 (4-Image) → 
  US3 (5-Metadata) → 
  US4 (6-Content) → 
  US5 (7-Tags) → 
  US6 (8-Validation) → 
  US7 (9-Success) → 
  Phase 10 (Polish) → Phase 11 (Validation)
```
Estimated: 4-6 hours total

**Example 2: 2-Person Parallel (2-3 hours elapsed)**
```
Person A: Phase 1 (Setup) [30 min] → Phase 2 (Foundational) [45 min]
  ↓
Person B: (waiting for Phase 2)
  ↓
Person A: US1 + US3 + US5 [1.5 hrs] (US1 first, then US3 & US5 in parallel)
Person B: US2 + US4 + US6 [1.5 hrs] (can run in parallel with Person A)
  ↓
Person A: US7 + Phase 10 Polish [45 min]
Person B: Phase 11 Validation [30 min]
```
Estimated: 2-3 hours elapsed time

**Example 3: 3-Person Parallel (1.5-2 hours elapsed)**
```
Person A: Phase 1 → Phase 2 [1.25 hrs]
  ↓
Person B: US1 + US7 [1 hr]
Person A: US2 + US3 [1 hr] (parallel with Person B)
Person C: US4 + US5 + US6 [1 hr] (parallel with Persons A & B)
  ↓
(All): Phase 10 Polish [30 min]
(All): Phase 11 Validation [15 min]
```
Estimated: 1.5-2 hours elapsed time

---

## Implementation Strategy

### MVP Scope (Minimum Viable Product)

**Phase 1 Only**: User can upload blog post and see it published
- Includes: Phases 1-3 (Setup → Foundational → US1: Core Form Submission)
- Excludes: Optional image (US2), all metadata (US3), content upload (US4), tags (US5), validation (US6), success feedback (US7)
- **Time**: ~1.5 hours
- **Value**: Users can create basic blog posts with title, author, excerpt, content

**MVP+**: Add core features to make practical
- Includes: Phases 1-7 (Setup → Foundational → US1-US5)
- Adds: Optional image, auto-generated metadata, content upload, tag management
- Excludes: Full validation (US6), success feedback (US7)
- **Time**: ~3 hours
- **Value**: Fully functional blog upload with metadata, images, tags

**Full Feature**: Complete implementation
- Includes: All Phases 1-11
- Adds: Comprehensive validation (US6), success feedback (US7), polish, testing
- **Time**: 4-6 hours
- **Value**: Production-ready feature with excellent UX

### Suggested MVP Delivery

1. **Increment 1 (1.5 hours)**: Phase 1 + Phase 2 + Phase 3 (US1 core submission)
   - Delivers: Functional upload form with basic submission
   - Test: Submit valid form → post created and visible in blogs.json

2. **Increment 2 (1.5 hours)**: Phases 4-7 (US2-US5: images, metadata, content, tags)
   - Delivers: Full-featured upload with optional images, auto-generated data, content handling, tags
   - Test: Upload post with all features → data stored correctly

3. **Increment 3 (1.5-2 hours)**: Phases 8-11 (US6-US7: validation, success, polish)
   - Delivers: Production-ready feature with validation, error messages, success feedback, accessibility
   - Test: Full end-to-end workflow with error scenarios

---

## File Structure at Completion

```
src/
├── app/
│   ├── upload/
│   │   └── page.tsx                    ← T011
│   └── api/upload/
│       └── route.ts                    ← T014
├── components/
│   ├── BlogUploadForm.tsx              ← T012
│   ├── ImageUploadInput.tsx            ← T008
│   ├── TagInput.tsx                    ← T009
│   ├── ContentEditor.tsx               ← T010
│   └── FormError.tsx                   ← T007
├── lib/
│   ├── uploadValidation.ts             ← T002
│   ├── slugGenerator.ts                ← T003
│   ├── blogDataManager.ts              ← T004
│   └── fileHandler.ts                  ← T005
├── types/
│   ├── upload.ts                       ← T001
│   └── blog.ts                         ← T006 (updated)
└── data/
    ├── blogs.json                      ← Updated by API
    └── posts/
        └── [slug].md                   ← New Markdown files

public/images/blog/
├── default-blog-image.jpg              ← Existing (ensure present)
└── [user-uploaded-images].{jpg,png,webp} ← New uploads
```

---

## Validation Checklist

Before marking Phase 11 complete, verify:

- [ ] All 18 Functional Requirements (FR-001 to FR-018) implemented ✅
- [ ] All 8 Success Criteria (SC-001 to SC-008) met ✅
- [ ] All 5 Constitution Principles satisfied ✅
- [ ] TypeScript strict mode: `npm run type-check` passes ✅
- [ ] ESLint: `npm run lint` passes ✅
- [ ] Build: `npm run build` completes in <60 seconds ✅
- [ ] Accessibility: WCAG 2.1 Level AA (keyboard nav, screen reader, labels) ✅
- [ ] Data integrity: New blog posts persist in blogs.json correctly ✅
- [ ] Content rendering: Markdown files render without errors ✅
- [ ] Image handling: Custom images store and display; default image works ✅
- [ ] Error messages: Clear, specific, helpful ✅
- [ ] Success feedback: Confirmation message and post navigation working ✅

---

## Total Task Count Summary

| Phase | Count | Notes |
|-------|-------|-------|
| Phase 1 (Setup) | 6 | Types, validation, slug gen, data mgmt, file handling |
| Phase 2 (Foundational) | 6 | FormError, ImageUploadInput, TagInput, ContentEditor, upload page, main form |
| Phase 3 (US1) | 4 | Form submission, API handler, slug integration, success feedback |
| Phase 4 (US2) | 4 | Image mode toggle, image storage, image integration, preview |
| Phase 5 (US3) | 3 | ID gen, slug gen, publishedDate |
| Phase 6 (US4) | 4 | Content mode, typed flow, upload flow, persistence, rendering |
| Phase 7 (US5) | 4 | Tag parsing, API integration, UI display, persistence |
| Phase 8 (US6) | 6 | Field-level validation, client integration, submit prevention, server re-validation, image validation, testing |
| Phase 9 (US7) | 5 | Success message, post navigation, data verification, blog list integration, form reset |
| Phase 10 (Polish) | 9 | Accessibility, type checking, linting, build performance, sitemap, markdown, browser compat, cleanup, docs |
| Phase 11 (Validation) | 6 | Spec validation, Constitution validation, data model, contracts, test suite |
| **TOTAL** | **57 Tasks** | Organized by phase and user story for independent implementation |

---

**Status**: ✅ Task list generated and ready for implementation  
**Next Step**: Begin Phase 1 or Phase 2 based on team capacity and priority

