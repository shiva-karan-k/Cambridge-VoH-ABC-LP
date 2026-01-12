# Requirements Document

## Introduction

The bear icons on week pages 1-5 are not displaying at the correct size despite multiple CSS attempts. This spec will systematically identify and fix the bear sizing issue to match the reference design where bears are prominently displayed on blue rectangles.

## Glossary

- **Bear Icons**: Character images displayed on blue rectangles in week pages 1-5
- **Blue Rectangle**: Colored rectangular element positioned to the left of video thumbnails
- **Week Pages**: Individual pages for weeks 1-6 of the breathing course
- **Reference Design**: The original working design showing properly sized bear icons

## Requirements

### Requirement 1

**User Story:** As a user viewing week pages, I want to see prominently sized bear icons on the blue rectangles, so that the visual design matches the intended layout.

#### Acceptance Criteria

1. WHEN a user visits week page 1, THE System SHALL display a bear icon that is at least 3x larger than the current size
2. WHEN a user visits week pages 2-5, THE System SHALL display bear icons consistently sized across all pages
3. WHEN a user views the page on desktop, THE System SHALL display bears with minimum width of 300px and maximum width of 600px
4. WHEN a user views the page on mobile, THE System SHALL display bears with minimum width of 200px and maximum width of 400px
5. THE System SHALL ensure bear icons are positioned on top of blue rectangles with proper z-index layering

### Requirement 2

**User Story:** As a developer maintaining the CSS, I want a single, authoritative CSS rule for bear sizing, so that future changes are predictable and conflicts are avoided.

#### Acceptance Criteria

1. THE System SHALL have only one CSS rule defining bear icon sizes
2. THE System SHALL remove all conflicting or duplicate bear sizing rules
3. THE System SHALL use CSS specificity to ensure the bear sizing rule takes precedence
4. THE System SHALL include proper mobile responsive sizing
5. THE System SHALL maintain bear positioning on blue rectangles

### Requirement 3

**User Story:** As a user on different devices, I want bear icons to be appropriately sized for my screen, so that the design looks good on both desktop and mobile.

#### Acceptance Criteria

1. WHEN viewing on desktop screens (>768px), THE System SHALL display bears at full size
2. WHEN viewing on tablet screens (768px-480px), THE System SHALL display bears at medium size
3. WHEN viewing on mobile screens (<480px), THE System SHALL display bears at smaller but still prominent size
4. THE System SHALL maintain aspect ratio of bear images across all screen sizes
5. THE System SHALL ensure bears remain visible and prominent on all device sizes