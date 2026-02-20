# Janmasethu Ecosystem: Master API & Binding Layer Specification

## 1. Executive Summary
This document provides a single, unified technical reference for the entire Janmasethu backend ecosystem. It covers five distinct services, their CRUD operations, standardized response/error formats, and the architecture for a unified Binding Layer (SDK).

---

## 2. Global Binding Layer Blueprint

### Service Inventory
| Service | Technology | Role | Base URL (Dev) |
| :--- | :--- | :--- | :--- |
| **Sakhi Webapp Backend** | FastAPI | Core AI Chat & Onboarding | `http://localhost:8000` |
| **JS Clinics Backend** | Next.js | Clinic & Patient Operations | `http://localhost:3200` |
| **Whatsapp Backend** | FastAPI | WhatsApp Bot Logic | `http://localhost:8001` |
| **Whatsapp Chatbot Gateway**| Node.js | Meta/WhatsApp Proxy | `http://localhost:3001` |
| **Janmasethu Main Server** | Express | Admin, Leads & Scraping | `http://localhost:5000` |

### Unified SDK Response Interface
```typescript
interface SDKResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}
```

---

## 3. Sakhi Webapp Backend (Core AI)

### Overview
FastAPI-based service for AI chat, onboarding, and knowledge hub.

### CRUD & Endpoints
| Module | Method | Endpoint | Action |
| :--- | :--- | :--- | :--- |
| **User** | POST | `/user/register` | Create Profile |
| **User** | GET | `/api/user/me` | Read Profile |
| **Chat** | POST | `/sakhi/chat` | AI Process |
| **Onboarding**| POST | `/onboarding/step` | Flow Management |
| **Stories** | POST | `/stories/` | Create Story |
| **Knowledge** | GET | `/api/knowledge-hub/`| List Articles |

---

## 4. JS Clinics Backend (Operations)

### Overview
Next.js service for clinical management (Patients, Appointments, Leads).

### CRUD & Endpoints
| Module | Method | Endpoint | Action |
| :--- | :--- | :--- | :--- |
| **Patients** | POST | `/api/patients` | Create (Unique Mobile) |
| **Patients** | PATCH | `/api/patients/{id}` | Update Demographics |
| **Appts** | POST | `/api/appointments` | Create Appointment |
| **Appts** | PATCH | `/api/appointments/{id}`| Reschedule/Edit |
| **Leads** | GET | `/api/leads` | List clinical leads |

**Error Codes**: `INVALID_APPOINTMENT_ID`, `APPOINTMENT_NOT_FOUND`, `STATUS_IMMUTABLE_COMPLETED`.

---

## 5. Whatsapp Backend & Chatbot Gateway

### Whatsapp Backend (Conversational Logic)
- **Endpoint**: `POST /sakhi/chat`
- **Featured Flows**: `/rewards` command, `/newlead` command.
- **Dialects**: English, Telugu, Tinglish.

### Chatbot Gateway (Meta Proxy)
- **Endpoint**: `POST /v1/send-message`
- **Auth**: Requires `x-internal-secret` header.
- **Payploads**: Text, Media, Templates.

---

## 6. Janmasethu Main Server (Admin)

### Action-Based CRUD
The `/api/leads` endpoint uses an `action` field in the body:
- **Create**: `{"action": "insert", ...}`
- **Read**: `{"action": "fetch"}`
- **Update**: `{"action": "update", ...}`

---

## 7. Error Handling Orchestration
1. **Detection**: Check HTTP status codes (4xx/5xx).
2. **Extraction**:
   - Sakhi/WA: Extract `detail` string.
   - Clinics: Extract `success: false` and `code`.
   - Main: Extract `ok: false` and `error` string.
3. **SDK Output**: Map all to the `SDKResponse.error` object for consistent UI rendering.

## 8. Development Connectivity
- **CORS**: Most services allow `*` or specific local origins.
- **Headers**: 
  - `Content-Type: application/json`
  - `x-api-key`: Administrative/Scraping
  - `x-internal-secret`: Gateway Proxy
  - `Authorization: Bearer <token>`: User Sessions
