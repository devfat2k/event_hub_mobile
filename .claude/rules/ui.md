---
paths:
  - "app/screens/**"
  - "app/components/**"
---
# UI & Component Rules

- **Theme**: Dùng `useAppTheme()` để lấy colors/spacing; hỗ trợ dark mode, tuyệt đối không hardcode màu hex/rgb.
- **i18n**: Thêm key vào `app/i18n/en.ts` TRƯỚC (để định nghĩa type), sau đó thêm vào `vi.ts`; dùng `translate()` hoặc `useTranslation()`.
- **Danh sách dài**: Dùng `FlatList`, KHÔNG dùng `ScrollView` + `map()`.
- **UI States**: Mọi màn hình/component chính phải xử lý đủ 3 trạng thái: Loading (skeleton/spinner), Error, Empty.
