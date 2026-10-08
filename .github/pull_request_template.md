## Mô tả thay đổi
<!-- Tóm tắt ngắn gọn tính năng mới, tái cấu trúc hoặc lỗi đã được sửa -->

## Phần AI hỗ trợ
<!-- Liệt kê công cụ AI, skill hoặc agent đã dùng (ví dụ: /new-screen, /new-api-service, superpowers...) và tại các module nào -->

## Kiểm chứng (How this was tested)
<!-- Mô tả chi tiết cách bạn đã kiểm thử thay đổi này -->
- [ ] `bun run compile`
- [ ] `bun run lint:check`
- [ ] `bun run test`
- [ ] Thử nghiệm thủ công: <!-- mô tả kịch bản test bằng tay -->

## Rủi ro & Lưu ý cho Reviewer
<!-- Các rủi ro tiềm ẩn, quyết định kiến trúc quan trọng hoặc điểm cần reviewer chú ý -->

## Checklist
- [ ] Code compile không lỗi (`bun run compile`)
- [ ] Lint check pass (`bun run lint:check`)
- [ ] Unit test pass (`bun run test`)
- [ ] Đã xử lý đủ 3 trạng thái UI: Loading, Error, Empty state
- [ ] Đã bổ sung ngôn ngữ i18n đầy đủ ở `en.ts` trước, `vi.ts` sau
- [ ] Không chỉnh sửa các file generated/secret (`ios/Pods/`, `android/build/`, `.env`, `bun.lockb`)
