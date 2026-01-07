# SEO Fundamentals Every Developer Should Know

Search Engine Optimization isn't just for marketers—developers play a crucial role in building SEO-friendly websites. Let's explore technical SEO essentials.

## Semantic HTML

Use proper HTML elements for better SEO:

```html
<!-- Good semantic structure -->
<article>
  <header>
    <h1>Article Title</h1>
    <time datetime="2025-01-15">January 15, 2025</time>
  </header>
  
  <section>
    <h2>Section Title</h2>
    <p>Content...</p>
  </section>
</article>
```

## Meta Tags

Essential meta information:

```html
<head>
  <!-- Title (50-60 characters) -->
  <title>Page Title | Site Name</title>
  
  <!-- Description (150-160 characters) -->
  <meta name="description" content="Compelling page description">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://example.com/page">
  
  <!-- Robots directives -->
  <meta name="robots" content="index, follow">
</head>
```

## Open Graph Tags

Social media optimization:

```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="article">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

## Structured Data

Help search engines understand content:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "image": "https://example.com/image.jpg",
  "datePublished": "2025-01-15",
  "author": {
    "@type": "Person",
    "name": "Jane Doe"
  }
}
</script>
```

## URL Structure

Create SEO-friendly URLs:

```
Good: /blog/seo-fundamentals-for-developers
Bad:  /blog/post?id=123&category=4
```

Best practices:
- Use hyphens, not underscores
- Keep URLs short and descriptive
- Include target keywords
- Use lowercase
- Avoid special characters

## Heading Hierarchy

Proper heading structure:

```html
<h1>Page Main Title</h1>
  <h2>Major Section</h2>
    <h3>Subsection</h3>
    <h3>Another Subsection</h3>
  <h2>Another Major Section</h2>
    <h3>Subsection</h3>
```

Rules:
- One H1 per page
- Don't skip levels
- Logical hierarchy
- Include keywords naturally

## Image SEO

Optimize images for search:

```html
<img
  src="/images/seo-guide.jpg"
  alt="SEO fundamentals illustrated diagram showing key concepts"
  width="1200"
  height="630"
  loading="lazy"
>
```

Tips:
- Descriptive alt text
- Meaningful filenames
- Appropriate dimensions
- Compress file size
- Use modern formats (WebP, AVIF)

## Internal Linking

Improve site structure:

```html
<article>
  <p>
    Learn more about
    <a href="/web-performance">web performance optimization</a>
    in our comprehensive guide.
  </p>
</article>
```

## XML Sitemap

Help search engines discover pages:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/blog</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## Robots.txt

Control crawler access:

```
User-agent: *
Disallow: /admin/
Disallow: /api/
Allow: /

Sitemap: https://example.com/sitemap.xml
```

## Page Speed

Performance impacts SEO:

- Optimize images
- Minimize HTTP requests
- Enable compression
- Leverage browser caching
- Minify CSS/JS
- Use CDN

## Mobile-First Indexing

Ensure mobile compatibility:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- Responsive design
- Touch-friendly elements
- Fast mobile performance
- No intrusive interstitials

## HTTPS

Secure sites rank better:

- SSL certificate required
- HTTPS everywhere
- No mixed content
- HSTS enabled

## Core Web Vitals

Optimize user experience metrics:

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## Common Mistakes

Avoid these SEO killers:

- Duplicate content
- Broken links
- Missing alt text
- Slow page speed
- Poor mobile experience
- Thin content
- Keyword stuffing

## SEO Checklist

- [ ] Proper meta tags
- [ ] Semantic HTML
- [ ] Heading hierarchy
- [ ] Descriptive URLs
- [ ] Image optimization
- [ ] Internal linking
- [ ] XML sitemap
- [ ] Robots.txt
- [ ] Structured data
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Fast page speed

## Conclusion

Technical SEO is essential for visibility. Implement these fundamentals to help your content reach its audience!
