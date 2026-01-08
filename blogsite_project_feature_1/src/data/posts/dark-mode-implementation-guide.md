# Implementing Dark Mode: A Practical Guide

Dark mode has become a must-have feature for modern websites. Let's implement it using CSS custom properties and JavaScript, with proper accessibility considerations.

## Why Dark Mode?

Benefits:

- Reduces eye strain in low-light environments
- Saves battery on OLED screens
- Improves accessibility for light-sensitive users
- Modern, expected feature

## CSS Custom Properties

Define color schemes:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --border-color: #404040;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
```

## System Preference Detection

Respect user's OS settings:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
  }
}
```

```javascript
// Detect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

if (prefersDark.matches) {
  document.documentElement.setAttribute('data-theme', 'dark')
}
```

## Toggle Implementation

Build a theme switcher:

```html
<button id="theme-toggle" aria-label="Toggle dark mode">
  <span class="light-icon">☀️</span>
  <span class="dark-icon">🌙</span>
</button>
```

```javascript
const themeToggle = document.getElementById('theme-toggle')
const htmlElement = document.documentElement

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  
  htmlElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
})
```

## Persistence

Remember user preference:

```javascript
// Load saved theme on page load
function loadTheme() {
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
  document.documentElement.setAttribute('data-theme', theme)
}

// Call immediately to prevent flash
loadTheme()
```

## Preventing Flash

Avoid flash of incorrect theme:

```html
<script>
  // Inline script in <head> before styles load
  (function() {
    const theme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', theme)
  })()
</script>
```

## Color Considerations

Design effective dark mode colors:

```css
:root {
  /* Don't use pure black/white */
  --dark-bg: #1a1a1a;     /* Better than #000000 */
  --dark-text: #e4e4e4;   /* Better than #ffffff */
  
  /* Adjust colors for dark mode */
  --primary-light: #3b82f6;
  --primary-dark: #60a5fa;  /* Lighter in dark mode */
}
```

Tips:
- Increase contrast in dark mode
- Desaturate colors slightly
- Avoid pure black (#000)
- Test with real content

## Image Handling

Adapt images for dark mode:

```css
[data-theme="dark"] img {
  opacity: 0.8;
}

[data-theme="dark"] img.logo {
  filter: invert(1);
}
```

```html
<picture>
  <source srcset="logo-dark.png" media="(prefers-color-scheme: dark)">
  <img src="logo-light.png" alt="Logo">
</picture>
```

## Syntax Highlighting

Theme-aware code blocks:

```css
[data-theme="light"] .code-block {
  background: #f5f5f5;
  color: #1a1a1a;
}

[data-theme="dark"] .code-block {
  background: #2d2d2d;
  color: #e4e4e4;
}
```

## Smooth Transitions

Add subtle theme transitions:

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Disable transitions during page load */
body.no-transitions * {
  transition: none !important;
}
```

```javascript
// Remove no-transitions class after load
window.addEventListener('load', () => {
  document.body.classList.remove('no-transitions')
})
```

## Accessibility

Make dark mode accessible:

```html
<button
  id="theme-toggle"
  aria-label="Toggle dark mode"
  aria-pressed="false"
>
  Toggle Theme
</button>
```

```javascript
themeToggle.addEventListener('click', () => {
  const isDark = htmlElement.getAttribute('data-theme') === 'dark'
  themeToggle.setAttribute('aria-pressed', isDark)
})
```

## React Implementation

Using React and Context:

```javascript
// ThemeContext.js
const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

## Testing Checklist

Verify dark mode:

- [ ] Colors have sufficient contrast
- [ ] Images adapt appropriately
- [ ] No flash on page load
- [ ] Preference persists
- [ ] System preference respected
- [ ] Smooth transitions
- [ ] Accessible toggle button
- [ ] Works across all pages

## Common Pitfalls

Avoid these mistakes:

- Pure black backgrounds
- Insufficient contrast
- Forgetting image adjustments
- No transition smoothing
- Flash of wrong theme
- Missing accessibility labels

## Conclusion

Dark mode enhances user experience and accessibility. Implement it thoughtfully with proper color choices, smooth transitions, and respect for user preferences!
