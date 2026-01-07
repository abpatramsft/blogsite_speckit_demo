# Modern CSS Layout: Grid and Flexbox

CSS Grid and Flexbox have revolutionized web layouts. Understanding when and how to use each is key to modern web development.

## CSS Grid: Two-Dimensional Layouts

Perfect for page-level layouts:

```css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

## Flexbox: One-Dimensional Layouts

Ideal for component-level layouts:

```css
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  flex-shrink: 0;
}

.card-body {
  flex-grow: 1;
}

.card-footer {
  flex-shrink: 0;
  margin-top: auto;
}
```

## Auto-Fit vs Auto-Fill

Create responsive grids without media queries:

```css
/* Auto-fit: Collapse empty tracks */
.grid-auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Auto-fill: Keep empty tracks */
.grid-auto-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
```

## Centering Made Easy

Multiple centering techniques:

```css
/* Flexbox centering */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid centering */
.grid-center {
  display: grid;
  place-items: center;
}

/* Single item grid centering */
.grid-single-center {
  display: grid;
  place-content: center;
}
```

## Responsive Navigation

Build flexible navigation menus:

```css
.nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .nav {
    justify-content: space-between;
    align-items: center;
  }
}
```

## Card Grid Layout

Perfect product/blog card layouts:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
```

## Sticky Footer

Keep footer at bottom:

```css
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
```

## Grid Template Areas

Semantic layout naming:

```css
.dashboard {
  display: grid;
  grid-template-areas:
    "title title"
    "sidebar content"
    "sidebar content";
  grid-template-columns: 250px 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-areas:
      "title"
      "content"
      "sidebar";
    grid-template-columns: 1fr;
  }
}
```

## Subgrid

Align nested grids:

```css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.child {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}
```

## Alignment Properties

Fine-tune element positioning:

```css
.container {
  display: grid;
  
  /* Align all items */
  justify-items: start;  /* horizontal */
  align-items: center;   /* vertical */
  
  /* Align content */
  justify-content: space-between;
  align-content: start;
}

.item {
  /* Align individual item */
  justify-self: end;
  align-self: stretch;
}
```

## When to Use What

**Use Grid when:**
- Building page layouts
- Two-dimensional alignment needed
- Overlapping elements required
- Complex responsive patterns

**Use Flexbox when:**
- Building components
- One-dimensional alignment
- Content-based sizing
- Dynamic content wrapping

## Combining Grid and Flexbox

Best of both worlds:

```css
.page {
  /* Grid for overall layout */
  display: grid;
  grid-template-columns: 250px 1fr;
}

.nav {
  /* Flexbox for navigation items */
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}
```

## Conclusion

Master both CSS Grid and Flexbox to create sophisticated, responsive layouts with minimal code. Each has its place in modern web development!
