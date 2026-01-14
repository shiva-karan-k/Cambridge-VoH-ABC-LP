# Video Lock & Thumbnail Fix Tasks

## Task 1: Remove Orbital Layers from CSS
- [x] Remove `.layer-58` CSS block
- [x] Remove `.layer-59` CSS block  
- [x] Remove `.layer-58, .layer-59` responsive rules
- [x] Verify no other references to these layers

## Task 2: Fix Lock Icon CSS
- [x] Remove circular white background from lock overlay
- [x] Update lock icon to use `/assets/images/lock icon.png`
- [x] Remove inline lock overlay styles from all week pages
- [x] Keep only lock-message in inline styles

## Task 3: Update Week 1
- [x] Add week1Unlocked state (always true for first week)
- [x] Keep Video 1 always unlocked (no lock overlay)
- [x] Video 2 locks until Video 1 completes
- [x] Clean up inline styles

## Task 4: Update Week 2
- [x] Video 1 with proper lock overlay
- [x] Video 2 reverted to img tag (placeholder)
- [x] Clean up inline styles

## Task 5: Update Week 3
- [x] Both videos use CSS lock icon (no inline SVG)
- [x] Clean up inline styles

## Task 6: Update Week 4
- [x] Video 1 with proper lock overlay
- [x] Video 2 reverted to img tag (placeholder)
- [x] Clean up inline styles

## Task 7: Verify Other Weeks
- [x] Week 5 already correct
- [x] Week 6 already correct

## Task 8: Final Testing
- [x] Build project: `npm run build` ✅
- [ ] Test Week 1 - Video 1 unlocked, Video 2 locked
- [ ] Test Week 2 - Both videos show correctly
- [ ] Test lock icons appear ON video (not floating)
- [ ] Verify no circular overlays
- [ ] Test reset demo functionality
- [ ] Commit and push changes
