# JS Clinics Backend API Specification

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
