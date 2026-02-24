# Monitoring & Logging Checklist — JANMASETHU (Sakhi)

Standardized log audit for production readiness.

## 1. Application Logs
- [ ] **Verbosity Level**: Set to `INFO` for production, `DEBUG` for validation.
- [ ] **Trace IDs**: Ensure every request has a unique trace ID logged in both Binding and Backend layers.
- [ ] **AI Metadata**: Log `intent`, `route`, and `tokens_used` for every chat interaction.

## 2. Database Logs (Supabase)
- [ ] **Query Performance Logs**: Enable "Long Running Queries" alert for anything > 500ms.
- [ ] **Connection Errors**: Capture any `asyncpg.PoolError` or connection timeouts.

## 3. Error Tracking
- [ ] **Panic Logging**: Ensure any unhandled exceptions are caught and logged with stack traces.
- [ ] **Model Failure Detection**: Dedicated logs for API failures (OpenAI 5xx, Gateway timeouts).

## 4. Performance Metrics
- [ ] **Active Metrics**: Track endpoint latency patterns over time.
- [ ] **Memory Leaks**: Monitor resident set size (RSS) during load tests.

---
*Date: 2026-02-24*
