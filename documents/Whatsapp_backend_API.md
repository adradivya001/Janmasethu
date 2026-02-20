# Whatsapp Backend API Specification

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
