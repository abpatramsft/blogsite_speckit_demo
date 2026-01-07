---
description: "Task list for modern blogging website implementation"
---

# Tasks: Modern Blogging Website

**Input**: Design documents from `/specs/001-modern-blog-site/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓

**Tests**: Tests are NOT explicitly requested in the specification. Test tasks are NOT included. Testing will be done via Lighthouse audits and E2E validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

All paths relative to repository root. This is a frontend-only web application using Next.js App Router structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Next.js 14 project with TypeScript in repository root using create-next-app
- [X] T002 Install core dependencies: tailwindcss, autoprefixer, postcss
- [X] T003 [P] Configure next.config.js with output: 'export' for static site generation
- [X] T004 [P] Configure tailwind.config.js with breakpoints (320px, 640px, 768px, 1024px, 1440px) and color scheme
- [X] T005 [P] Configure tsconfig.json with strict mode enabled
- [X] T006 [P] Setup ESLint configuration in .eslintrc.json
- [X] T007 [P] Setup Prettier configuration in .prettierrc
- [X] T008 Create project directory structure: src/app, src/components, src/data, src/lib, src/types, public/images
- [X] T009 [P] Create global styles in src/app/globals.css with Tailwind imports
- [X] T010 [P] Add development scripts to package.json (dev, build, start, lint, format)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T011 Create TypeScript type definitions for BlogPost in src/types/blog.ts
- [X] T012 [P] Create TypeScript type definitions for FAQItem in src/types/faq.ts
- [X] T013 [P] Create TypeScript type definitions for NavigationItem in src/types/navigation.ts
- [X] T014 Create blogs.json data file in src/data/blogs.json with 10 blog post entries (mock data)
- [X] T015 [P] Create faq.json data file in src/data/faq.json with 8 FAQ entries
- [X] T016 Create markdown files for all 10 blog posts in src/data/posts/ directory
- [ ] T017 [P] Add blog post featured images (10 images) to public/images/blog/ directory
- [ ] T018 [P] Add author avatar image to public/images/avatars/ directory
- [X] T019 Create utility function getBlogPosts() in src/lib/getBlogPosts.ts to load and parse blog data
- [X] T020 [P] Create utility function formatDate() in src/lib/formatDate.ts for date formatting
- [X] T021 [P] Create utility function readMarkdownFile() in src/lib/readMarkdown.ts to parse markdown content
- [X] T022 Install markdown processing dependencies: gray-matter, remark, remark-html
- [X] T023 Create root layout component in src/app/layout.tsx with metadata and HTML structure

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 6 - Navigate Between Pages (Priority: P1) 🎯 MVP Foundation

**Goal**: Implement site-wide navigation that works on all pages with mobile hamburger menu

**Independent Test**: Navigate to any page and verify navigation menu appears with all links (Home, Blogs, About, FAQ). On mobile viewport (<768px), hamburger menu appears and expands on click. Current page is visually highlighted.

### Implementation for User Story 6

- [X] T024 [P] [US6] Create Navigation component in src/components/Navigation.tsx with desktop menu
- [X] T025 [US6] Add mobile hamburger menu logic to Navigation component with Tailwind responsive classes
- [X] T026 [US6] Implement active page highlighting in Navigation component using usePathname hook
- [X] T027 [US6] Add Footer component in src/components/Footer.tsx with site information
- [X] T028 [US6] Integrate Navigation and Footer into root layout (src/app/layout.tsx)
- [X] T029 [US6] Ensure all interactive elements meet 44x44px minimum touch target size
- [X] T030 [US6] Add keyboard navigation support with proper focus states and ARIA labels

**Checkpoint**: Navigation appears on all pages and works correctly on desktop and mobile

---

## Phase 4: User Story 1 - View Latest Blog on Landing Page (Priority: P1) 🎯 MVP Core

**Goal**: Create landing page that displays the most recent blog post with preview and "Read More" link

**Independent Test**: Navigate to home page (/) and verify latest blog post displays with title, excerpt, date, featured image, and clickable "Read More" button

### Implementation for User Story 1

- [X] T031 [P] [US1] Create Hero component in src/components/Hero.tsx for featured blog display
- [X] T032 [P] [US1] Create BlogCard component in src/components/BlogCard.tsx for blog post preview cards
- [X] T033 [US1] Implement home page in src/app/page.tsx that fetches latest blog post and renders Hero
- [X] T034 [US1] Add responsive styling to home page with Tailwind (mobile-first approach)
- [X] T035 [US1] Implement proper image optimization using next/image with priority flag for hero image
- [X] T036 [US1] Add SEO metadata (title, description, Open Graph tags) to home page
- [X] T037 [US1] Ensure excerpt displays 150-200 characters with proper truncation
- [X] T038 [US1] Add proper semantic HTML elements (article, section, heading hierarchy)

**Checkpoint**: Landing page displays latest blog post beautifully and is fully responsive

---

## Phase 5: User Story 3 - Read Full Blog Post (Priority: P1) 🎯 MVP Core

**Goal**: Individual blog post pages display complete article content with proper formatting

**Independent Test**: Click on any blog post link and verify full content displays with title, author, date, formatted body text, images, and proper typography

### Implementation for User Story 3

- [X] T039 [P] [US3] Create BlogContent component in src/components/BlogContent.tsx to render markdown content
- [X] T040 [P] [US3] Create dynamic route folder structure: src/app/blogs/[slug]/
- [X] T041 [US3] Implement generateStaticParams() in src/app/blogs/[slug]/page.tsx to pre-generate all blog pages
- [X] T042 [US3] Implement blog post page component in src/app/blogs/[slug]/page.tsx
- [X] T043 [US3] Add markdown-to-HTML processing in blog post page using remark/remark-html
- [X] T044 [US3] Apply typography styles to blog content with Tailwind typography plugin
- [X] T045 [US3] Add responsive image handling for images within blog content
- [X] T046 [US3] Add JSON-LD structured data (Schema.org BlogPosting) for SEO
- [X] T047 [US3] Generate metadata (title, description, Open Graph) dynamically per post
- [X] T048 [US3] Ensure proper heading hierarchy (h1 for title, h2/h3 for sections)

**Checkpoint**: All 10 blog posts are readable with proper formatting and SEO

---

## Phase 6: User Story 2 - Browse All Blogs (Priority: P1) 🎯 MVP Core

**Goal**: Dedicated blogs page displays all 10 blog posts in a grid layout for browsing

**Independent Test**: Navigate to /blogs and verify all 10 posts display in grid layout with title, excerpt, date, featured image, and are clickable

### Implementation for User Story 2

- [X] T049 [P] [US2] Create blogs listing page in src/app/blogs/page.tsx
- [X] T050 [US2] Fetch all blog posts and sort by publishedDate descending
- [X] T051 [US2] Implement responsive grid layout (1 column mobile, 2 columns tablet, 3 columns desktop)
- [X] T052 [US2] Render BlogCard component for each post in the grid
- [X] T053 [US2] Add page title and description to blogs page
- [X] T054 [US2] Add SEO metadata for blogs page
- [X] T055 [US2] Ensure grid spacing and alignment work on all breakpoints
- [X] T056 [US2] Make entire blog card clickable (not just title) for better UX

**Checkpoint**: Blogs page displays all posts beautifully in responsive grid

---

## Phase 7: User Story 7 - Mobile-Friendly Experience (Priority: P1) 🎯 MVP Polish

**Goal**: Ensure all pages work seamlessly on mobile devices with responsive design

**Independent Test**: Test all pages on mobile viewport (320px, 375px, 414px) and verify no horizontal scrolling, readable text, properly sized images, and touch-friendly interactions

### Implementation for User Story 7

- [ ] T057 [P] [US7] Audit all components for mobile responsiveness using Tailwind mobile-first classes
- [ ] T058 [P] [US7] Verify touch target sizes (44x44px minimum) across all interactive elements
- [ ] T059 [US7] Test navigation hamburger menu on various mobile screen sizes
- [ ] T060 [US7] Ensure images scale properly on small screens (max-width: 100%)
- [ ] T061 [US7] Test typography legibility on mobile (minimum 16px base font size)
- [ ] T062 [US7] Verify no horizontal scrolling on 320px viewport (iPhone SE)
- [ ] T063 [US7] Test blog content readability on mobile devices
- [ ] T064 [US7] Add viewport meta tag in layout for proper mobile rendering

**Checkpoint**: Entire site works flawlessly on mobile devices from 320px up

---

## Phase 8: User Story 4 - Learn About the Site/Author (Priority: P2)

**Goal**: About page displays information about the blog and author with photo

**Independent Test**: Navigate to /about and verify biographical content and author photo display professionally

### Implementation for User Story 4

- [X] T065 [P] [US4] Create about page in src/app/about/page.tsx
- [X] T066 [US4] Add author bio content (3-4 paragraphs) about blog purpose and author background
- [X] T067 [US4] Integrate author avatar image with next/image component
- [X] T068 [US4] Apply professional layout with responsive design (text beside/below image)
- [X] T069 [US4] Add SEO metadata for about page
- [X] T070 [US4] Ensure proper semantic HTML structure (sections, headings)
- [X] T071 [US4] Add proper alt text for author photo

**Checkpoint**: About page establishes credibility and explains blog purpose

---

## Phase 9: User Story 5 - Find Answers to Common Questions (Priority: P3)

**Goal**: FAQ page displays 8 frequently asked questions with clear answers

**Independent Test**: Navigate to /faq and verify 8 questions display with organized answers

### Implementation for User Story 5

- [X] T072 [P] [US5] Create FAQ page in src/app/faq/page.tsx
- [X] T073 [P] [US5] Create FAQItem component in src/components/FAQItem.tsx for individual Q&A display
- [X] T074 [US5] Load FAQ data from src/data/faq.json
- [X] T075 [US5] Render all FAQ items sorted by order field
- [X] T076 [US5] Add expandable/collapsible sections for better mobile UX (optional enhancement)
- [X] T077 [US5] Apply clear visual separation between questions
- [X] T078 [US5] Add SEO metadata for FAQ page with structured data
- [X] T079 [US5] Ensure FAQ content is readable and well-formatted

**Checkpoint**: FAQ page answers common questions effectively

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and quality checks across all user stories

- [X] T080 [P] Install and configure next-sitemap package for sitemap.xml generation
- [X] T081 [P] Add robots.txt file to public/ directory
- [X] T082 [P] Create custom 404 page in src/app/not-found.tsx
- [X] T083 [P] Add favicon and app icons to public/ directory
- [X] T084 Implement fallback for missing blog featured images (placeholder or colored background)
- [X] T085 Add loading states for better perceived performance
- [ ] T086 [P] Run Lighthouse audit on all pages and ensure 90+ scores (Performance, Accessibility, Best Practices, SEO)
- [ ] T087 [P] Verify WCAG 2.1 AA color contrast compliance using browser tools
- [ ] T088 [P] Test keyboard navigation on all pages
- [X] T089 Validate all external links have rel="noopener noreferrer"
- [X] T090 [P] Run build command and verify static export generates correctly
- [ ] T091 Test 3G network throttling to ensure <3 second page load
- [X] T092 [P] Update README.md with project overview, setup instructions, and deployment guide
- [X] T093 Add .gitignore file for Next.js (node_modules, .next, out, etc.)
- [X] T094 Verify all 10 blog posts have proper content (800-1500 words each)
- [ ] T095 [P] Validate all images have descriptive alt text
- [ ] T096 Run final accessibility audit with axe DevTools
- [ ] T097 Verify mobile touch targets (44x44px) on all interactive elements
- [ ] T098 Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] T099 Verify no console errors or warnings in production build
- [ ] T100 Review and validate implementation matches constitution requirements

**Checkpoint**: Site is production-ready with excellent performance and accessibility

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 6 - Navigation (Phase 3)**: Depends on Foundational - Should be done FIRST as it affects all pages
- **User Stories 1, 2, 3, 7 (Phases 4-7)**: All P1 priority, depend on Navigation being complete, can proceed in any order or parallel
- **User Story 4 (Phase 8)**: P2 priority, can start after foundational work
- **User Story 5 (Phase 9)**: P3 priority, lowest priority
- **Polish (Phase 10)**: Depends on all user stories being complete

### User Story Dependencies

- **US6 - Navigation**: Must complete FIRST - all other pages need navigation
- **US1 - Landing Page**: Independent after US6, no dependencies on other stories
- **US2 - Blogs Page**: Independent after US6, uses same BlogCard component as US1 (T032)
- **US3 - Blog Post Pages**: Independent after US6, linked from US1 and US2
- **US7 - Mobile Responsive**: Should be implemented alongside all other stories (mobile-first approach)
- **US4 - About Page**: Completely independent, can be done anytime after US6
- **US5 - FAQ Page**: Completely independent, can be done anytime after US6

### Within Each User Story

- Navigation (US6) before any other user story (provides layout structure)
- Foundation (data, types, utilities) before components
- Components before pages
- Pages before SEO/metadata refinements
- Core functionality before polish

### Parallel Opportunities

**Phase 1 - Setup**: ALL tasks (T003-T010) can run in parallel

**Phase 2 - Foundational**: 
- T012, T013 (types) in parallel
- T015, T016 (data files) in parallel  
- T017, T018 (images) in parallel
- T020, T021 (utilities) in parallel

**Phase 3 - US6 Navigation**: T024, T027 can run in parallel

**Phase 4 - US1 Landing**: T031, T032 can run in parallel

**Phase 5 - US3 Blog Posts**: T039, T040 can run in parallel

**Phase 6 - US2 Blogs Page**: T049, T050 can run together

**Phase 7 - US7 Mobile**: T057, T058 can run in parallel

**Phase 8 - US4 About**: T065, T066 can run in parallel

**Phase 9 - US5 FAQ**: T072, T073 can run in parallel

**Phase 10 - Polish**: Many tasks (T080-T089, T092-T098) can run in parallel

**User Story Parallelization**:
Once US6 (Navigation) is complete, the following can proceed in parallel:
- US1 (Landing Page) - Developer A
- US2 (Blogs Page) - Developer B  
- US3 (Blog Posts) - Developer C
- US4 (About) - Developer D
- US5 (FAQ) - Developer E
- US7 (Mobile polish) - Can be done by any developer as they complete their story

---

## Parallel Example: Setup Phase

```bash
# After T001 and T002, launch all config tasks together:
Task T003: "Configure next.config.js"
Task T004: "Configure tailwind.config.js"
Task T005: "Configure tsconfig.json"
Task T006: "Setup ESLint"
Task T007: "Setup Prettier"
Task T009: "Create globals.css"
Task T010: "Add npm scripts"
```

---

## Parallel Example: Foundational Phase

```bash
# After basic structure exists, launch all data/type tasks:
Task T012: "Create FAQItem types"
Task T013: "Create NavigationItem types"
Task T015: "Create faq.json"
Task T017: "Add blog images"
Task T018: "Add avatar"
Task T020: "Create formatDate utility"
Task T021: "Create readMarkdown utility"
```

---

## Implementation Strategy

### MVP First (Core Blog Functionality)

1. Complete Phase 1: Setup → Project initialized
2. Complete Phase 2: Foundational → Data and utilities ready
3. Complete Phase 3: Navigation (US6) → Site structure in place
4. Complete Phase 4: Landing Page (US1) → MVP can be demoed!
5. Complete Phase 5: Blog Posts (US3) → Users can read blogs
6. Complete Phase 6: Blogs Listing (US2) → Content discovery enabled
7. Complete Phase 7: Mobile Polish (US7) → Mobile users supported
8. **STOP and VALIDATE**: Test entire blog reading flow end-to-end
9. Deploy MVP with core P1 features complete

### Incremental Delivery

**Iteration 1**: Foundation + Navigation + Landing Page
- Delivers: Visually impressive home page, site is navigable
- Demo: "Here's our beautiful landing page featuring the latest blog"

**Iteration 2**: Add Individual Blog Posts + Blogs Listing  
- Delivers: Full blog reading experience
- Demo: "Users can browse and read all 10 blog posts"

**Iteration 3**: Add About + FAQ Pages
- Delivers: Complete site with all pages
- Demo: "Full site with blog, about, and FAQ sections"

**Iteration 4**: Polish and Optimization
- Delivers: Production-ready site with 90+ Lighthouse scores
- Demo: "Optimized, accessible, mobile-friendly blog site"

### Parallel Team Strategy

With 5 developers after Phase 2 completes:

1. **Week 1**: Everyone on Phase 1 + 2 together (foundation)
2. **Week 2**: Phase 3 (US6 Navigation) - 2 devs
3. **Week 3** (US6 complete):
   - Dev A: Phase 4 (US1 - Landing Page)
   - Dev B: Phase 5 (US3 - Blog Posts)  
   - Dev C: Phase 6 (US2 - Blogs Listing)
   - Dev D: Phase 8 (US4 - About Page)
   - Dev E: Phase 9 (US5 - FAQ Page)
4. **Week 4**: Everyone on Phase 7 (US7 - Mobile) + Phase 10 (Polish)
5. Stories integrate seamlessly as they all use shared components and data

---

## Task Summary

**Total Tasks**: 100
- Phase 1 (Setup): 10 tasks
- Phase 2 (Foundational): 13 tasks ⚠️ BLOCKS all user stories
- Phase 3 (US6 - Navigation): 7 tasks - **MVP Foundation**
- Phase 4 (US1 - Landing): 8 tasks - **MVP Core**
- Phase 5 (US3 - Blog Posts): 10 tasks - **MVP Core**
- Phase 6 (US2 - Blogs Listing): 8 tasks - **MVP Core**
- Phase 7 (US7 - Mobile): 8 tasks - **MVP Core**
- Phase 8 (US4 - About): 7 tasks
- Phase 9 (US5 - FAQ): 8 tasks
- Phase 10 (Polish): 21 tasks

**Parallel Opportunities**: 35+ tasks can run in parallel when team capacity allows

**MVP Scope** (Minimum Viable Product):
- Phases 1-7 (US6, US1, US3, US2, US7): 64 tasks
- Delivers: Complete blog with landing page, blog reading, browsing, navigation, mobile support

**Full Feature Set**: All 100 tasks

**Independent Test Criteria**:
- US6: Navigation works on all pages
- US1: Landing page shows latest blog
- US3: Individual blog posts are readable
- US2: All blogs browsable in grid
- US7: Mobile experience excellent
- US4: About page informative
- US5: FAQ answers questions

---

## Notes

- All tasks follow strict checklist format: `- [ ] [TaskID] [P?] [Story?] Description with file path`
- [P] indicates tasks that can run in parallel (different files, no blocking dependencies)
- [Story] labels (US1-US7) map tasks to specific user stories for traceability
- Each user story is independently completable and testable
- Mobile-first approach means responsive design is built into each component, not retrofitted
- No test tasks included as tests were not explicitly requested in specification
- Lighthouse audits and E2E validation will serve as quality gates
- Constitution requirements (accessibility, performance, SEO) enforced throughout
- Commit after each task or logical group of parallel tasks
- Stop at any checkpoint to validate story independently before proceeding
