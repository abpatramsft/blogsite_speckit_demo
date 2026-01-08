# Feature Specification: Blog Upload & Publishing Interface

**Feature Branch**: `002-blog-uploads`  
**Created**: 2026-01-08  
**Status**: Draft  
**Input**: User description: "Build an uploads page where users can upload blogs by filling in required values (title, author, excerpt, image [optional with default fallback], content, tags, reading time). Uploaded content adds to blogs.json. No database—static mock data updates."

## Clarifications

### Session 2026-01-08

- Q: Should tags be predefined (curated list) or freely entered? → A: Free-form comma-separated entry. Users enter any tags as comma-separated text; system accepts values without validation against a predefined list.
- Q: Should the upload form include a preview mode? → A: No preview mode. Users submit directly; they can view the published post immediately after submission to verify rendering and styling.
- Q: What is the maximum reasonable file size for image uploads? → A: 3 MB per image. This balances high-quality blog images with fast deployments and reasonable repository size constraints.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create New Blog Post via Upload Form (Priority: P1)

A content creator navigates to the uploads page and encounters a form with fields for all required blog post metadata. They fill in title, author name, excerpt, select or upload a featured image, write or upload blog content, add tags, and specify reading time. Upon submission, the new blog post is saved and immediately visible on the website.

**Why this priority**: This is the core feature—without it, the uploads page has no purpose. It directly delivers the primary value: enabling content creation without database infrastructure.

**Independent Test**: Can be fully tested by navigating to the uploads page, completing the form with valid data, and verifying the new blog post appears in blogs.json and is accessible via the site. Delivers immediate value by enabling new blog creation.

**Acceptance Scenarios**:

1. **Given** I am on the uploads page, **When** the page loads, **Then** I see a comprehensive form with labeled input fields for title, author, excerpt, featured image, content, tags, and reading time
2. **Given** I fill in all required fields with valid data, **When** I click "Publish" or "Submit", **Then** the system validates the input and shows a success message
3. **Given** I upload a featured image, **When** the upload completes, **Then** the image is stored in `/public/images/blog/` and a preview is displayed
4. **Given** I submit the form successfully, **When** the submission completes, **Then** a new entry is added to `src/data/blogs.json` with a unique ID and generated slug
5. **Given** I submit the form successfully, **When** I navigate to the blog list or visit the new blog's URL, **Then** the new post is immediately visible with all the data I entered

---

### User Story 2 - Provide Optional Featured Image with Default Fallback (Priority: P1)

A content creator may or may not have a featured image ready. If they upload an image, it's used; if they skip this field, a default placeholder image is assigned automatically, allowing the blog post to be published without requiring image selection.

**Why this priority**: This reduces friction for content creators and prevents incomplete submissions due to missing optional assets. Critical for user experience.

**Independent Test**: Can be tested by submitting the form both with and without an image, verifying that submissions without images default to a placeholder. Delivers value by allowing flexible content creation workflows.

**Acceptance Scenarios**:

1. **Given** I am on the uploads page, **When** I view the featured image field, **Then** it is marked as optional with clear instruction text
2. **Given** I submit the form without uploading a featured image, **When** the submission completes, **Then** the blog post is assigned a default featured image path (e.g., `/images/blog/default-blog-image.jpg`)
3. **Given** I upload a featured image, **When** the upload completes, **Then** the custom image is used instead of the default
4. **Given** a blog post has a default featured image, **When** I view it on the blog list or detail page, **Then** the default image displays correctly without errors

---

### User Story 3 - Auto-Generate Required Metadata (Priority: P1)

The system automatically generates or derives certain metadata fields that users shouldn't manually enter: unique ID (next sequential), slug (URL-safe version of title), and published date (current date/time). These are either hidden from the form or displayed as read-only.

**Why this priority**: Ensures data consistency and prevents user errors in generating IDs and slugs. Core requirement for maintaining blog.json integrity.

**Independent Test**: Can be tested by submitting the form and verifying that the generated ID, slug, and date in blogs.json are correct and follow expected patterns. Delivers value by ensuring data consistency.

**Acceptance Scenarios**:

1. **Given** I submit the upload form, **When** the submission is processed, **Then** a unique ID is automatically assigned (next sequential integer as string)
2. **Given** I enter a title like "My New Blog Post", **When** the form is submitted, **Then** a URL-safe slug is generated (e.g., "my-new-blog-post") and stored in blogs.json
3. **Given** I submit the form, **When** the submission completes, **Then** the current date and time (ISO 8601 format) is recorded as `publishedDate`
4. **Given** I view the submitted blog post on the site, **When** I check its URL, **Then** it uses the generated slug (e.g., `/blog/my-new-blog-post`)

---

### User Story 4 - Write or Upload Blog Content (Priority: P1)

A content creator can either type blog content directly into a textarea or upload a Markdown file containing the blog post. The content is stored in `src/data/posts/` as a Markdown file, and the reference is recorded in blogs.json as the `content` field (filename).

**Why this priority**: Core feature—the blog content is the primary asset. Must support flexible input methods (typed or uploaded).

**Independent Test**: Can be tested by creating a blog post with typed content and another with uploaded Markdown, verifying both render correctly. Delivers value by enabling content creation workflows.

**Acceptance Scenarios**:

1. **Given** I am on the uploads page, **When** I view the content field, **Then** I can either type content directly or upload a Markdown file
2. **Given** I type content directly, **When** I submit the form, **Then** the content is saved as a new Markdown file in `src/data/posts/` with a filename matching the slug (e.g., `my-new-blog-post.md`)
3. **Given** I upload a Markdown file, **When** the upload completes, **Then** the file is stored in `src/data/posts/` and the filename is referenced in blogs.json
4. **Given** I submit a blog post with content, **When** I view the published blog post page, **Then** the content renders correctly with proper Markdown formatting (headings, lists, code blocks, etc.)

---

### User Story 5 - Tag Management for Blog Posts (Priority: P2)

A content creator can add one or more tags to categorize their blog post. Tags are entered as free-form comma-separated text with no predefined list constraints. Tags are stored as an array in blogs.json and can be used for future filtering/searching.

**Why this priority**: Enhances content organization and enables future search/filtering features. Not critical for initial launch but important for UX.

**Independent Test**: Can be tested by creating blog posts with various tags and verifying they're stored correctly in blogs.json. Delivers value by organizing content for discoverability.

**Acceptance Scenarios**:

1. **Given** I am on the uploads page, **When** I view the tags field, **Then** I can enter tags as comma-separated text in a free-form input
2. **Given** I enter tags like "React, Web Development, Tutorial", **When** I submit the form, **Then** the tags are parsed from the comma-separated string and stored as an array in blogs.json: `["React", "Web Development", "Tutorial"]`
3. **Given** I submit a blog post with tags, **When** I view the published blog post, **Then** the tags are displayed and are styled consistently with the design

---

### User Story 6 - Validate Form Input Before Submission (Priority: P1)

The form validates all required fields before allowing submission. If validation fails, users see clear error messages indicating which fields are invalid and why. Invalid submissions are prevented until all required fields are properly filled.

**Why this priority**: Prevents malformed data from being added to blogs.json and ensures consistent blog structure.

**Independent Test**: Can be tested by attempting to submit empty or invalid forms and verifying error messages appear. Delivers value by preventing data corruption.

**Acceptance Scenarios**:

1. **Given** I leave required fields empty, **When** I attempt to submit, **Then** validation fails and I see error messages for each empty required field
2. **Given** I enter an excerpt longer than a reasonable limit (e.g., >500 chars), **When** I attempt to submit, **Then** validation shows a warning or error
3. **Given** I enter a reading time as a non-numeric value, **When** I attempt to submit, **Then** validation fails with a message like "Reading time must be a number"
4. **Given** all required fields are correctly filled, **When** I click submit, **Then** validation passes and submission proceeds

---

### User Story 7 - Confirm Submission and Show Success Feedback (Priority: P1)

After successfully submitting a blog post, the user receives clear feedback confirming the publication. They're shown the newly created blog post URL or redirected to view it.

**Why this priority**: Essential for user confidence and to confirm the action completed successfully.

**Independent Test**: Can be tested by submitting a blog post and verifying success message appears and the post is accessible. Delivers value by confirming successful content creation.

**Acceptance Scenarios**:

1. **Given** I submit a valid blog post, **When** the submission completes, **Then** I see a success message like "Blog post published successfully!"
2. **Given** the submission completes successfully, **When** the page updates, **Then** I'm shown a link to the newly created blog post or redirected to view it
3. **Given** I view the newly published blog post, **When** I navigate to it, **Then** all my submitted data (title, content, tags, etc.) is displayed correctly

---

### Edge Cases

- What happens if two users try to create a blog post simultaneously? (ID collision mitigation—use timestamp or existing count as fallback)
- How does the system handle special characters or Unicode in titles/slugs? (Sanitize and encode properly for safe slug generation)
- What if a user uploads an image with an invalid format? (Validate file type—accept only JPEG, PNG, WebP; show error if invalid)
- What if the file size exceeds 3 MB limit? (Reject upload with clear error message, e.g., "Image must be under 3 MB")
- What if the Markdown file contains invalid syntax? (Store as-is but notify user; markdown parser will handle gracefully on render)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide an accessible upload form page at `/upload` route with input fields for title, author, excerpt, featured image, content, tags, and reading time
- **FR-002**: The system MUST validate all required fields (title, author, excerpt, content, tags, reading time) before allowing submission
- **FR-003**: The system MUST generate a unique sequential ID for each new blog post
- **FR-004**: The system MUST generate a URL-safe slug from the blog post title for use in routing and blogs.json
- **FR-005**: The system MUST record the current date/time in ISO 8601 format as `publishedDate`
- **FR-006**: The system MUST accept featured image uploads and store them in `/public/images/blog/` with sanitized filenames
- **FR-007**: The system MUST assign a default featured image path (e.g., `/images/blog/default-blog-image.jpg`) if no image is uploaded
- **FR-008**: The system MUST accept blog content either as typed text or as an uploaded Markdown file
- **FR-009**: The system MUST create a Markdown file in `src/data/posts/` with filename matching the slug (e.g., `my-post.md`)
- **FR-010**: The system MUST add a new entry to `src/data/blogs.json` with all metadata matching the JSON schema structure
- **FR-011**: The system MUST accept tags as free-form comma-separated input (no predefined list), parse them, and store them as a trimmed array in blogs.json (e.g., "React, Web Development" → `["React", "Web Development"]`)
- **FR-012**: The system MUST validate image file types (JPEG, PNG, WebP) and reject invalid formats with clear error messages
- **FR-013**: The system MUST enforce a maximum upload file size of 3 MB per image and show an error message if exceeded (e.g., "Image must be under 3 MB")
- **FR-014**: The system MUST sanitize all user input to prevent XSS or injection attacks
- **FR-015**: The system MUST provide clear error messages for all validation failures
- **FR-016**: The system MUST show a success message and provide access to the newly created blog post after successful submission
- **FR-017**: The system MUST handle the case where no featured image is uploaded by assigning a default
- **FR-018**: The system MUST support both typed and uploaded Markdown content for blog posts

### Key Entities *(include if feature involves data)*

- **BlogPost**: Represents a published blog post with properties: id (unique string), slug (URL-safe), title, author, publishedDate (ISO 8601), excerpt, featuredImage (path), featuredImageAlt (text), content (filename reference), tags (array), readingTimeMinutes (number)
- **UploadForm**: UI component accepting user input for all BlogPost fields; handles validation, file uploads, and form submission
- **ImageAsset**: A featured image file stored in `/public/images/blog/` with a sanitized filename and optional alt text

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully create and publish a new blog post from the upload form in under 5 minutes
- **SC-002**: 100% of newly created blog posts appear correctly on the blog list page and are accessible via their unique URL
- **SC-003**: Form validation catches all invalid inputs (empty required fields, invalid file types, oversized files) and displays clear error messages
- **SC-004**: Featured image uploads (when provided) are stored and render correctly; default images render correctly when no custom image is provided
- **SC-005**: All user-submitted data (title, author, excerpt, tags, content) is persisted accurately in blogs.json and rendered on the blog post page without data loss or corruption
- **SC-006**: The upload page is fully accessible (WCAG 2.1 Level AA) including keyboard navigation and screen reader support
- **SC-007**: The upload form and success page load and respond to user input in under 2 seconds on typical network conditions
- **SC-008**: 90% of users can successfully complete the blog post creation workflow without encountering errors or needing external help

---

## Assumptions

1. **No authentication/authorization**: Anyone can access the upload page and create blog posts (no user login or permission system)
2. **Static mock data model**: All changes are persisted to `src/data/blogs.json` and Markdown files; no database backend
3. **Build-time data integration**: New blog posts are available after the next build/deployment; real-time updates not required
4. **Featured image storage**: Images are stored in the repository `/public/images/blog/` directory accessible via static serving
5. **Markdown content format**: Blog content is stored and rendered as Markdown with optional front matter
6. **Default image availability**: A default featured image exists at `/images/blog/default-blog-image.jpg` as fallback
7. **Reading time as user input**: Reading time (in minutes) is user-provided, not calculated from content length
8. **Slug uniqueness**: Slug collisions are prevented by validating against existing slugs before submission
9. **File system write access**: The deployment environment allows writing to `src/data/` and `public/images/blog/` directories

---

