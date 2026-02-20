# Sakhi Webapp Backend API Specification

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
