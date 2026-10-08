---
paths:
  - "app/models/**"
  - "app/stores/**"
---
# State Management Rules

- **MST** (`app/models/`): Chỉ dùng cho global state cần persist hoặc share giữa nhiều màn hình (auth, user session).
- **Zustand** (`app/stores/`): Dùng cho UI-local state của 1 màn hình/flow (seat hold, countdown, filters, map viewport).
- **TanStack Query**: Quản lý toàn bộ server state (fetch, cache, invalidate). KHÔNG lưu API data vào MST hay Zustand.
