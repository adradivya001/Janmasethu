# Binding Layer Specification for Janmasethu Ecosystem

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
