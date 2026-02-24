# Features & Changes Log: Janmasethu Landing Page
**Period:** February 10, 2026 - Present

## 📌 Summary
This document tracks all features, enhancements, and bug fixes deployed to the Janmasethu frontend. It is maintained to track progress starting from Feb 10, 2026.

---

## 📅 February 23, 2026 (Today)
**Focus:** Mobile Layouts, Typography, and Localization UX

### 1. Mobile Header & Nav Optimization
*   **Menu Shrink:** Scaled down the hamburger menu toggle in `MenuSwitch.tsx` to reduce header clutter on small screens.
*   **Element Sizing:** Shrank the padding, font size, and container heights for language toggles and auth buttons (Login/Sign up) in `Header.tsx`.
*   **Alignment:** Reorganized layouts for tighter, cleaner alignments to maximize viewport space.

### 2. Sticky Footer Reveal
*   **Dynamic Height:** Modified `Layout.tsx` and `Footer.tsx` to use a `ResizeObserver` for dynamic footer height calculation.
*   **Behavior:** The footer is now fixed at the bottom, and the main page content receives a dynamic `marginBottom` to create a smooth "reveal" effect.
*   **Background Harmony:** Adjusted background colors and padding to ensure no overlaps and a flush sit.

### 3. Typography Upgrade: 'Aligin' Font
*   **Integration:** Registered the new 'Aligin' font in Tailwind (`tailwind.config.ts`) and applied it natively to the `CinematicHero` component for dramatic, cinematic headers.
*   **Fallback Strategy:** Included "Playfair Display" via Google Fonts in `index.html` as an elegant serif fallback.

### 4. Hero Section & Widget Overlap Fix (Mobile)
*   **Hero Text Adjustment:** Adjusted the layout of the mobile text container in `CinematicHero.tsx` so the "Meet Sakhi" and "Register Now" CTAs are pushed down gracefully without overlapping the text.
*   **Floating Widgets Position:** Added an `isMobile` screen resize listener to `JourneyFloatingWidget.tsx`. Modified the widget offset from `28%` top to `46%` top strictly on mobile screens to completely clear the hero section's CTA buttons.

### 5. Multi-Lingual Typography Fix (Telugu & Hindi)
*   **Issue:** English CSS sizing and hardcoded line breaks (`<br/>`) generated massive text blocks that overflowed the UI when translated to Telugu or Hindi.
*   **Fix:** Added conditional logic comparing the active `lang`. Dynamically reduced hero font sizes (`text-7xl` -> `text-5xl`) and disabled hardcoded line breaks for non-English languages in `CinematicHero.tsx`.

---

## 📅 February 20, 2026
**Focus:** Documentation & Project Health

### 1. Landing Page Log Update
*   **Task:** Consolidated all work from Feb 17–19 into this changelog.
*   **Entries Added:** ~20 new line items covering Widgets, Navigation, Animations, and UX polish.

---

## 📅 February 19, 2026
**Focus:** Floating Widget Micro-Animations

### 1. Widget Hover Animation Overhaul
*   **Removed:** Previous scale-and-slide hover effect (felt too generic).
*   **New Animation:** Implemented a playful **"Wobble, Float & Glow"** keyframe animation on the inner pill element of each floating widget.
    *   **Wobble:** Subtle `rotate()` oscillation on hover.
    *   **Float:** Gentle `translateY()` bounce to give a "levitating" feel.
    *   **Glow:** Animated `box-shadow` pulse in brand gradient colors.
*   **Compatibility:** Verified no conflicts with existing drag-to-snap and expand/collapse functionality on `JourneyFloatingWidget`, `FloatingWhatsApp`, and `FloatingContact`.

---

## 📅 February 18, 2026
**Focus:** Navigation Architecture & Visibility Fixes

### 1. Header Navigation Reorder
*   **Change:** Reordered the navigation links in `Header.tsx` to the new sequence:
    Home → Knowledge Hub → Sakhi → Tools → Treatments → Success Stories → Blog → Experts → Investors.
*   **Impact:** Updated both the desktop secondary nav bar and `MobileMenu` drawer to reflect the new order.

### 2. Sticky Nav Bar Visibility Fix
*   **Bug:** The primary sticky navigation bar (`z-[60]`) was being overlapped by certain page content sections (e.g., "Popular Tools" cards).
*   **Fix:** Audited and corrected `z-index` layering across the header and page sections.
*   **Result:** The main nav bar is now always visible and stays on top during scrolling. Non-sticky elements (like the secondary nav) scroll away as expected.

---

## 📅 February 17, 2026
**Focus:** High-Fidelity Interactive Elements, User Onboarding Flow & Widget UX

### 1. Floating Widget Edge Snapping & Display
*   **Feature:** Implemented snap-to-edge behavior for all floating widgets (Journey, WhatsApp, Contact).
*   **Fix:** Widgets can no longer get stuck in the middle of the screen after dragging — they auto-snap to the nearest left/right edge.
*   **Expanded View Fix:** Resolved issues where the expanded widget panel was clipped or cut off near screen edges (bottom and left).
*   **Smart Positioning:** Panel now dynamically repositions to ensure full content visibility regardless of where the widget is docked.

### 2. New "AnimatedButton" Component
*   **Feature:** Created a reusable `AnimatedButton.tsx` component.
*   **Interaction:** Button starts as a gradient pill; on hover, an internal white circle expands to fill the button.
*   **Text Effect:** Text dynamically vanishes (`opacity: 0`) on hover to reduce visual clutter.
*   **Icon Animation:** Arrow icon remains centered and visible throughout the transition.
*   **Minimal Mode:** Optimized clear styling that leaves just a thin pink border (`~2px`) on hover.
*   **Responsive Sizing:** Implemented `em`-based sizing support for `text-xs`, `text-sm`, etc.

### 3. Header & Navigation Refinement
*   **Change:** Replaced the standard "Sign Up" button with the new **AnimatedButton**.
*   **Optimization:** Forced "Sign Up" button to `text-xs` and `h-9` for a hyper-minimal footprint in the navbar.
*   **Style Update:** Updated Navbar font to **'Nohemi'** (Weights 400/500) for a lighter, premium feel.
*   **Layout Fix:** Constrained Logo container height to fully resolve clicking issues on secondary nav items.
*   **Scroll Logic:** Corrected `z-index` layering so the secondary nav scrolls *behind* the sticky header.
*   **Visuals:** Removed heavy bottom borders from the secondary nav.

### 4. Authentication Experience (AuthModal)
*   **Redesign:** Completely rebuilt `AuthModal.tsx` to move away from standard Tabs.
*   **UI Pattern:** Implemented a **"Single Card"** flow where "Login" and "Sign Up" toggle within the same view.
*   **Micro-Copy:** Updated headers to "Welcome Back" (Login) vs "Start Your Journey" (Register).
*   **Styling:**
    *   Removed all default dialog shadows and backgrounds for a cleaner look.
    *   Added a custom-positioned **Close (X)** button inside the form card.
    *   Styled submit buttons with the brand's signature Purple-to-Pink linear gradient.

### 5. Landing Page Core Actions
*   **Hero Section:** Replaced static hero with **Cinematic Scrollytelling** experience.
*   **Sakhi Preview:** Updated "Try Sakhi Now" CTA to use `AnimatedButton`.
*   **Knowledge Hub:** Updated "Browse Articles" CTA to use `AnimatedButton` (preserving the Book icon).

### 6. Cinematic Hero Section (New)
*   **Concept:** Implemented an "Apple-style" split-screen scrollytelling hero.
*   **Visuals:**
    *   **Left Column:** Sticky Canvas playing a 60-frame image sequence of a mother and swaying leaves.
    *   **Right Column:** Scroll-linked narrative text that transitions through 3 phases ("The Hook", "The Empathy", "The Resolution").
*   **Tech Stack:** Used `framer-motion` for scroll tracking (`useScroll`, `useTransform`, `useSpring`) and HTML5 Canvas for high-performance image sequencing.
*   **Aesthetic:** "JanmaSethu Serenity" palette (Soft Peach background, Deep Charcoal text).

---

## 📅 February 10 - February 16, 2026
**Focus:** Core Structure, Navigation, and Content Optimization

### Header & Navigation
1.  **Logo Visibility:** Significantly increased the main logo size for better brand recall.
2.  **Logo Positioning:** Implemented absolute centering for the logo in the desktop view.
3.  **Logo Sizing:** Further enlarged the logo for maximum prominence while keeping the nav bar dimensions intact.
4.  **Clinic Links:** Restored "For Clinics" link in the header and "Clinic Portal" in the footer, pointing to the external portal (`http://72.61.228.9:4500`).
5.  **Scroll Fixes:** Resolved behavior where secondary nav would disappear incorrectly.
6.  **Z-Index Architecture:** Fixed layering issues between sticky headers and body content.
7.  **Mobile Menu:** Smoothed out the transition animations for the mobile drawer.

### Visual Polish & Animations
8.  **Page Transitions:** Implemented a "Corner Sweep" (bottom-right to top-left) transition effect for language changes.
9.  **Gradient Sync:** Aligned the transition animation gradients with the core brand color palette.
10. **Font Standardization:** Enforced 'Nohemi' font usage across all navigation tiers.
11. **Weight Reduction:** Standardized on lighter font weights (400/500) for a modern look.
12. **Hero Optimization:** Reduced friction in the user journey from Hero → CTA.

### Article & Content Pages
13. **Design System:** Launched a "Premium" layout for long-form article content.
14. **Typography:** Overhauled H1-H6 and paragraph styling for readability.
15. **Sticky Nav:** Added content-specific sticky navigation bars for deep reading.
16. **Metadata:** Enhanced the display of Author, Date, and Reading Time.
17. **Language Toggle:** Redesigned the article-page language toggle to match the Knowledge Hub style.
18. **Line Height:** Optimized leading and tracking for better accessibility.
19. **Rich Text:** Fixed CSS for rendering HTML tables and lists within articles.

### Tools & Infrastructure
20. **Planning:** Generated "System Design Tasks - Week 1" documentation.
21. **Navigation:** Created a dedicated "Tools" menu item in the main nav.
22. **API Integration:** Fixed `SyntaxError` issues with Tool APIs (Vaccination Scheduler, Ovulation Calculator).
23. **Module Resolution:** Fixed logical path errors in `App.tsx` imports (Home, ConceptionCalculator).
24. **Layout Fix:** Corrected spacing/newline issues in the Vaccination Scheduler tool.
25. **Layout Fix:** Fixed alignment of the calendar component in the scheduler.
26. **Success Stories:** Resolved rendering errors on the `SuccessStories.tsx` page.
27. **Baby Cost Calculator:** Implemented backend logic with India-specific cost assumptions; frontend displays default costs in custom input fields.
28. **Journey Personalization:** Full journey management — select, modify, and remove personalization; dashboard, reordering, and deep-linking all tied to journey stage.

---

**Total Features/Changes Tracked (Feb 10 - Present): ~70+**
*Last updated: February 23, 2026*
*This document will be updated with every new feature or significant change.*
