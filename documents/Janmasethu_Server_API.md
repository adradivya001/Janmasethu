# Janmasethu Server API Specification

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
