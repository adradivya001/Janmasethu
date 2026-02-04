# Frontend Changes: JanmaSethu Renovation

## Phase 0 & 1: User Journey Foundation (Completed)
- **Core Logic**: Added `JourneyContext` and types.
- **Components**: `JourneySelector` (modal) and `JourneyStickyHeader`.
- **Integration**: Wrapped App in Provider, added global selector.

## Phase 2: Homepage Dynamic Reordering (Completed)
We have transformed the Homepage into a **Smart Dashboard** that adapts to the user's journey stage.

### 1. New Components
- **`client/src/components/home/JourneyDashboard.tsx`**:
  - **Purpose**: "Show First" component designed to give immediate value.
  - **Logic**:
    - **Pregnant**: Displays calculated "Week X" (based on due date), Trimester, and Baby Size (e.g., "Blueberry").
    - **Parent**: Displays Baby's Age (e.g., "2 Months") and next milestone (e.g., "Vaccination Due").
    - **TTC**: Displays "Journey Status" and entry point to fertile window tools.
- **`client/src/components/home/JourneyTimeline.tsx`**:
  - **Purpose**: Refactored the massive 5-stage timeline from `Home.tsx` into a clean, standalone component.
  - **Usage**: Now placed at the bottom of the page as a visual roadmap reference.

### 2. Homepage Refactor (`Home.tsx`)
- **Dynamic Reordering**: The page now conditionally renders sections based on `journey.stage`:
  - **TTC Users**:
    1. Treatments (IVF/IUI) - *Primary Interest*
    2. Sakhi (Support)
    3. Knowledge Hub
  - **Pregnant Users**:
    1. Sakhi (Immediate doubt resolution)
    2. Knowledge Hub (Week-by-week guides)
    3. Treatments (Lower priority)
  - **Parent Users**:
    1. Knowledge Hub (Care guides)
    2. Sakhi
    3. Treatments
- **Layout**:
  - **Top**: Hero -> Journey Dashboard (New) -> Trust Signals.
  - **Bottom**: Journey Timeline (Moved down as "Reference").

### 3. Testing
1. Use the **Journey Selector** (Sticky Header) to change your stage.
2. **Observe**:
   - The **Dashboard** card updates immediately (e.g., Week count vs Baby Age).
   - The **Section Order** on the homepage shuffles to prioritize relevant content.

---

## Phase 3: Smart Knowledge Hub (Completed)
We have personalized the Knowledge Hub to serve relevant content based on the user's stage.

### 1. Smart Filtering (`Knowledge.tsx`)
- **Auto-Personalization**: On load, the page checks `journey.stage` (from context) and automatically selects the corresponding **Stage Filter** (e.g., "Pregnancy" filter for Pregnant users).
- **Recommended Section**: A new "Recommended for You" strip appears at the top, showing 3 curated articles relevant to the specific stage (e.g., "First Trimester Scan" for Pregnancy).
- **Deep Linking**: The page now accepts URL parameters (`?stage=ttc&search=folic`) to allow other parts of the app to link directly to specific filtered views.

### 2. Dashboard Integration (`JourneyDashboard.tsx`)
- **Actionable Cards**: The dashboard cards are no longer static text.
- **Contextual Links**:
  - Clicking "Week 12" -> Opens Knowledge Hub searching for "week 12" + filtered by Pregnancy.
  - Clicking "Vaccination" -> Opens Knowledge Hub searching for "vaccine" + filtered by Newborn.
  - Clicking "Fertile Window" -> Opens Knowledge Hub filtered by "TTC".

### 3. Data Audit
- Confirmed `client/src/data/articles.ts` contains appropriate tags (`ttc`, `pregnancy`, `postpartum`, `newborn`, `early-years`) to support this filtering.

## Phase 4: Backend Integration (Completed)
- **API Client**: Updated `client/src/utils/api.ts` with `saveUserJourney` function.
- **Context Sync**: `JourneyContext` now automatically syncs local state changes to the backend (`POST /api/user/journey`) if the user is logged in.
- **Fallback**: Continues to support offline/guest mode via Local Storage.

## Summary of Deliverables
1.  **Journey Context**: Global state management + Backend Sync.
2.  **Home Page**: Dynamic reordering + Smart Dashboard + Visual Timeline.
3.  **Knowledge Hub**: Personalized filtering + Deep linking.
4.  **Navigation**: Smart deep-linking between Dashboard and Knowledge Hub.

## Phase 4: Pre-pregnancy Readiness Tool (Completed)
- **Feature**: Interactive checklist for TTC users.
- **Content**: Covers Medical, Lifestyle, Financial, and Conversation topics.
- **Persistence**: Auto-saves progress (0-100%) to Local Storage.
- **Integration**: Embedded directly in the Journey Dashboard for TTC users.

## Phase 5: Calculators (Completed)
- **Ovulation Calculator**: Helps TTC users identify fertile windows based on LMP and cycle length.
- **Due Date Calculator**: Estimates delivery date for Pregnant users.
- **Design**: Integrated as handy cards in the dashboard.

## Phase 6: Safety Checker (Completed)
- **Feature**: Searchable database for foods, meds, and activities.
- **Status Logic**: CLEAR indicators for Safe (Green), Caution (Yellow), and Avoid (Red).
- **Data**: Mock database populated with common Indian context queries (Papaya, Yoga, etc.).
- **Integration**: Available on the dashboard for quick access.

## Phase 7: Smart Sakhi (Completed)
- **Context Awareness**: `ChatInterface.tsx` now reads from `JourneyContext`.
- **Dynamic Prompts**: Quick prompts change based on stage (e.g., TTC users see ovulation questions).
- **API Payload**: Journey stage and dates are sent to `/api/chat` for personalized LLM responses.

## Phase 8: Treatments Page Renovation (Completed)
- **Relevance Alert**: Logic added to `Treatments.tsx` to guide Pregnant/Parent users to the Knowledge Hub.

## Phase 9: Success Stories Personalization (Completed)
- **Smart Filtering**: `SuccessStories.tsx` prioritizes stories matching the user's journey.
- **Banner**: "Recommended for You" indicator added.

## Phase 10: Expert Connect Renovation (Completed)
- **Relevance**: `Experts.tsx` now sets expectations for fertility specialists vs obstetricians.

## Phase 11: Analytics & Final Polish (Completed)
- **Event Tracking**: `lib/analytics.ts` implemented.
- **Integration**: `JourneyContext.tsx` fires `journey_selected` event.

## Summary of Completed Phases
All phases of the renovation plan are now complete. The application is fully "Journey Aware".
