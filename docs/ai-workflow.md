# Hướng Dẫn Workflow & Mẫu Prompt — EventHub

Tài liệu chuẩn hóa quy trình làm việc và mẫu prompt thực chiến cùng Claude Code.

## 1. Cấu trúc thư mục `.claude/`
- `rules/`: Quy tắc theo vùng code (`api.md`, `navigation.md`, `state.md`, `ui.md`).
- `skills/`: Tác vụ tự động (`/new-screen`, `/new-api-service`, `/check-done`).
- `agents/`: Subagent chuyên biệt (`code-reviewer` đối soát `git diff`).
- `hooks/`: Chặn file cấm/lệnh nguy hiểm (`guard-protected.mjs`) & tự sửa lint (`lint-on-edit.mjs`).
- `settings.json`: Cấu hình plugins, permissions allow/deny và hooks.

## 2. Khi nào dùng Skill & Agent?
- `/new-screen <Name>`: Tạo màn hình mới (sinh boilerplate, gắn route, i18n, UI states).
- `/new-api-service <domain>`: Tạo service API (apisauce) và TanStack Query hook.
- `/check-done`: Đối soát thay đổi với 5 tiêu chí Definition of Done.
- `@code-reviewer`: Review độc lập `git diff` trước khi commit/tạo PR.

## 3. Quy trình làm việc
- **Tính năng mới / Module lớn**: Brainstorming → Viết spec/plan vào `docs/superpowers/` → Duyệt → TDD logic thuần (stores, services, utils, hooks).
- **Việc nhỏ (< 3 file, fix bug, UI nhỏ)**: Làm trực tiếp, kiểm tra bằng `compile` + `lint:check`.

## 4. Thói quen quản lý Context
- `/clear`: Bắt đầu một task/tính năng hoàn toàn mới.
- `/compact focus on ...`: Nén context khi hội thoại dài, giữ lại các quyết định quan trọng.
- `/rewind`: Quay lui khi Claude đi sai hướng hoặc sinh lỗi.
- `/goal`: Đặt tiêu chí dừng khách quan cho tác vụ dài.

## 5. Mẫu Prompt Dùng Hằng Ngày

### 5.1 Sửa lỗi nhỏ
```
Lỗi: <hiện tượng>. Tái hiện: <các bước>. Hãy tìm nguyên nhân gốc trước khi sửa, viết test lỗi nếu là logic thuần, sửa tối thiểu, rồi chạy bun run compile + bun run lint:check + bun run test. Báo cáo file đã sửa.
```

### 5.2 Giao việc dài với tiêu chí dừng rõ ràng
```
/goal bun run compile, bun run lint:check và bun run test đều pass sau khi hoàn thành <việc cụ thể>
```

### 5.3 Review trước khi commit
```
Dùng subagent code-reviewer review `git diff` hiện tại theo CLAUDE.md và .claude/rules/. Chỉ báo cáo vấn đề (file:dòng, mức độ, gợi ý sửa), không tự sửa.
```

### 5.4 Nén context khi phiên dài
```
/compact focus on quyết định kiến trúc, các file đã sửa, lỗi test chưa fix và việc còn lại
```

## 6. Cảnh báo & Nhắc nhở Quan trọng
- **Cấm sửa trực tiếp**: `ios/Pods/`, `android/build/`, `.env`, `bun.lockb` (hook sẽ tự chặn).
- **Không tự ý bypass**: TDD cho domain logic thuần; Luôn dùng component từ `@/components`.
- **Luôn kiểm tra trước khi bàn giao**: `bun run compile` + `bun run lint:check` + `bun run test`.
