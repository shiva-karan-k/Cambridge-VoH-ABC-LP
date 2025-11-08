# ABC Active Breathing Course - Landing Page

A beautiful, interactive landing page for the ABC Active Breathing Course - Big Breathing Adventure, designed for children and parents.

## Features

- **Hero Section**: Welcome message with playful design elements
- **Course Introduction**: Overview of the 12-week free online program
- **Benefits Section**: Highlights benefits for children and parents
- **Sessions Overview**: Six session cards with interactive buttons
- **Enrollment Form**: Email signup for course enrollment
- **Visit Tracking**: Tracks and displays site visitor count
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Run Locally

1. Install dependencies (optional - dev server will auto-install):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

## Project Structure

```
website/
├── assets/
│   ├── images/
│   │   ├── logos/          # Logos (Voices of Hope, Kingston University, ABC Course)
│   │   ├── icons/           # Icons (heart, lightbulb, star, flower, etc.)
│   │   ├── illustrations/  # Bear illustrations, boots, cow, etc.
│   │   ├── benefits/       # Benefit icons
│   │   ├── sessions/       # Session number icons
│   │   └── graphics/       # Text graphics and backgrounds
│   └── videos/             # Video assets
├── styles/
│   └── style.css           # Main stylesheet
├── scripts/
│   └── main.js             # JavaScript for interactions and form handling
├── index.html              # Main landing page
└── README.md               # This file
```

## Adding Assets

Place your image assets in the appropriate folders under `assets/images/`:
- Logos go in `assets/images/logos/`
- Icons go in `assets/images/icons/`
- Illustrations go in `assets/images/illustrations/`
- Benefit icons go in `assets/images/benefits/`
- Session icons go in `assets/images/sessions/`
- Graphics go in `assets/images/graphics/`

See `assets/ASSETS_LIST.md` for a complete list of required assets.

## Features in Detail

### Visit Tracking
- Tracks page visits using localStorage
- Displays visitor count in the footer
- Console logs visit count for debugging

### Enrollment Form
- Email validation
- Form submission handling
- Success feedback
- Ready for API integration (see `scripts/main.js`)

### Interactive Elements
- Smooth scrolling navigation
- Button interactions
- Video player placeholder
- Session exercise buttons

## Customization

### Colors
Edit CSS variables in `styles/style.css`:
```css
:root {
  --color-dark-blue: #1a365d;
  --color-teal: #2dd4bf;
  --color-yellow: #fbbf24;
  --color-pink: #ec4899;
  --color-green: #10b981;
  --color-orange: #f97316;
  /* ... */
}
```

### Form Submission
Update the `submitEnrollment()` function in `scripts/main.js` to connect to your API endpoint.

## Where to Paste Tracking Scripts

Add your GA/Pixel snippet into the `<head>` of `index.html` inside this comment block:
```html
<!-- Tracking Stub: paste GA/Pixel script here when provided -->
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile devices
- Graceful degradation for older browsers

## License

Private project - All rights reserved.
