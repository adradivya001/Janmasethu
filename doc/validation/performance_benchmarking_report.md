# Performance Benchmarking Report — JANMASETHU (Sakhi)

Detailed metrics collection strategy for the 3-tier architecture.

## 1. Response Latency Benchmarking (P95)
Measure end-to-end time from Request to Final Byte.

| Path | Target | Component Breakdown |
|------|--------|---------------------|
| **SLM_DIRECT** | < 1.5s | Gateway(50ms) + SLM Inference(1.3s) + Formatting(100ms) |
| **SLM_RAG** | < 2.5s | Gateway(50ms) + RAG Search(300ms) + SLM(2.0s) |
| **OPENAI_RAG** | < 4.5s | Gateway(50ms) + RAG(300ms) + OpenAI(3.5s) |

- [ ] **TTFB (Time To First Byte)**: Measure for streaming endpoints (Target: < 800ms).
- [ ] **Overhead Check**: Measure Binding Layer latency (Target: < 20ms net overhead).

## 2. Token Usage Benchmarking
- [ ] **Input Token Scaling**: Average tokens sent per user query.
- [ ] **Context tokens**: Tokens added by RAG retrieval (Top 3 snippets).
- [ ] **Output tokens**: Average response length (Target: 150-250 tokens for chat).

## 3. DB & Infrastructure Performance
- [ ] **Query Execution Time**: Protype `sakhi_scraped_blogs` vector search (Target: < 150ms).
- [ ] **Connection Pooling**: Verify pool saturation under 10 concurrent requests.
- [ ] **Supabase Latency**: Round-trip time for metadata updates.

## 4. Binding Layer Stability
- [ ] **Handshake Latency**: Initial connection from Frontend to Binding proxy.
- [ ] **Payload Overhead**: Byte-size comparison between raw Backend and Binding response.

---
*Date: 2026-02-24*
