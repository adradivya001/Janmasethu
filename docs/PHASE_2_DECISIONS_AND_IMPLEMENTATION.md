# Phase 2: Decisions & Implementation — JanmaSethu Landing Page Enhancement
**Author:** Jatin  
**Period:** February 10 – February 20, 2026  
**Focus:** Technical Architecture, Component Design, and Engineering Challenges

---

## 1. Core Technical Decisions

### 1.1 State Management: `JourneyContext`
**Decision:** Use React Context API + Local Storage for global state management instead of Redux or Zustand.
**Reasoning:**
*   **Simplicity:** The state requirement is flat and simple (`stage`, `date`, `lastUpdated`). A full state library would be overkill.
*   **Persistence:** We need the user's journey stage (TTC, Pregnant, Parent) to persist across sessions even for guest users.
*   **Sync:** The context handles the logic of syncing to Local Storage *immediately* and to the Backend *asynchronously* (if logged in).

**Implementation:**
*   `JourneyContext.tsx` wraps the entire application.
*   It exposes a `useJourney()` hook that any component (Header, Dashboard, Articles) can consume.
*   It includes a built-in timer to prompt users to select a journey if they haven't done so after 60 seconds.

### 1.2 Animation Engine: `framer-motion`
**Decision:** Standardize on `framer-motion` for all high-fidelity interactions.
**Reasoning:**
*   **Declarative Syntax:** much easier to maintain than imperative JS animations or complex CSS keyframes for layout changes.
*   **Layout Animations:** The `layout` prop is crucial for the "Dynamic Reordering" feature. When the homepage sections shuffle order, `framer-motion` automatically animates the position changes.
*   **Performance:** It handles `transform` and `opacity` changes efficiently, which is critical for the `CinematicHero` scroll effects.

### 1.3 Hero Architecture: HTML5 Canvas vs. Video
**Decision:** Use an HTML5 Canvas sequence (Apple-style scrollytelling) instead of a video file.
**Reasoning:**
*   **Scroll Control:** We needed frame-accurate control tied to the scrollbar. Videos are notoriously laggy when scrubbed via JS.
*   **Performance:** Painting pre-loaded images to a canvas is less CPU-intensive than decoding a video stream in real-time while scrolling.
*   **Mobile Support:** Canvas works reliably on iOS (no "play" button issues).

---

## 2. Key Implementation Details

### 2.1 The "Journey-Aware" Homepage (`Home.tsx`)
This was the most complex logic refactor. The page is no longer a static list of components.

**Logic:**
```typescript
// Simplified logic from Home.tsx
{journey?.stage === 'TTC' ? (
  <>
    <TreatmentsPreview />  // Priority 1 for TTC
    <SakhiPreview />       // Priority 2
    <KnowledgePreview />   // Priority 3
  </>
) : journey?.stage === 'PARENT' ? (
  <>
    <KnowledgePreview />   // Priority 1 for Parents
    <SakhiPreview />
    <TreatmentsPreview />
  </>
) : (
  // Default for Pregnant
  <>
    <SakhiPreview />
    <KnowledgePreview />
    <TreatmentsPreview />
  </>
)}
```
*   **Result:** The page physically restructures itself to match the user's priority.

### 2.2 The Smart Dashboard (`JourneyDashboard.tsx`)
Instead of static text, this component performs real-time date math:
*   **Pregnancy:** Calculates `(CurrentDate - LMP) / 7` to get the current Week.
*   **Baby Size:** Maps the calculated week to a fruit/object map (e.g., Week 12 = Lime).
*   **Parenting:** Calculates `(CurrentDate - BirthDate)` to show age in Months/Years.
*   **TTC:** Shows a "Fertile Window" prompt.

### 2.3 The `AnimatedButton` Component
To achieve the "premium" feel, we built a micro-interaction button.
*   **Structure:** A container with `overflow: hidden`.
*   **Hover State:** An internal `<span>` (white circle) scales up from 0% to 200% width, filling the button.
*   **Text Inversion:** The text color transitions from White → Gradient (background-clip) or White → Dark Text depending on the variant.
*   **Icon Stability:** The arrow icon translates slightly X-axis but stays visible.
*   **Responsive:** Used `em` units so it scales automatically when used in `text-xs` (Header) or `text-lg` (Hero).

---

## 3. Challenges & Solutions

### 3.1 challenge: The "Sticky Nav Overlap" Warning
**Problem:** The new "Popular Tools" section (white cards) was scrolling *over* the sticky header because of z-index conflicts.
**Solution:**
*   Audited the entire z-index stack.
*   **Header:** `z-[60]` (Highest)
*   **Modals:** `z-[100]`
*   **Mobile Menu:** `z-[50]`
*   **Page Content:** `z-[10]` or default.
*   **Fix:** Specifically constrained the logo container's height to prevent it from creating an invisible "click shield" over the secondary nav.

### 3.2 Challenge: Widget Edge Snapping
**Problem:** Floating widgets (Journey, WhatsApp) would obscure content or get stuck in the middle of the screen.
**Solution:**
*   Built a custom hook `useSnapToEdge`.
*   Uses `panEnd` event from framer-motion.
*   Calculates the center of the screen `window.innerWidth / 2`.
*   If `x < center`, animate `x` to `0` (Left edge).
*   If `x > center`, animate `x` to `window.innerWidth - widgetWidth` (Right edge).

### 3.3 Challenge: Matching the "Purple-to-Pink" Gradient
**Problem:** Standard CSS gradients looked flat. The design required a specific "JanmaSethu Glow."
**Solution:**
*   Standardized the gradient token: `bg-gradient-to-r from-purple-500 to-pink-500` (Tailwind).
*   Applied it consistently to:
    *   Primary Buttons
    *   Text Highlights (`bg-clip-text text-transparent`)
    *   Progress Bars
    *   Active Navigation Pills

---

## 4. Refactoring: From Static to Dynamic across 8 Days

### 4.1 The Navigation Overhaul
*   **Old Way:** Hardcoded links in `Header.tsx`.
*   **New Way:** A `navConfig` array object. This allowed us to reorder the links globally (Desktop + Mobile) by changing just one array order.
    *   *Result:* Moved "Sakhi" and "Tools" to higher prominence based on the conversion audit.

### 4.2 The "AuthModal" Pivot
*   **Initial Design:** Standard Tabs (Login | Signup).
*   **Problem:** Felt bureaucratic and stiff.
*   **Refactor:** Moved to a "Single Card" toggle layout.
    *   "Welcome Back" (Login state)
    *   *Click "New here?"* → Flips to "Start Your Journey" (Signup state)
    *   This reduced visual clutter and made the modal feel 50% lighter.

---

## 5. Next Steps (Technical Debt)

1.  **Image Optimization:** The Canvas sequence currently loads 60 images. We need to implement verify efficient caching or sprite sheets to reduce HTTP requests.
2.  **Test Coverage:** Complex logic in `JourneyDashboard` (date math) needs unit tests (Jest/Vitest).
3.  **Performance:** The dynamic reordering causes a layout shift (CLS) on the very first load before hydration. We need to implement a skeleton loader that matches the *default* (Pregnant) state to minimize visual jumping.

---

*Document generated: February 20, 2026*
