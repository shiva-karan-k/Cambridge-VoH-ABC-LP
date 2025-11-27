# Build Log - ABC Active Breathing Course Landing Page

## Project Overview
Landing page for ABC Active Breathing Course - Big Breathing Adventure, designed for children and parents.

## Typography Rules

### Font Files (Keep Only These)
- `assets/mytype.ttf` - MyType font for headings
- `assets/Skytree one.ttf` / `assets/Skytree one.otf` - Skytree for newsletter title

### Font Usage
- **Hero Title "BECOME A BREATHING HERO"**: Bebas Neue ONLY
- **All Section Titles**: MyType font (from mytype.ttf)
- **All Descriptions**: Lato
- **Newsletter Title**: Skytree
- **Navigation**: Oswald Regular 20px
- **Buttons**: Lato Bold

### Font Implementation
```css
@font-face {
  font-family: 'MyType';
  src: url('../assets/mytype.ttf') format('truetype');
}

@font-face {
  font-family: 'Skytree';
  src: url('../assets/Skytree one.ttf') format('truetype'),
       url('../assets/Skytree one.otf') format('opentype');
}
```

**CRITICAL**: Never use Courier Prime or generic Courier fonts. Always use MyType for typewriter-style headings.

## Key Implementation Notes

### Navbar
- ABC logo should match Kingston logo size
- Minimal padding top/bottom for lean appearance
- No clip-path on ABC logo (removed whitespace from image)

### Hero Section
- BBA logo, title, and button left-aligned
- Bear on right side, 2x size with floating animation
- Background fills 100vh

### Section 2 (Introduction)
- BBA logo beside title
- Title uses Bebas Neue (MyType corrupted in this section)
- Description uses Bebas Neue
- Video player with rounded corners (12px border-radius)
- No white padding around video thumbnail

### Section 3 (Benefits)
- Benefit images: 720px width/height (doubled)
- No titles on benefit items (titles in images)
- Descriptions: Lato, 18px
- 4-column grid on desktop

### Section 4 (Sessions)
- Week images: w1.png through w6.png
- Button colors match week icon backgrounds:
  - Week 1: #345AA6 (Dark Blue)
  - Week 2: #5EBFC0 (Teal)
  - Week 3: #ED6C9B (Pink)
  - Week 4: #D1D645 (Yellow-Green)
  - Week 5: #FAB314 (Orange)
  - Week 6: #EBD3AD (Beige)
- Cards 0.2x bigger with reduced spacing

### Footer Section 1 (Teal)
- Left: "Every Breath Counts" image + tagline
- Right: Bullet points + ENROLL NOW button
- Content centered vertically
- Left block 1.5x larger with left padding

### Footer Section 2 (Dark Gray #3C3B34)
- Newsletter signup form
- Social media icons from assets (Listitem → Link.png, etc.)
- Contact info, charity registration
- Copyright and privacy policy

## Asset Locations

### Logos
- Voices of Hope: `assets/images/VoH logo.png`
- Kingston University: `assets/images/KoL logo.png`
- ABC Logo: `assets/images/ABC Logo 1.png`
- BBA Logo: `assets/images/BBA LOGO 1.png`

### Social Media Icons
- Facebook: `assets/images/Listitem → Link.png`
- Twitter: `assets/images/Listitem → Link-1.png`
- Instagram: `assets/images/Listitem → Link-2.png`
- YouTube: `assets/images/Listitem → Link-3.png`

### Week Icons
- Week 1-6: `assets/images/w1.png` through `w6.png`

## Development

### Run Locally
```bash
npm run dev
```
Server runs on `http://localhost:5173`

### Build Notes
- All fonts must be properly loaded via @font-face
- Responsive breakpoints: 768px, 480px
- Use clamp() for fluid typography
- Maintain consistent spacing and alignment

## Common Issues Fixed
1. Font loading - Use proper @font-face declarations
2. Video padding - Removed white background/padding
3. Benefit images - Doubled size to 720px
4. Footer layout - Proper grid alignment
5. ABC logo - Removed clip-path, matched Kingston size

