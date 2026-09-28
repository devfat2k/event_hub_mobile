# EventHub — CLAUDE.md

## Mục tiêu
App đặt vé sự kiện tại HCMC (React Native + NestJS). Dự án luyện tập cá nhân — ưu tiên chất lượng kiến trúc và khả năng giải thích, không ưu tiên tốc độ.

## Tech Stack

| Layer | Công nghệ |
|---|---|
| Mobile | React Native (Ignite 11.5.0), Expo SDK 55, New Architecture, Hermes |
| Navigation | React Navigation — Bottom Tab + nested Stack |
| State (global) | MobX-State-Tree |
| State (UI local) | Zustand |
| Server state | TanStack Query |
| Real-time | Socket.io |
| Backend | NestJS + Prisma + PostgreSQL + Redis + BullMQ |
| Payment | SePay sandbox |
| Push | Firebase Cloud Messaging |
| Map | react-native-maps |
| Image storage | Cloudinary hoặc S3 |

## Vai trò & quy tắc làm việc của AI

- **Tôi là người ra quyết định cuối cùng.** AI là pair programmer, không tự quyết thay tôi.
- **Không generate toàn bộ app 1 lần.** Làm từng module/màn hình nhỏ, có thể review và hiểu được.
- **Trước mỗi module lớn:** đề xuất kế hoạch ngắn gọn → chờ tôi xác nhận → mới code.
- **Giải thích trade-off:** Với mỗi quyết định quan trọng, giải thích tại sao chọn cách này và đánh đổi gì — để tôi trả lời phỏng vấn sau.
- **Tuân theo convention có sẵn:** Ignite convention (mobile), NestJS convention (backend). Không tự ý đổi cấu trúc thư mục.
- **Khi không chắc:** Hỏi lại, không tự suy đoán rồi code sai hướng.
- **Verify bằng bằng chứng:** Khi cần verify (test, lint, build), chạy lệnh và cho xem output thật, không chỉ khẳng định "đã xong".
- **Comment tiếng Việt** tại logic phức tạp (real-time, state sync, lock mechanism).
- **Code sạch, đọc hiểu được**, ưu tiên rõ ràng hơn ngắn gọn.

## Lệnh build / test / lint

### Mobile (root — Expo/RN)
```bash
yarn start              # Expo dev server
yarn ios                # Run iOS
yarn android            # Run Android
yarn compile            # TypeScript type-check (tsc --noEmit)
yarn lint               # ESLint fix
yarn lint:check         # ESLint check only
yarn test               # Jest unit tests
yarn test:maestro       # Maestro E2E
```

### Backend
```
<< điền sau khi scaffold backend ở Bước 6 >>
```

## Cấu trúc path aliases
```
@/*       → ./app/*
@assets/* → ./assets/*
```

## Quy tắc code style (đã cấu hình sẵn)
- Prettier: không dấu chấm phẩy, ngoặc kép kép, trailing comma, printWidth 100
- ESLint: strict TypeScript, import ordering alphabetized
- Husky pre-commit: << cấu hình ở Bước 6 >>

## Definition of Done (mỗi feature)
1. Chạy được, không crash
2. `yarn compile` + `yarn lint:check` pass
3. Có loading / error / empty state
4. Tên biến/hàm rõ ràng, comment tại logic phức tạp
5. Dev giải thích lại được luồng hoạt động

---

Xem **SPEC.md** để biết chi tiết đầy đủ tính năng, màn hình, data model, API endpoints và edge cases.
