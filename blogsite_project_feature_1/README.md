# BlogSite - Modern Static Blogging Website

A modern, performant, and accessible static blogging website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Fast**: Static site generation for optimal performance
- 📱 **Responsive**: Mobile-first design that works on all devices
- ♿ **Accessible**: WCAG 2.1 Level AA compliant
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS
- 📝 **10 Blog Posts**: Comprehensive articles on web development topics
- 🔍 **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- 🌐 **Static Export**: No server required, deploy anywhere

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.x with strict mode
- **Styling**: Tailwind CSS 3.x with mobile-first approach
- **Content**: JSON metadata + Markdown blog posts
- **Typography**: @tailwindcss/typography for beautiful content
- **Icons**: SVG icons for navigation and social links

## Prerequisites

- Node.js 18+ LTS
- npm or yarn

## Getting Started

### Installation

```bash
# Clone the repository (if using git)
git clone <repository-url>
cd blogsite

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Create optimized production build
npm run build

# The static site is exported to the 'out' directory
# You can deploy the 'out' folder to any static hosting service
```

### Other Commands

```bash
# Type check
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
blogsite/
├── public/
│   └── images/
│       ├── blog/          # Blog featured images (add 10 images here)
│       └── avatars/       # Author avatar (add 1 image here)
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── about/         # About page
│   │   ├── blog/[slug]/   # Individual blog posts
│   │   ├── blogs/         # Blog listing page
│   │   ├── faq/           # FAQ page
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── BlogCard.tsx   # Blog post card
│   │   ├── Footer.tsx     # Site footer
│   │   ├── Hero.tsx       # Hero section
│   │   └── Navigation.tsx # Site navigation
│   ├── data/              # Content data
│   │   ├── posts/         # Markdown blog posts (10 files)
│   │   ├── blogs.json     # Blog metadata
│   │   └── faq.json       # FAQ data
│   ├── lib/               # Utility functions
│   │   ├── formatDate.ts  # Date formatting
│   │   ├── getBlogPosts.ts # Blog data fetching
│   │   └── readMarkdown.ts # Markdown processing
│   └── types/             # TypeScript types
│       ├── blog.ts
│       ├── faq.ts
│       └── navigation.ts
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Pages

- **Home** (`/`): Features the latest blog post with hero section
- **Blogs** (`/blogs`): Grid view of all 10 blog posts
- **Blog Post** (`/blog/[slug]`): Individual blog post pages
- **About** (`/about`): Information about the blog and author
- **FAQ** (`/faq`): Frequently asked questions with expandable answers

## Content Management

### Adding a New Blog Post

1. Create a new entry in `src/data/blogs.json`:

```json
{
  "id": "11",
  "slug": "my-new-post",
  "title": "My New Post",
  "author": "Jane Doe",
  "publishedDate": "2025-01-20T00:00:00.000Z",
  "excerpt": "A brief description...",
  "featuredImage": "/images/blog/my-new-post.jpg",
  "featuredImageAlt": "Description of image",
  "content": "my-new-post.md",
  "tags": ["Tag1", "Tag2"],
  "readingTimeMinutes": 5
}
```

2. Create the markdown file in `src/data/posts/my-new-post.md`

3. Add the featured image to `public/images/blog/my-new-post.jpg`

4. Rebuild the site: `npm run build`

### Adding Images

The site requires images for optimal presentation:

1. **Blog Featured Images**: Add 10 images to `public/images/blog/`
   - Recommended size: 1200x630px
   - Format: JPG or WebP
   - See `public/images/blog/README.md` for details

2. **Author Avatar**: Add 1 image to `public/images/avatars/`
   - Recommended size: 400x400px
   - Format: JPG or WebP
   - See `public/images/avatars/README.md` for details

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Netlify

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `out`

### GitHub Pages

1. Build the site: `npm run build`
2. Push the `out` directory to your `gh-pages` branch

### Other Static Hosts

Deploy the `out` directory to any static hosting service:
- Cloudflare Pages
- AWS S3 + CloudFront
- Azure Static Web Apps
- Firebase Hosting

## Performance

- ✅ Static site generation for instant page loads
- ✅ Optimized images with next/image
- ✅ Code splitting via Next.js App Router
- ✅ Lazy loading for off-screen content
- ✅ Minimal JavaScript bundle size

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels for navigation
- ✅ Keyboard navigation support
- ✅ 44x44px touch targets
- ✅ Proper focus states
- ✅ WCAG 2.1 Level AA compliant

## SEO

- ✅ Meta tags for all pages
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ Semantic HTML structure
- ✅ Dynamic metadata per page
- ✅ Proper heading hierarchy

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers

## License

MIT License - feel free to use this project for your own purposes.

## Author

Jane Doe - Web Developer

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Markdown processing with [remark](https://remark.js.org/)

---

**Note**: For implementation details, see [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
