# Features & Changes Log: Janmasethu Landing Page
**Period:** February 10, 2026 - Present

## 📌 Summary
This document tracks all features, enhancements, and bug fixes deployed to the Janmasethu frontend. It is maintained to track progress starting from Feb 10, 2026.

---

## 📅 February 17, 2026 (Today)
**Focus:** High-Fidelity Interactive Elements & User Onboarding Flow

### 1. New "AnimatedButton" Component
*   **Feature:** Created a reusable `AnimatedButton.tsx` component.
*   **Interaction:** Button starts as a gradient pill; on hover, an internal white circle expands to fill the button.
*   **Text Effect:** Text dynamically vanishes (`opacity: 0`) on hover to reduce visual clutter.
*   **Icon Animation:** Arrow icon remains centered and visible throughout the transition.
*   **Minimal Mode:** Optimized clear styling that leaves just a thin pink border (`~2px`) on hover.
*   **Responsive Sizing:** Implemented `em`-based sizing support for `text-xs`, `text-sm`, etc.

### 2. Header & Navigation Refinement
*   **Change:** Replaced the standard "Sign Up" button with the new **AnimatedButton**.
*   **Optimization:** Forced "Sign Up" button to `text-xs` and `h-9` for a hyper-minimal footprint in the navbar.
*   **Style Update:** Updated Navbar font to **'Nohemi'** (Weights 400/500) for a lighter, premium feel.
*   **Layout Fix:** Constrained Logo container height to fully resolve clicking issues on secondary nav items.
*   **Scroll Logic:** Corrected `z-index` layering so the secondary nav scrolls *behind* the sticky header.
*   **Visuals:** Removed heavy bottom borders from the secondary nav.

### 3. Authentication Experience (AuthModal)
*   **Redesign:** Completely rebuilt `AuthModal.tsx` to move away from standard Tabs.
*   **UI Pattern:** Implemented a **"Single Card"** flow where "Login" and "Sign Up" toggle within the same view.
*   **Micro-Copy:** Updated headers to "Welcome Back" (Login) vs "Start Your Journey" (Register).
*   **Styling:**
    *   Removed all default dialog shadows and backgrounds for a cleaner look.
    *   Added a custom-positioned **Close (X)** button inside the form card.
    *   Styled submit buttons with the brand's signature Purple-to-Pink linear gradient.

### 4. Landing Page Core Actions
*   **Hero Section:** Replaced static hero with **Cinematic Scrollytelling** experience.
*   **Sakhi Preview:** Updated "Try Sakhi Now" CTA to use `AnimatedButton`.
*   **Knowledge Hub:** Updated "Browse Articles" CTA to use `AnimatedButton` (preserving the Book icon).

### 5. Cinematic Hero Section (New)
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
2.  **Logo Positioning:** implemented absolute centering for the logo in the desktop view.
3.  **Clinic Links:** Restored "For Clinics" link in the header for provider access.
4.  **Footer Update:** Added "Clinic Portal" link to the site footer.
5.  **Scroll Fixes:** Resolved behavior where secondary nav would disappear incorrectly.
6.  **Z-Index Architecture:** Fixed layering issues between sticky headers and body content.
7.  **Mobile Menu:** Smoothed out the transition animations for the mobile drawer.

### Visual Polish & Animations
8.  **Page Transitions:** Implemented a "Corner Sweep" (bottom-right to top-left) transition effect.
9.  **Gradient Sync:** Aligned animation gradients with the core brand color palette.
10. **Font Standardization:** Enforced 'Nohemi' font usage across all navigation tiers.
11. **Weight Reduction:** Standardized on lighter font weights (400/500) for a modern look.
12. **Hero Optimization:** Reduced friction in the user journey from Hero -> CTA.

### Article & Content Pages
13. **Design System:** Launched a "Premium" layout for long-form article content.
14. **Typography:** Overhauled H1-H6 and paragraph styling for readability.
15. **Sticky Nav:** Added content-specific sticky navigation bars for deep reading.
16. **Metadata:** Enhanced the display of Author, Date, and Reading Time.
17. **Line Height:** Optimized leading and tracking for better accessibility.
18. **Rich Text:** Fixed CSS for rendering HTML tables and lists within articles.

### Tools & Infrastructure
19. **Planning:** Generated "System Design Tasks - Week 1" documentation.
20. **Navigation:** Created a dedicated "Tools" menu item in the main nav.
21. **API Integration:** Fixed `SyntaxError` issues with Tool APIs.
22. **Module Resolution:** Fixed logical path errors in `App.tsx` imports.
23. **Layout Fix:** Corrected spacing/newline issues in the Vaccination Scheduler tool.
24. **Layout Fix:** Fixed alignment of the calendar component in the scheduler.
25. **Success Stories:** Resolved rendering errors on the `SuccessStories.tsx` page.

---

**Total Features/Changes Tracked (Feb 10 - Present): ~45**
*This document will be updated with every new feature or significant change.*
