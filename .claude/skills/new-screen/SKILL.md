---
name: new-screen
description: Tạo màn hình mới cho EventHub (screen + navigation + i18n + states)
disable-model-invocation: true
---
Tạo màn hình `$ARGUMENTS` theo các bước:
1. Đọc 1 screen hiện có trong `app/screens/` làm mẫu về cấu trúc.
2. Dùng generator của Ignite nếu phù hợp (kiểm tra bằng `npx ignite-cli generate --help`).
3. Dùng `Screen` + `useAppTheme()` + `translate()`; không import component UI từ `react-native`.
4. Đăng ký `AppStackParamList` và `Stack.Screen` (theo rule navigation).
5. Thêm key i18n: `en.ts` trước, `vi.ts` sau.
6. Có loading / error / empty state; dữ liệu server qua TanStack Query.
7. Chạy `bun run compile` và `bun run lint:check`, rồi báo cáo file đã tạo/sửa.
