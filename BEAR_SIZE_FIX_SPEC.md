# Bear Size Fix Specification

## Problem Statement
The bear icons on week pages 1-5 are not large enough compared to the reference images. They need to be significantly larger and more prominent.

## Current State Analysis
- Bears are positioned correctly ON the blue rectangles
- Bears are using class `bear-sign-asset` 
- Current size: `clamp(240px, 30vw, 450px)` with `!important`
- Bears appear too small in browser

## Target State
- Bears should be 3x larger than original working size
- Original working size was: `clamp(80px, 10vw, 150px)`
- Target size should be: `clamp(240px, 30vw, 450px)` (already set)
- Bears should be visually prominent and match reference images

## Investigation Steps
1. Check if CSS is actually being applied
2. Verify no conflicting styles are overriding
3. Test with even larger sizes if needed
4. Ensure all week pages use the same class

## Implementation Plan
1. Inspect current CSS rules for conflicts
2. Increase bear size to 4x or 5x if 3x isn't enough
3. Test on all week pages (1-5)
4. Verify bears are visible and prominent

## Success Criteria
- Bears are visually prominent on blue rectangles
- Bears match the size shown in reference images
- All week pages (1-5) show consistently sized bears