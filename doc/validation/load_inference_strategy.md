# Load Inference Strategy — JANMASETHU (Sakhi)

Testing the system's ability to handle multiple concurrent AI conversations.

## 1. Concurrent User Simulation
| Tier | Users | Duration | Expected RPS | Failure Threshold |
|------|-------|----------|--------------|-------------------|
| **Baseline** | 1 | 5 min | ~0.5 | 0% |
| **Normal** | 5 | 10 min | ~2.0 | < 1% |
| **Peak** | 20 | 10 min | ~8.0 | < 5% |
| **Stress** | 50 | 5 min | ~20.0 | Monitoring for crash |

## 2. Load Testing Tools
- **k6**: For scriptable HTTP load testing of the `/api/chat` and `/sakhi/chat` endpoints.
- **Locust**: For distributed user swarm simulation.
- **Custom Scripts**: Use `sakhi_latency_test.py` with multi-threading for rapid local verification.

## 3. Performance Thresholds under Load
- [ ] **P95 Latency**: Should not degrade by more than 2x under Normal load (Target: < 6s for OPENAI_RAG).
- [ ] **Resource Utilization**: Monitor CPU/Memory on the FastAPI server during Stress tier.
- [ ] **Model Rate Limiting**: Identify the exact RPS where OpenAI/ModelGateway starts returning 429 Too Many Requests.

## 4. Concurrent Inference Metrics
- [ ] **Throughput**: Successful chat responses per minute.
- [ ] **Error Rate**: Percentage of `CHAT_TIMEOUT` vs `HTTP 500`.

---
*Date: 2026-02-24*
