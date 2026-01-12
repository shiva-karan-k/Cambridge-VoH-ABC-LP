# Design Document

## Overview

This design addresses the bear icon sizing issue on week pages 1-5 by implementing a clean, conflict-free CSS solution that ensures bears are prominently displayed on blue rectangles across all devices.

## Architecture

### Current Problem Analysis
- Multiple conflicting CSS rules for `.bear-sign-asset` class
- CSS specificity issues preventing size changes from taking effect
- Inconsistent sizing across different week pages
- Browser caching potentially preventing updates

### Solution Architecture
1. **CSS Cleanup**: Remove all existing bear sizing rules
2. **Single Source of Truth**: Implement one authoritative CSS rule
3. **Specificity Strategy**: Use high-specificity selectors to ensure rule precedence
4. **Responsive Design**: Implement proper mobile/desktop sizing

## Components and Interfaces

### CSS Class Structure
```css
/* Primary bear sizing rule with high specificity */
.week-1-page .bear-sign-asset,
.week-2-page .bear-sign-asset,
.week-3-page .bear-sign-asset,
.week-4-page .bear-sign-asset,
.week-5-page .bear-sign-asset {
  width: clamp(300px, 40vw, 600px) !important;
  height: auto !important;
}

/* Mobile responsive sizing */
@media (max-width: 768px) {
  .week-1-page .bear-sign-asset,
  .week-2-page .bear-sign-asset,
  .week-3-page .bear-sign-asset,
  .week-4-page .bear-sign-asset,
  .week-5-page .bear-sign-asset {
    width: clamp(200px, 35vw, 400px) !important;
  }
}
```

### HTML Structure Verification
Each week page uses the structure:
```html
<div className="week-X-page">
  <div className="bear-on-blue-block">
    <img src="..." className="bear-sign-asset" />
  </div>
</div>
```

## Data Models

### CSS Rule Priority
1. **Specificity Score**: Class + Class = 020 (higher than single class)
2. **Important Flag**: Ensures override of existing rules
3. **Source Order**: Placed at end of CSS file for maximum precedence

### Size Calculations
- **Desktop**: 300px minimum, 40vw responsive, 600px maximum
- **Mobile**: 200px minimum, 35vw responsive, 400px maximum
- **Scaling Factor**: ~4x original size (80px → 300px minimum)

## Error Handling

### CSS Conflict Resolution
1. Remove all existing `.bear-sign-asset` rules
2. Clear browser cache to ensure new rules load
3. Use developer tools to verify computed styles
4. Test across all week pages to ensure consistency

### Fallback Strategy
If clamp() is not supported:
```css
.bear-sign-asset {
  width: 400px; /* Fallback for older browsers */
}
```

## Testing Strategy

### Manual Testing
1. **Visual Verification**: Check each week page (1-5) for bear visibility
2. **Size Consistency**: Ensure bears are same size across pages
3. **Responsive Testing**: Test on desktop, tablet, and mobile viewports
4. **Browser Testing**: Verify in Chrome, Firefox, Safari

### Automated Testing
- CSS validation to ensure no syntax errors
- Responsive design testing tools
- Cross-browser compatibility checks

### Test Cases
1. **Desktop (1920x1080)**: Bears should be ~400-500px wide
2. **Tablet (768x1024)**: Bears should be ~300-350px wide  
3. **Mobile (375x667)**: Bears should be ~200-250px wide
4. **All Week Pages**: Consistent sizing across pages 1-5

## Implementation Steps

### Phase 1: CSS Cleanup
1. Identify all existing `.bear-sign-asset` rules
2. Remove or comment out conflicting rules
3. Clear any duplicate definitions

### Phase 2: Implementation
1. Add new high-specificity CSS rule
2. Include responsive breakpoints
3. Add fallback for older browsers

### Phase 3: Verification
1. Hard refresh browser to clear cache
2. Test each week page individually
3. Verify bears are prominently displayed
4. Confirm responsive behavior

## Success Metrics

- Bears are visually prominent on all week pages
- Consistent sizing across pages 1-5
- Proper responsive scaling on mobile devices
- No CSS conflicts or console errors
- User can clearly see bears on blue rectangles