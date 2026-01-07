# Web Accessibility: A WCAG 2.1 Compliance Guide

Building accessible websites ensures that everyone, regardless of ability, can access and use your content. Let's explore WCAG 2.1 Level AA compliance.

## The Four Principles (POUR)

### 1. Perceivable
Information must be presentable to users in ways they can perceive.

### 2. Operable
Interface components must be operable by all users.

### 3. Understandable
Information and operation must be understandable.

### 4. Robust
Content must be robust enough to work with various technologies.

## Semantic HTML

Use proper HTML elements:

```html
<!-- Good -->
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<!-- Bad -->
<div class="nav">
  <span onclick="navigate()">Home</span>
</div>
```

## ARIA Labels

Enhance accessibility when needed:

```html
<button aria-label="Close dialog">
  <span aria-hidden="true">×</span>
</button>

<nav aria-label="Primary navigation">
  <!-- navigation items -->
</nav>
```

## Keyboard Navigation

Ensure all functionality is keyboard-accessible:

```css
/* Visible focus indicators */
:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* Skip to main content link */
.skip-link:focus {
  position: static;
}
```

## Color Contrast

Meet WCAG contrast requirements:

- **Normal text**: 4.5:1 minimum
- **Large text**: 3:1 minimum
- **UI components**: 3:1 minimum

```css
/* Good contrast */
.text {
  color: #333333;
  background-color: #ffffff;
}
```

## Alternative Text

Provide meaningful image descriptions:

```html
<!-- Informative image -->
<img src="chart.png" alt="Sales increased 25% in Q4 2024">

<!-- Decorative image -->
<img src="decoration.png" alt="">
```

## Form Accessibility

Create accessible forms:

```html
<label for="email">Email Address</label>
<input
  type="email"
  id="email"
  name="email"
  required
  aria-describedby="email-help"
>
<span id="email-help">We'll never share your email</span>
```

## Heading Structure

Use logical heading hierarchy:

```html
<h1>Page Title</h1>
  <h2>Main Section</h2>
    <h3>Subsection</h3>
    <h3>Another Subsection</h3>
  <h2>Another Main Section</h2>
```

## Live Regions

Announce dynamic content:

```html
<div role="status" aria-live="polite">
  Item added to cart
</div>

<div role="alert" aria-live="assertive">
  Error: Please fill out all required fields
</div>
```

## Testing Tools

Use these tools to test accessibility:

- WAVE Browser Extension
- axe DevTools
- Lighthouse
- Screen readers (NVDA, JAWS, VoiceOver)

## Common Mistakes

Avoid these accessibility issues:

- Missing alt text
- Poor color contrast
- Keyboard traps
- Unclear error messages
- Auto-playing media
- Inaccessible modals

## Implementation Checklist

- [ ] Semantic HTML structure
- [ ] Keyboard navigation support
- [ ] ARIA labels where needed
- [ ] Sufficient color contrast
- [ ] Alternative text for images
- [ ] Form labels and error messages
- [ ] Skip navigation links
- [ ] Focus management

## Conclusion

Accessibility isn't just compliance—it's about creating inclusive experiences. Start implementing these practices today to make the web better for everyone!
