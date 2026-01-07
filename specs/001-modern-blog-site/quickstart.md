# Quickstart Guide: Modern Blogging Website

**Feature**: [spec.md](./spec.md) | [plan.md](./plan.md) | [research.md](./research.md) | [data-model.md](./data-model.md)

## Overview

This guide helps you get the modern blogging website up and running on your local machine. The site is built with Next.js 14, TypeScript, and Tailwind CSS, generating static HTML for deployment.

## Prerequisites

Before you begin, ensure you have:

- **Node.js**: Version 18.x or higher ([download](https://nodejs.org/))
- **npm** or **yarn**: Package manager (included with Node.js)
- **Git**: Version control ([download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([download](https://code.visualstudio.com/))

Verify installations:
```bash
node --version  # Should show v18.x or higher
npm --version   # Should show 9.x or higher
git --version   # Should show 2.x or higher
```

## Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd blogsite
git checkout 001-modern-blog-site
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including Next.js, React, Tailwind CSS, and TypeScript.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the landing page with the latest blog post.

### 4. Explore the Site

Navigate through the site:
- **Home** (`/`): Landing page with featured blog post
- **Blogs** (`/blogs`): Grid of all 10 blog posts
- **Individual Posts** (`/blogs/[slug]`): Full blog post content
- **About** (`/about`): About page
- **FAQ** (`/faq`): Frequently asked questions

## Project Structure

```
blogsite/
├── public/                 # Static assets
│   └── images/            # Blog images, avatars
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout (navigation, footer)
│   │   ├── page.tsx      # Home page
│   │   ├── blogs/        # Blog pages
│   │   ├── about/        # About page
│   │   └── faq/          # FAQ page
│   ├── components/        # Reusable React components
│   ├── data/              # Mock blog content (JSON + Markdown)
│   │   ├── blogs.json    # Blog metadata
│   │   ├── posts/        # Markdown files
│   │   └── faq.json      # FAQ content
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
├── tests/                 # Test files
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## Available Scripts

### Development

```bash
npm run dev          # Start development server (hot reload enabled)
npm run dev -- -p 3001  # Start on custom port
```

### Production Build

```bash
npm run build        # Build static site (outputs to /out directory)
npm run start        # Preview production build locally
```

### Code Quality

```bash
npm run lint         # Run ESLint to check code quality
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

### Testing

```bash
npm run test         # Run Jest unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run E2E tests with UI (interactive)
```

## Configuration Files

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static HTML export
  images: {
    unoptimized: true  // Required for static export
  }
}

module.exports = nextConfig
```

### tailwind.config.js

Configure breakpoints, colors, and design tokens:

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        'xs': '320px',  // Extra small devices
      },
    },
  },
}
```

### tsconfig.json

TypeScript configuration with strict mode enabled for type safety.

## Adding Content

### Adding a New Blog Post

1. **Add metadata** to `src/data/blogs.json`:

```json
{
  "id": "my-new-post",
  "slug": "my-new-post",
  "title": "My New Blog Post",
  "author": "Jane Developer",
  "publishedDate": "2026-01-08",
  "excerpt": "This is a compelling excerpt about my new post...",
  "featuredImage": "/images/blog/my-new-post.jpg",
  "featuredImageAlt": "Description of the image",
  "tags": ["tutorial", "web-development"]
}
```

2. **Create markdown file** at `src/data/posts/my-new-post.md`:

```markdown
# My New Blog Post

Introduction paragraph...

## Section 1

Content here...

## Section 2

More content...
```

3. **Add featured image** to `public/images/blog/my-new-post.jpg`

4. **Rebuild** the site:

```bash
npm run build
```

### Adding a FAQ

Edit `src/data/faq.json`:

```json
{
  "id": "new-question",
  "question": "Your question here?",
  "answer": "Your answer here. Supports **Markdown**!",
  "order": 9,
  "category": "general"
}
```

## Development Workflow

### 1. Make Changes

Edit files in `/src` directory. The dev server hot-reloads automatically.

### 2. Check Quality

Before committing:

```bash
npm run lint        # Check for issues
npm run type-check  # Verify TypeScript types
npm run format      # Format code
```

### 3. Test

```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
```

### 4. Build & Preview

```bash
npm run build       # Create production build
npm run start       # Preview locally
```

### 5. Commit

```bash
git add .
git commit -m "feat: add new blog post about TypeScript"
git push
```

## Deployment

### Static Export

The site builds to static HTML in the `/out` directory:

```bash
npm run build
```

Deploy the `/out` folder to any static hosting:

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js and deploys

### Netlify

1. Push code to GitHub
2. Create new site on [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `out`

### GitHub Pages

```bash
npm run build
# Deploy /out directory to gh-pages branch
```

### Other Hosts

Upload `/out` directory contents to any static file host (AWS S3, Cloudflare Pages, etc.)

## Performance Optimization

### Image Optimization

- Store images in `/public/images/`
- Use WebP format for best compression
- Provide alt text for accessibility
- Images automatically optimized during build

### Lighthouse Audit

Check performance, accessibility, SEO:

```bash
npm run build
npm run start
# Open http://localhost:3000
# Open Chrome DevTools > Lighthouse > Generate Report
```

**Target scores**: 90+ for Performance, Accessibility, Best Practices, SEO

### Bundle Size

Analyze what's in your JavaScript bundle:

```bash
npm run build
# Check .next/analyze for bundle report
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors

```bash
# Check what's wrong
npm run type-check

# Update TypeScript
npm install typescript@latest --save-dev
```

### Missing Images

Ensure images exist in `/public/images/` and paths in JSON match exactly.

## VS Code Setup

### Recommended Extensions

Install these VS Code extensions for best experience:

- **ES7+ React/Redux/React-Native snippets**: Component snippets
- **Tailwind CSS IntelliSense**: Autocomplete for Tailwind classes
- **Prettier**: Code formatting
- **ESLint**: Linting
- **Error Lens**: Inline error display

### Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Next Steps

1. **Customize Design**: Edit Tailwind config and components in `/src/components`
2. **Add More Posts**: Follow "Adding Content" section above
3. **Customize About/FAQ**: Edit content in respective page files
4. **Run Tests**: Ensure everything works with `npm run test:e2e`
5. **Deploy**: Push to Vercel/Netlify for live site

## Support

- **Spec**: [spec.md](./spec.md) - Feature requirements
- **Technical Plan**: [plan.md](./plan.md) - Implementation details
- **Data Model**: [data-model.md](./data-model.md) - Content structure
- **Research**: [research.md](./research.md) - Technical decisions

## Key Reminders

✅ Always provide alt text for images (accessibility)  
✅ Test on mobile viewports (320px minimum)  
✅ Run Lighthouse audit before deploying  
✅ Keep excerpt 100-200 characters  
✅ Use semantic HTML elements  
✅ Ensure 44x44px minimum touch targets  
✅ Maintain 4.5:1 color contrast ratio  

Happy blogging! 🚀
