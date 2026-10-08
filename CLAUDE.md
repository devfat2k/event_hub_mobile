# EventHub
React Native (Ignite 11.5, Expo SDK 55, New Architecture + Hermes), TypeScript.
Tech: MST (global) · Zustand (UI local) · TanStack Query (server) · React Navigation · Socket.io · SePay sandbox · FCM · react-native-maps

## Lệnh (dùng bun)
- `bun run compile` (tsc) · `bun run lint` · `bun run lint:check` · `bun run test`
- 1 test: `bun run test -- --testPathPattern="<tên>"`
- Luôn dùng `bun run test` (Jest). KHÔNG dùng `bun test`: đó là runner gốc của Bun và sẽ lỗi.
- Chạy app: `bun ios` / `bun android` (cần EAS build trước: `bun run build:ios:sim` / `build:android:sim`)

## Điểm cần nhớ
- Alias: `@/*` → `./app/*`, `@assets/*` → `./assets/*`
- Entry: `index.tsx` → `app/app.tsx`
- Quy tắc theo vùng nằm ở `.claude/rules/` (state, navigation, api, ui)
- Roadmap: docs/roadmap.md (đọc khi lập kế hoạch tính năng)

## Quy ước bắt buộc
- Function component + hooks; không `import React` default
- Không dùng `Text/Button/TextInput/SafeAreaView` từ `react-native` → dùng `@/components` và `react-native-safe-area-context`
- Không đụng `ios/Pods`, `android/build`, `.env`
- Comment tiếng Việt tại logic phức tạp (real-time, state sync, lock)

## Quy trình
- Tính năng mới / module lớn: dùng brainstorming → writing-plans (Superpowers). Spec và plan lưu ở `docs/superpowers/`; chờ tôi duyệt spec/plan rồi mới code.
- Việc nhỏ (sửa lỗi, đổi UI nhỏ, dưới ~3 file): làm trực tiếp, bỏ qua brainstorming.
- TDD bắt buộc cho logic thuần (stores, services, utils, hooks). Layout UI không bắt buộc TDD; kiểm tra bằng `bun run compile` + `bun run lint:check` + chạy thử.
- Ưu tiên: CLAUDE.md và `.claude/rules/` luôn thắng khuyến nghị của plugin/skill bên ngoài.
- Nếu skill ngoài đề xuất Expo Router, NativeWind, hoặc pattern khác stack này: bỏ qua. Dự án dùng Ignite + React Navigation + theme của Ignite.
- Giải thích trade-off ở quyết định quan trọng; đọc code liên quan trước khi sửa.
- Sửa xong chạy `bun run compile` + `bun run lint:check`.

## Definition of Done
1. Chạy được, không crash
2. `bun run compile` + `bun run lint:check` pass
3. Có loading / error / empty state
4. Tên biến/hàm rõ ràng, comment tại logic phức tạp
5. Dev giải thích lại được luồng hoạt động

## Compact instructions
Khi nén context, giữ: danh sách file đã sửa, quyết định kiến trúc, lỗi test chưa fix, việc còn lại.
