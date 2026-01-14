# Video Lock & Thumbnail Fix Requirements - CORRECTED

## Problem Statement
- Week 1 Video 1 should start locked when demo is reset
- Circular overlay with lock is floating outside video blocks
- Need simple blur + lock icon directly on video embed
- Week 2 & Week 4 second videos should keep original thumbnail images
- No orbital/floating decorative elements

## Requirements

### 1. Lock Overlay Structure
- Lock overlay should be INSIDE video block, not floating
- Use actual lock icon image: `/assets/images/lock icon.png`
- No circular background - just the lock icon centered on blurred video
- Blur effect: `blur(4px) brightness(0.5)` on locked videos

### 2. Week 1 Special Case
- Video 1 should start locked (check if week unlocked from previous week)
- Only unlock Video 1 when user starts from fresh/Week 1 is unlocked
- Video 2 unlocks after Video 1 completion

### 3. Week 2 & Week 4 Second Videos
- Keep original `<img>` thumbnail (not video element)
- These videos don't exist yet, so show placeholder image
- Still show lock icon + blur on the image

### 4. CSS Lock Icon
- Remove circular white background
- Just show lock icon image directly
- Position: centered on video
- Size: reasonable (not too big)

## Files to Update
- src/app/weeks/week-1/page.tsx (add initial lock to video 1)
- src/app/weeks/week-2/page.tsx (revert video 2 to img)
- src/app/weeks/week-4/page.tsx (revert video 2 to img)
- src/app/original-styles.css (fix lock-icon styling)

## Success Criteria
- ✅ Week 1 Video 1 starts locked on reset
- ✅ Lock icon appears ON video, not floating
- ✅ Week 2 & 4 second videos use img tags
- ✅ No circular overlays or orbital elements
- ✅ Clean, simple lock icon on blur
