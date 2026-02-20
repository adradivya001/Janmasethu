# Janmasethu Ecosystem: Layered Architecture Specification

This document details the architectural division of the Janmasethu ecosystem into three distinct logical layers: **Business Logic**, **Coordination Logic**, and **Database Logic**. This separation ensures scalability, maintainability, and clear separation of concerns across the various backend services.

---

## 1. Business Logic Layer (Domain Layer)
*The "Intelligence" of the system.*

This layer encapsulates the core functional rules, domain models, and decision-making processes. It is independent of how data is received (API/Chat) or stored (SQL/Supabase).

### Core Components
- **AI & Model Orchestration**:
    - `modules/model_gateway.py`: Handles interactions with LLMs (GPT, Bedrock, etc.).
    - `modules/slm_client.py`: Specific logic for Small Language Model (SLM) integration.
    - `rag.py`: Implements Retrieval-Augmented Generation logic for clinical knowledge.
- **Service Engines**:
    - `modules/onboarding_engine.py`: Encapsulates the multi-step user onboarding flow.
    - `modules/lead_manager.py`: Logic for scoring, categorizing, and routing sales leads.
    - `modules/user_rewards.py`: Business rules for engagement-based rewards.
- **Domain Logic**:
    - `modules/sakhi_prompt.py`: Prompt engineering and clinical persona definitions.
    - `modules/parent_profiles.py`: Logic for managing complex parenthood-specific user data.

### Repositories Involved
- **Sakhi Webapp Backend**: `/modules`
- **WhatsApp Backend**: `/modules`
- **Janmasethu Main (Janmasethu-1)**: `/shared` (Domain schemas and shared logic)

---

## 2. Coordination Logic Layer (Orchestration Layer)
*The "Traffic Controller" of the system.*

This layer manages the flow of data between the outside world (users, WhatsApp, Frontend) and the internal Business/Database layers. It handles request routing, authentication, and service integration.

### Core Components
- **API Definition & Routing**:
    - `main.py` (FastAPI): Entry points for Sakhi and WhatsApp backends.
    - `server/routes.ts` (Express): Orchestrates the Janmasethu Main Server API.
    - `app/api/` (Next.js): API routes for the Clinics Backend.
- **Communication Orchestration**:
    - `messageController.js` (WhatsApp Chatbot): Coordinates incoming WhatsApp events with backend AI services.
    - **Middleware**: Authentication, CORS handling, and request validation (Zod/Pydantic).
- **Service-to-Service Integration**:
    - Proxy logic in `routes.ts` for connecting the Knowledge Hub to the Control Tower.
    - Cloud function triggers and external API integrations (e.g., WhatsApp Business API).

### Repositories Involved
- **Janmasethu Main**: `/server/routes.ts`
- **WhatsApp Chatbot**: `/controllers/messageController.js`
- **Clinics Backend**: `/app/api`

---

## 3. Database Logic Layer (Persistence Layer)
*The "Memory" of the system.*

This layer handles data persistence, retrieval, and schema management. It isolates the rest of the application from the specific database implementation (SQL, Supabase, Drizzle).

### Core Components
- **Infrastructure Clients**:
    - `supabase_client.py` & `supabaseClient.ts`: Direct SDK wrappers for Supabase storage and Auth.
    - `server/db.ts`: PostgreSQL connection pool management using Drizzle ORM.
- **Data Access & Schema**:
    - `shared/schema.ts`: Single source of truth for database tables and relations.
    - `server/storage.ts`: Repository pattern implementation for abstracted data access.
- **Lower-Level persistence**:
    - `sql/` & `scripts/`: Raw SQL migrations, functions, and stored procedures for complex clinical logic.

### Repositories Involved
- **All Backends**: `supabase_client.py` / `db.ts`
- **Janmasethu Main**: `/shared/schema.ts`, `/server/storage.ts`

---

## Architectural Mapping Matrix

| Layer | Sakhi Webapp Backend | WhatsApp Backend | Janmasethu Main |
| :--- | :--- | :--- | :--- |
| **Business** | `modules/*.py` | `modules/*.py` | `shared/schema.ts` |
| **Coordination** | `main.py` | `main.py` | `server/routes.ts` |
| **Database** | `supabase_client.py` | `supabase_client.py` | `server/storage.ts` |

---

### Recommendations for Future Development
1. **Business Expansion**: Keep all AI-related clinical logic strictly within the `modules/` directory across repositories to ensure it can be easily migrated to a unified service.
2. **Coordination Security**: Implement a unified Auth middleware across the Coordination layer to standardize access control.
3. **Database Unification**: Move toward a centralized Repository pattern (as seen in `storage.ts`) to avoid direct DB calls within the Coordination layer.
