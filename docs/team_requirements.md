# Journey Awareness Layer - Team Requirements

## 1. Backend Team (API & Database)
**Objective**: Persist the user's journey stage across devices and sessions.

*   **Database Schema**:
    *   Table: `sakhi_users` (or `users`)
    *   New Columns:
        *   `sakhi_journey_stage`: Enum/String (`TTC`, `PREGNANT`, `PARENT`)
        *   `sakhi_journey_date`: Date/Timestamp (stores LMP, Due Date, or DOB)
        *   `sakhi_journey_date_type`: Enum/String (`LMP`, `DUE_DATE`, `DOB`)
    *   *Note*: Ensure strictly using `sakhi_` prefix for any new tables if creating a separate one (e.g., `sakhi_user_journey`).

*   **API Endpoints**:
    *   `POST /api/user/journey`
        *   Payload: `{ stage: string, date: string }`
        *   Action: Update user profile.
    *   `GET /api/user/me` (or profile fetch)
        *   Response: Should now include `sakhi_journey_stage` and `sakhi_journey_date` so the frontend can pre-fill or hide the modal.

## 2. Content / Data Team
**Objective**: Ensure content is tagged so we can filter it based on the user's stage.

*   **Taxonomy Updates**:
    *   Add a `Target Audience` or `Journey Stage` tag to all CMS content types (Articles, Videos, Products).
    *   Values: `Trying to Conceive`, `Pregnant`, `Parent`, `General`.
*   **Pregnancy Specifics**:
    *   Ensure pregnancy content has a `Week` metadata field (1-40) to match the user's calculated week.

## 3. Analytics Team
**Objective**: Track user segmentation.

*   **Event Tracking**:
    *   The frontend will fire: `journey_selected`
    *   Properties:
        *   `stage`: `TTC` | `PREGNANT` | `PARENT`
        *   `week` (if pregnant): `12`, `13`, etc.
        *   `child_age_months` (if parent): calculated from DOB.
