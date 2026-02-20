# Janmasethu Ecosystem: Total API Documentation Master

This document is a complete, unified reference for every backend service within the Janmasethu ecosystem. It combines all architectural blueprints, detailed API endpoints, CRUD operations, response formats, and error handling orchestration logic into a single file.

---

# PART 1: Binding Layer Blueprint
*Architectural requirements for building a unified SDK.*

## 1. Goal
This document outlines the requirements and architecture for a unified "Binding Layer" (SDK) that can interact with all five backend services in the Janmasethu ecosystem.

## 2. Core Components to Bind

### Service Inventory
| Service | Technology | Role | Base URL (Dev) |
| :--- | :--- | :--- | :--- |
| **Sakhi Webapp Backend** | FastAPI | Core AI Chat & Onboarding | `http://localhost:8000` |
| **JS Clinics Backend** | Next.js | Clinic & Patient Operations | `http://localhost:3200` |
| **Whatsapp Backend** | FastAPI | WhatsApp Bot Logic | `http://localhost:8001` |
| **Whatsapp Chatbot Gateway**| Node.js | Meta/WhatsApp Proxy | `http://localhost:3001` |
| **Janmasethu Main Server** | Express | Admin, Leads & Scraping | `http://localhost:5000` |

---

## 3. Response Format Standardization
The binding layer must normalize the varying response formats into a single, predictable structure for the frontend.

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

**Normalization Rules**:
- **Sakhi/Whatsapp**: Map `status: success` or standard body to `success: true`. Map `detail` string to `error.message`.
- **JS Clinics**: Extract `success` directly. Map `code` and `error` fields into the SDK error object.
- **Janmasethu Server**: Map `ok: true` to `success: true`. Map `error` string to `error.message`.

---

## 4. Error Handling & Display Orchestration
The SDK must provide a consistent way to display errors from different backends.

- **FastAPI (Sakhi/WA)**: Catch 4xx/5xx responses and extract `detail`.
- **Next.js (Clinics)**: Check for `success: false` even on 200/400 status codes. Extract the `code` for programmatic error handling (e.g., `APPOINTMENT_NOT_FOUND`).
- **Express (Main)**: Check `ok: false` and surface the error string.

---

## 5. CRUD Implementation Strategy

### Resource Handlers
The SDK should be organized by resource, not necessarily by backend service:
- **`leads`**: Handles interactions with both `JS Clinics` and `Janmasethu Server`.
- **`chat`**: Orchestrates calls to `Sakhi` (Web) or `Whatsapp Backend`.
- **`patients`**: Direct binding to `JS Clinics`.

### Action-Based Routing
For services like the Main Server, the SDK should hide the `action` implementation detail:
- `sdk.leads.create(data)` -> `POST /api/leads {action: "insert"}`
- `sdk.leads.list()` -> `POST /api/leads {action: "fetch"}`

---

## 6. Authentication & Security Inputs
The binding layer requires the following environment inputs:
- `SAC_API_SECRET`: For internal server-to-server calls to the Chatbot Gateway.
- `SCRAPE_KEY`: For administrative actions on the Main Server.
- `AUTH_TOKEN`: Bearer token for user-authenticated sessions in Sakhi/WhatsApp.

---
---

# PART 2: Sakhi Webapp Backend
*Core AI Chat, Onboarding, and Knowledge Hub.*

## 1. Overview
The Sakhi Webapp Backend is a FastAPI-based service providing core AI chat functionalities, user registration, onboarding flows, knowledge hub access, and success story management.

## 2. Response & Error Formats

### Success Response
Standard JSON objects. For side-effect operations (Create/Update), the API often returns:
```json
{
  "status": "success",
  "user_id": "...", 
  "user": { ... }
}
```

### Error Response
Standardized error structure used across all endpoints via `HTTPException`:
```json
{
  "detail": "Descriptive error message here"
}
```

#### Common HTTP Status Codes
- **400 Bad Request**: Validation failed or logic error.
- **401 Unauthorized**: Invalid email/password or missing token.
- **404 Not Found**: Entity (User, Story, Article) does not exist.
- **500 Internal Server Error**: Unexpected code failure or database timeout.

---

## 3. CRUD Operations by Module

### User Management
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Create** | POST | `/user/register` | Register new user. |
| **Read** | GET | `/api/user/me` | Fetch current user info (requires `user_id` query param). |
| **Update** | POST | `/user/relation` | Update relationship status. |
| **Update** | POST | `/user/preferred-language` | Update language toggle. |
| **Update** | POST | `/api/user/journey` | Update journey state (TTC, etc.). |
| **Auth** | POST | `/user/login` | Authenticate and return user object. |

---

### Chat & AI Interface
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Process** | POST | `/sakhi/chat` | Main AI chat throughput (SLM/RAG/OpenAI). |

**Response Schema**:
```json
{
  "intent": "string",
  "reply": "AI Text",
  "mode": "medical | general | onboarding",
  "language": "en | te | tinglish",
  "route": "slm_direct | slm_rag | openai_rag",
  "youtube_link": "string (opt)",
  "infographic_url": "string (opt)"
}
```

---

### Onboarding Flow
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Fetch/Update** | POST | `/onboarding/step` | Get next question based on current answers. |
| **Complete** | POST | `/onboarding/complete` | Finalize profile creation. |

---

### Success Stories
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Create** | POST | `/stories/` | Submit a new story. |
| **Read (List)** | GET | `/stories/` | Get all published stories. |
| **Read (Item)** | GET | `/stories/{id}` | Get specific story by UUID. |
| **Update (Status)** | PUT | `/stories/{id}/status` | Admin: Approve/Publish. |
| **Update (Consent)**| POST | `/stories/consent` | Update user consent for their story. |
| **Media** | POST | `/stories/upload` | Upload photos (Multipart/form-data). |

---

### Knowledge Hub (RAG)
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Read (List)** | GET | `/api/knowledge-hub/` | List articles with filters. |
| **Read (Recs)** | GET | `/api/knowledge-hub/recommendations` | Get personalized recs. |
| **Read (Item)** | GET | `/api/knowledge-hub/{slug}` | Get article by slug. |

---

## 4. Binding Layer Orchestration
- **Input Transformation**: Convert frontend state to the JSON schemas defined above.
- **Error Display**: The binding layer should catch the `detail` field from 4xx/5xx responses and display it to the user.
- **Loading States**: AI endpoints (chat/stories) are long-running (2s+).

---
---

# PART 3: JS Clinics Backend
*Clinical Operations (Patients, Appointments, and Leads).*

## 1. Overview
The JS Clinics Backend (Next.js) manages the operational core of the clinic, including patient records, appointments, and leads.

## 2. Global Response & Error Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "pagination": { "page": 1, "limit": 20, "total": 100 }
}
```

### Error Response
JS Clinics uses a descriptive error object with specific internal codes:
```json
{
  "success": false,
  "error": "Descriptive error message",
  "code": "ERROR_CODE_STRING",
  "details": { ... } // optional
}
```

#### Common Error Codes
- `INVALID_APPOINTMENT_ID`: The provided ID is not a valid UUID.
- `APPOINTMENT_NOT_FOUND`: No appointment exists with that ID.
- `STATUS_IMMUTABLE_COMPLETED`: Attempted to update an appointment that is already "Completed".
- `DOCTOR_NOT_FOUND`: The assigned doctor ID does not exist.
- `PGRST116`: Standard Supabase "Record not found" error mapped to HTTP 404.

---

## 3. CRUD Operations by Module

### Appointments
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Create**| POST | `/api/appointments` | Create new appointment (autocreates lead if needed). |
| **Read (List)** | GET | `/api/appointments` | Fetch with filters (`date`, `status`, `doctor_id`). |
| **Read (Item)** | GET | `/api/appointments/{id}` | Fetch single appointment details. |
| **Update** | PATCH | `/api/appointments/{id}` | Update date, time, doctor, or notes. |
| **Update (Status)** | POST | `/api/appointments/{id}/status` | Specialized endpoint for status transitions. |

---

### Clinic Leads
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Create**| POST | `/api/leads` | Create a new clinical lead. |
| **Read (List)** | GET | `/api/leads` | List leads (paginated, searchable by `q`). |
| **Read (Item)** | GET | `/api/leads/{id}` | Fetch single lead details. |
| **Update** | PATCH | `/api/leads/{id}` | Update lead info (status, inquiry, patient data). |
| **Bulk** | POST | `/api/leads/bulk` | Bulk import leads. |
| **Export** | GET | `/api/leads/export` | Export leads data. |

---

### Patient Management
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Create**| POST | `/api/patients` | Register new patient (enforces unique mobile). |
| **Read (List)** | GET | `/api/patients` | List patients (searchable by name/phone). |
| **Read (Item)** | GET | `/api/patients/{id}` | Fetch single patient profile. |
| **Update** | PATCH | `/api/patients/{id}` | update demographics, contact info, or assigned doctor. |

---

### Control Tower
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Read (Metrics)** | GET | `/api/control-tower/metrics` | Dashboard KPI summary. |
| **Read (Queue)** | GET | `/api/control-tower/live-queue` | Current clinic flow status. |

---

## 4. Binding Layer Orchestration
- **CORS Handling**: Requests must originate from authorized origins or use a server-side proxy to bypass CORS.
- **Data Sanitization**: The API uses a `sanitizePayload` utility; sending extra fields in the JSON body is safe but they will be ignored.
- **Dynamic Snapshots**: When displaying appointment lists, prefer using the "snapshot" fields (name/phone) returned by the API to ensure data historical accuracy.

---
---

# PART 4: Whatsapp Backend
*Conversational AI logic for WhatsApp.*

## 1. Overview
The Whatsapp Backend handles Conversational AI for WhatsApp, including rewards, lead capture, and user sessions.

## 2. Response & Error Formats

### Success Response
Main chat responses use a structured AI reply object:
```json
{
  "reply": "AI Message",
  "mode": "general | rewarding | medical | lead_capture",
  "intent": "Intent label",
  "language": "English | Telugu | Tinglish",
  "route": "slm_direct | slm_rag | openai_rag",
  "youtube_link": "string (opt)",
  "infographic_url": "string (opt)"
}
```

### Error Response
Standardized via FastAPI's `HTTPException`:
```json
{
  "detail": "Error description"
}
```

#### Common Error Codes
- **400 Bad Request**: Missing `phone_number` or empty `message`.
- **401 Unauthorized**: User session validation failed.
- **500 Server Error**: LLM/AI service failure or DB timeout.

---

## 3. CRUD Operations by Module

### User Management & Sessions
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Create** | POST | `/user/register` | Create a new session from WhatsApp phone number. |
| **Read** | POST | `/user/login` | Authenticate existing WhatsApp user. |
| **Update** | POST | `/user/preferred-language` | Set language preference (Telugu/Tinglish/English). |
| **Update** | POST | `/user/relation` | Update clinical context (Self/Partner). |

---

### Conversational Core (Transactional)
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Process** | POST | `/sakhi/chat` | AI response generation. Handles `/rewards` and `/newlead` commands. |

---

### Rewards (Read Only)
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Read** | - | - | Handled via `/rewards` command in `/sakhi/chat`. |

---

## 4. Binding Layer Orchestration
- **Session Identification**: The primary key for the binding layer is the `phone_number`.
- **Dialect Support**: The `language` field is mandatory for the AI to provide the correct localization.
- **Error Orchestration**: All 4xx errors should be displayed as user-friendly message bubbles in the WhatsApp flow.

---
---

# PART 5: Whatsapp Chatbot Gateway
*Internal Meta Proxy Service.*

## 1. Overview
The WhatsApp Chatbot (Node.js) is the gateway between internal backends and the Meta WhatsApp Cloud API.

## 2. Response & Error Formats

### Success Response
```json
{
  "status": "success",
  "phone": "91XXXXXXXXXX",
  "type": "text | media | template"
}
```

### Error Response
Errors are returned as plaintext or simple JSON objects:
```json
{
  "error": "Missing phone or message/media_url/template_name"
}
```

#### Common Errors
- **401 Unauthorized**: Header `x-internal-secret` is missing or incorrect.
- **400 Bad Request**: Payload validation failed.
- **500 Internal Server Error**: Meta API returned an error (e.g., template not found, token expired).

---

## 3. CRUD Operations (Gateway Actions)

### Messaging Gateway
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Send** | POST | `/v1/send-message` | Dispatch message via Meta. Requires `x-internal-secret`. |

**Messaging Payload Options**:
- **Text**: `{"phone": "...", "message": "..."}`
- **Media**: `{"phone": "...", "media_url": "..."}`
- **Template**: `{"phone": "...", "template_name": "...", "components": [...]}`

---

### Webhook Management
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Verify** | GET | `/webhook` | Initial Meta handshake (returns hub.challenge). |
| **Receive** | POST | `/webhook` | Primary listener for incoming Meta events. |

---

## 4. Binding Layer Orchestration
- **Security**: The `INTERNAL_API_SECRET` must be kept safe and only used for server-to-server calls to this gateway.
- **Meta Limits**: The binding layer should handle rate-limiting or back-pressure if Meta returns 429 errors.
- **Asynchronous Delivery**: Success response only indicates message was *accepted* by the gateway, not necessarily delivered to the user's handset.

---
---

# PART 6: Janmasethu Server
*Administrative & Data Scraping.*

## 1. Overview
The Janmasethu Server (Express) acts as a specialized backend for administrative tasks, lead aggregation, scraping, and legacy persistence.

## 2. Response & Error Formats

### Success Response
Unified JSON wrap:
```json
{
  "ok": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "ok": false,
  "error": "Error message string"
}
```

#### Common Error Codes
- **401 Unauthorized**: Missing or invalid `SCRAPE_KEY` for administrative/scraping endpoints.
- **400 Bad Request**: Invalid `action` provided or missing required body fields.

---

## 3. CRUD Operations by Module

### Lead Management (Action-Based CRUD)
The `/api/leads` endpoint handles multiple operations via the `action` field in the request body.

| Operation | Method | Action Body | Description |
| :--- | :--- | :--- | :--- |
| **Create** | POST | `{"action": "insert", ...}` | Create a new lead record. |
| **Read (List)** | POST | `{"action": "fetch"}` | List all leads from DB. |
| **Update** | POST | `{"action": "update", "lead_id": "...", ...}` | Update specific lead information. |

---

### Clinic & Success Stories
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Create** | POST | `/api/success-stories` | Add a success story to the server cache. |
| **Read (List)** | GET | `/api/success-stories` | Fetch cached success stories. |
| **Auth** | POST | `/api/clinic/login` | Simple password check for internal portal. |

---

### Data Scraping (Privileged)
| Operation | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Scrape** | POST | `/api/scrape/blogs` | trigger Medcy blog scraping. |
| **Scrape** | POST | `/api/scrape/doctors` | Trigger Medcy doctor scraping. |

---

## 4. Binding Layer Orchestration
- **Security**: SCRAPE_KEY and INTERNAL_API_SECRET must be included as `x-api-key` or `x-internal-secret` headers.
- **Action Pattern**: The binding layer must encapsulate the "action" string inside the POST body, effectively providing `createLead()`, `listLeads()`, and `updateLead()` methods that all call the same URL with different payloads.
- **Error Display**: Check the `ok` boolean in every response; if `false`, the `error` string should be propagated to the UI.
