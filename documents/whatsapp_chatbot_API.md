# Whatsapp Chatbot API Specification

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
