# EventHub — Product Specification

> Phiên bản: 1.0  
> Ngày: 2026-09-28  
> Tác giả: phathuu26 + Claude Code  
> Mục tiêu: Tài liệu kỹ thuật đầy đủ để guide AI coding assistant và làm reference khi phỏng vấn.

---

## 1. Tổng quan dự án

**EventHub** là ứng dụng mobile (React Native) cho phép người dùng khám phá, tìm kiếm và đặt vé các sự kiện tại TP. Hồ Chí Minh — thiết kế để mở rộng sang các thành phố khác.

### Mục tiêu học tập (theo thứ tự ưu tiên)

1. Nâng cao kỹ năng React Native (mobile-first, ~4 năm kinh nghiệm)
2. Mở rộng kỹ năng NestJS backend (đang học)
3. Có portfolio chất lượng để trả lời phỏng vấn về thiết kế/triển khai
4. Thực hành AI-assisted development có kiểm soát (không vibe coding)

### Nguyên tắc xuyên suốt

- **Chất lượng kiến trúc > tốc độ hoàn thành**
- **Explainability**: Mỗi quyết định kỹ thuật phải giải thích được trong phỏng vấn
- **Incremental**: Làm từng phần nhỏ, review từng phần trước khi tiếp tục
- **Convention-first**: Tuân theo Ignite convention, không tự ý refactor cấu trúc

---

## 2. Tech Stack

### Mobile (React Native)

| Concern           | Thư viện                                     | Ghi chú                                            |
| ----------------- | -------------------------------------------- | -------------------------------------------------- |
| Framework         | React Native + Ignite boilerplate            | Base đã có sẵn                                     |
| Navigation        | React Navigation — Bottom Tab + nested Stack | Bottom tab cố định, stack per tab                  |
| State (global)    | MobX-State-Tree (MST)                        | Giữ nguyên Ignite default cho auth/user            |
| State (UI local)  | Zustand                                      | Cho seat selection, filters, booking cart          |
| Server state      | TanStack Query (React Query)                 | Fetch, cache, invalidate API data                  |
| Real-time         | Socket.io client                             | Live seat/ticket count                             |
| Push notification | Firebase Cloud Messaging (FCM)               | 3 loại: booking confirm, event reminder, new event |
| Map               | react-native-maps (Google Maps)              | Chi tiết sự kiện + màn hình bản đồ khám phá        |
| Camera/QR         | expo-camera hoặc react-native-vision-camera  | Scan QR check-in                                   |
| Deep linking      | Custom URL scheme `eventhub://`              | `eventhub://event/:id`, `eventhub://ticket/:id`    |
| Animation         | React Native Reanimated (basic)              | Tránh phức tạp hoá                                 |
| Analytics         | Firebase Analytics + Firebase Crashlytics    |                                                    |
| Crash monitoring  | Sentry                                       |                                                    |
| Code quality      | ESLint + Prettier + Husky pre-commit         |                                                    |
| Image             | Cloudinary hoặc AWS S3                       | Upload ảnh sự kiện + avatar                        |
| Offline           | MMKV persistent cache                        | Chỉ cho My Tickets (QR xem offline)                |

### Backend (NestJS)

| Concern         | Công nghệ                                        | Ghi chú                                             |
| --------------- | ------------------------------------------------ | --------------------------------------------------- |
| Framework       | NestJS                                           |                                                     |
| Database        | PostgreSQL + PostGIS extension                   | Cho geo queries nếu cần sau                         |
| ORM             | Prisma                                           | Schema-first, type-safe, migration tự động          |
| Auth            | JWT (Access Token + Refresh Token)               | Email/Password only                                 |
| Real-time       | Socket.io Gateway (NestJS)                       | Room per event                                      |
| Queue/Jobs      | BullMQ + Redis                                   | Scheduled jobs (reminder notifications)             |
| Cache / Lock    | Redis                                            | Pessimistic seat lock (TTL + keyspace notification) |
| Payment         | SePay sandbox                                    | API-based, không cần WebView redirect               |
| File storage    | Cloudinary SDK hoặc AWS S3 pre-signed URL        |                                                     |
| Seed data       | Crawler script (Ticketbox/Eventbrite) + Faker.js | Data thật để demo đẹp hơn                           |
| Process manager | PM2                                              | Production-ready                                    |

---

## 3. Kiến trúc hệ thống

```
┌─────────────────────────────────────────────┐
│             React Native App                 │
│  MST (auth) + Zustand (UI) + TanStack Query  │
│  Socket.io client ──────────────────────┐   │
└────────────────────┬────────────────────┼───┘
                     │ REST API           │ WebSocket
                     ▼                   ▼
┌─────────────────────────────────────────────┐
│              NestJS Server                   │
│  Auth Module │ Events Module │ Booking Module│
│  Payment Module │ Notifications Module       │
│  Socket.io Gateway (real-time rooms)         │
└──────┬──────────────┬───────────────┬────────┘
       │              │               │
       ▼              ▼               ▼
  PostgreSQL       Redis           BullMQ
  (Prisma)    (seat locks,      (scheduled
              cache TTL)     notification jobs)
                                      │
                                      ▼
                                    FCM (push)
                                   SePay (payment)
                               Cloudinary/S3 (media)
```

---

## 4. Data Models (Prisma Schema — thiết kế sơ bộ)

### User

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  displayName   String
  avatarUrl     String?
  role          Role      @default(ATTENDEE)
  refreshToken  String?
  createdAt     DateTime  @default(now())

  bookings      Booking[]
  favorites     Favorite[]
  notifications Notification[]
}

enum Role {
  ATTENDEE
  ADMIN     // seed data via script, không có UI
}
```

### Event

```prisma
model Event {
  id            String      @id @default(cuid())
  title         String
  description   String
  coverImageUrl String
  category      Category    @relation(fields: [categoryId], references: [id])
  categoryId    String
  venue         Venue       @relation(fields: [venueId], references: [id])
  venueId       String
  startAt       DateTime
  endAt         DateTime
  status        EventStatus @default(PUBLISHED)
  totalViews    Int         @default(0)  // cho trending algorithm
  ticketTypes   TicketType[]
  bookings      Booking[]
  favorites     Favorite[]
  createdAt     DateTime    @default(now())
}

enum EventStatus {
  PUBLISHED   // đang mở bán
  SOLD_OUT    // hết vé, vẫn hiển thị
  // Cancelled và Draft không dùng trong v1
}
```

### TicketType (General Admission)

```prisma
model TicketType {
  id           String   @id @default(cuid())
  event        Event    @relation(fields: [eventId], references: [id])
  eventId      String
  name         String   // VD: "VIP", "Standard", "Early Bird"
  price        Decimal
  totalSeats   Int
  availableSeats Int    // cập nhật realtime
  maxPerOrder  Int      @default(1)  // v1: 1 vé/lần, mở rộng sau
  ticketings   Ticket[]
}
```

### SeatingPlan (Numbered Seating — cho events có chọn ghế)

```prisma
model Seat {
  id           String     @id @default(cuid())
  ticketType   TicketType @relation(fields: [ticketTypeId], references: [id])
  ticketTypeId String
  rowLabel     String     // "A", "B", "C"
  seatNumber   Int        // 1, 2, 3...
  status       SeatStatus @default(AVAILABLE)
}

enum SeatStatus {
  AVAILABLE
  HELD        // pessimistic lock — có TTL trên Redis
  BOOKED
}
```

### Booking & Ticket

```prisma
model Booking {
  id            String        @id @default(cuid())
  user          User          @relation(fields: [userId], references: [id])
  userId        String
  event         Event         @relation(fields: [eventId], references: [id])
  eventId       String
  status        BookingStatus @default(PENDING)
  totalAmount   Decimal
  paymentRef    String?       // SePay transaction ID
  tickets       Ticket[]
  createdAt     DateTime      @default(now())
  expiresAt     DateTime      // hold timeout (pessimistic lock)
}

enum BookingStatus {
  PENDING     // đang thanh toán (trong lock window)
  CONFIRMED   // thanh toán xong
  EXPIRED     // hết giờ hold, không thanh toán
  // NO CANCELLED — không hỗ trợ huỷ trong v1
}

model Ticket {
  id           String     @id @default(cuid())
  booking      Booking    @relation(fields: [bookingId], references: [id])
  bookingId    String
  ticketType   TicketType @relation(fields: [ticketTypeId], references: [id])
  ticketTypeId String
  seat         Seat?      @relation(fields: [seatId], references: [id])
  seatId       String?    // null nếu general admission
  qrToken      String     @unique  // JWT signed, dùng để generate QR image
  checkedIn    Boolean    @default(false)
  checkedInAt  DateTime?
}
```

### Venue & Category

```prisma
model Venue {
  id        String  @id @default(cuid())
  name      String
  address   String
  city      String  @default("Ho Chi Minh City")
  latitude  Float
  longitude Float
  events    Event[]
}

model Category {
  id     String  @id @default(cuid())
  name   String  // "Concert", "Festival", "Workshop", "Sports", "Food & Drink"
  slug   String  @unique
  iconUrl String?
  events Event[]
}
```

---

## 5. Màn hình đầy đủ (26 màn hình)

### 5.1 Onboarding / Auth (5 màn hình)

| #   | Tên màn hình   | Route            | Mô tả                                              |
| --- | -------------- | ---------------- | -------------------------------------------------- |
| 1   | Splash         | `Splash`         | Logo + animation, check auth token                 |
| 2   | Onboarding     | `Onboarding`     | 3 slide giới thiệu tính năng                       |
| 3   | Login          | `Login`          | Email + Password, link đến Register/ForgotPassword |
| 4   | Register       | `Register`       | Email, Password, Display Name                      |
| 5   | ForgotPassword | `ForgotPassword` | Nhập email gửi reset link                          |

### 5.2 Khám phá — Bottom Tab: "Explore" (4 màn hình)

| #   | Tên màn hình    | Route            | Mô tả                                                      |
| --- | --------------- | ---------------- | ---------------------------------------------------------- |
| 6   | Home / Feed     | `Home`           | Trending events, categories, upcoming                      |
| 7   | Search & Filter | `Search`         | Search bar + filter sheet (category, date, price, keyword) |
| 8   | Category Detail | `CategoryDetail` | Danh sách sự kiện theo category                            |
| 9   | Map View        | `MapView`        | Bản đồ sự kiện (react-native-maps)                         |

### 5.3 Chi tiết & Đặt chỗ (6 màn hình)

| #   | Tên màn hình         | Route                 | Mô tả                                                    |
| --- | -------------------- | --------------------- | -------------------------------------------------------- |
| 10  | Event Detail         | `EventDetail`         | Thông tin đầy đủ, map mini, ticket types, realtime count |
| 11  | Ticket Selection     | `TicketSelection`     | Chọn loại vé (General Admission)                         |
| 12  | Seat Map             | `SeatMap`             | Grid chọn ghế (Numbered Seating), hold countdown         |
| 13  | Booking Summary      | `BookingSummary`      | Review đơn, tổng tiền, countdown timer                   |
| 14  | Payment              | `Payment`             | SePay sandbox integration                                |
| 15  | Booking Confirmation | `BookingConfirmation` | Thành công, link đến My Tickets                          |

### 5.4 Vé & Lịch sử — Bottom Tab: "Tickets" (3 màn hình)

| #   | Tên màn hình  | Route          | Mô tả                                           |
| --- | ------------- | -------------- | ----------------------------------------------- |
| 16  | My Tickets    | `MyTickets`    | Danh sách vé (upcoming / past), offline từ MMKV |
| 17  | Ticket Detail | `TicketDetail` | QR code hiển thị + thông tin vé, offline        |
| 18  | QR Scanner    | `QRScanner`    | Scan QR (giả lập organizer check-in)            |

### 5.5 Cá nhân hoá (3 màn hình)

| #   | Tên màn hình    | Route             | Mô tả                               |
| --- | --------------- | ----------------- | ----------------------------------- |
| 19  | Favorites       | `Favorites`       | Sự kiện đã yêu thích                |
| 20  | Following       | `Following`       | Organizer đang theo dõi (nếu có)    |
| 21  | Recommendations | `Recommendations` | "Có thể bạn thích" — trending-based |

### 5.6 Tài khoản — Bottom Tab: "Profile" (5 màn hình)

| #   | Tên màn hình       | Route                | Mô tả                                              |
| --- | ------------------ | -------------------- | -------------------------------------------------- |
| 22  | Profile            | `Profile`            | Thông tin user, avatar                             |
| 23  | EditProfile        | `EditProfile`        | Chỉnh sửa tên, avatar (upload Cloudinary)          |
| 24  | Settings           | `Settings`           | Ngôn ngữ (cấu trúc i18n), theme, push notification |
| 25  | NotificationCenter | `NotificationCenter` | Lịch sử thông báo                                  |
| 26  | AboutApp           | `AboutApp`           | Version, links                                     |

**Bottom Tab structure:**

```
Tab 1: Home (Explore)
Tab 2: Search
Tab 3: Tickets (My Tickets)
Tab 4: Profile
```

---

## 6. Core Features — Chi tiết kỹ thuật

### 6.1 Authentication (JWT)

**Flow:**

```
Register → POST /auth/register → trả về { accessToken, refreshToken }
Login    → POST /auth/login    → trả về { accessToken, refreshToken }
Refresh  → POST /auth/refresh  → dùng refreshToken → accessToken mới
```

**Token strategy:**

- `accessToken`: JWT, expire 15 phút, payload `{ sub, email, role }`
- `refreshToken`: opaque token hoặc JWT dài hạn (7 ngày), lưu hash trong DB
- FE lưu cả 2 trong SecureStore (Expo) hoặc Keychain (iOS) / Keystore (Android)
- MST `AuthStore` quản lý token state, TanStack Query axios interceptor tự refresh

**Trade-off ghi chú phỏng vấn:**

> Short-lived access token + long-lived refresh token là pattern chuẩn industry. Access token ngắn để giảm rủi ro nếu bị leak; refresh token lưu server-side hash để có thể revoke (logout all devices).

### 6.2 Ticketing — Hai loại

#### General Admission

- User chọn ticket type → số lượng = 1 (v1) → thanh toán
- `availableSeats` giảm dần, WebSocket broadcast cập nhật live

#### Numbered Seating (Seat Map)

- Render grid từ API: `GET /events/:id/seats` → `{ rows: [{ label, seats: [{ id, number, status }] }] }`
- User tap ghế → FE gửi `POST /seats/:id/hold` → server tạo Redis key `seat:hold:{seatId}` TTL 300s
- Server trả về `{ holdExpiresAt }` → FE hiển thị countdown timer
- Nếu hết TTL mà không thanh toán → Redis keyspace notification kích hoạt release job
- Khi confirm → `POST /bookings` → server tạo Booking + Ticket + set `seat.status = BOOKED`

**Trade-off ghi chú phỏng vấn:**

> Pessimistic locking với Redis TTL + keyspace notification là pattern phổ biến cho ticket booking. Alternative là optimistic lock (check-on-commit) nhưng UX kém hơn vì user có thể hoàn thành form rồi mới biết hết ghế.

### 6.3 Redis Seat Lock — Chi tiết

```
Key:   seat:hold:{seatId}:{userId}
Value: { bookingSessionId, heldAt }
TTL:   300 seconds (5 phút)

Redis config: notify-keyspace-events "Ex"
NestJS subscribe: __keyevent@0__:expired
→ parse key → release seat → broadcast via Socket.io
```

**BullMQ thêm vào:** Job gửi push notification nhắc lịch sự kiện 24h/1h trước.

### 6.4 Real-time WebSocket

**NestJS Gateway:**

```typescript
// Room naming convention
`event:${eventId}` — broadcast khi availableSeats thay đổi

// Events từ server → client
'ticket_count_updated' → { ticketTypeId, availableSeats }
'seat_status_changed'  → { seatId, status }  // cho numbered seating
```

**Client (TanStack Query + Socket.io):**

- Subscribe room khi vào EventDetail screen
- Khi nhận event → `queryClient.setQueryData(...)` update cache trực tiếp (không refetch)
- Unsubscribe khi unmount

### 6.5 Search & Filter

**API:** `GET /events?category=&dateFrom=&dateTo=&priceMin=&priceMax=&q=&page=&limit=`

**DB Query (Prisma):**

```typescript
where: {
  status: 'PUBLISHED',
  categoryId: category ?? undefined,
  startAt: { gte: dateFrom, lte: dateTo },
  ticketTypes: { some: { price: { gte: priceMin, lte: priceMax } } },
  OR: q ? [
    { title: { contains: q, mode: 'insensitive' } },
    { description: { contains: q, mode: 'insensitive' } }
  ] : undefined
}
orderBy: { totalViews: 'desc' }  // trending algorithm đơn giản
```

**DB Index cần có:**

- `Event.status`, `Event.categoryId`, `Event.startAt` — composite index
- `Event.title` — full-text index (PostgreSQL `tsvector`)
- `TicketType.price` — index

### 6.6 Trending / Home Feed Algorithm

**Đơn giản, không ML:**

- `totalViews` tăng mỗi khi user mở EventDetail (`POST /events/:id/view` hoặc upsert)
- Home feed = `ORDER BY totalViews DESC, startAt ASC WHERE startAt > now()`
- "Coming soon" section = sự kiện chưa mở bán nhưng sắp diễn ra
- Có thể thêm `bookingCount` sau để weighted score: `score = views * 0.3 + bookings * 0.7`

### 6.7 Payment — SePay Sandbox

**Flow:**

```
1. Client: POST /bookings → tạo Booking (PENDING) + hold seats
2. Server: tạo SePay payment link → trả về { paymentUrl, bookingId }
3. Client: mở SePay WebView hoặc deep link
4. SePay: callback webhook POST /payments/webhook
5. Server: verify signature → update Booking (CONFIRMED) → tạo Tickets → gửi QR
6. Server: broadcast socket 'seat_status_changed' → release hold
7. Client: nhận push notification "Đặt vé thành công"
```

**Idempotency:** Mỗi booking có `idempotencyKey` để tránh double-charge nếu webhook fire 2 lần.

**Trade-off ghi chú phỏng vấn:**

> Webhook-based confirmation là pattern đúng — client không trust, server verify với provider. Idempotency key cần thiết vì webhook có thể retry.

### 6.8 QR Code & Check-in

**Generate QR:**

```typescript
// qrToken = JWT signed bởi server secret
// payload: { ticketId, eventId, userId, iat }
// Client: hiển thị QR image từ qrToken (dùng react-native-qrcode-svg)
```

**Scan flow (giả lập organizer):**

```
1. Mở QRScanner screen (camera permission)
2. Scan QR → decode JWT → POST /tickets/check-in { qrToken }
3. Server: verify JWT, check checkedIn === false → set checkedIn = true
4. Response: { success, ticketInfo } hoặc { error: "Already checked in" }
```

**Offline QR:** QR image được cache vào MMKV khi có mạng, hiển thị offline từ cache.

### 6.9 Push Notifications (FCM)

| Loại                  | Trigger                   | BullMQ job?        |
| --------------------- | ------------------------- | ------------------ |
| Booking confirmed     | Webhook từ SePay          | Không (immediate)  |
| Event reminder 24h    | 24h trước `event.startAt` | Có — scheduled job |
| Event reminder 1h     | 1h trước `event.startAt`  | Có — scheduled job |
| New event in category | Admin publish event mới   | Có — fan-out job   |

**FCM token:** Lưu per-user, rotate khi user login lại hoặc app refresh.

### 6.10 Offline — My Tickets

- Khi fetch My Tickets thành công → serialize vào MMKV với key `tickets:${userId}`
- QR token lưu cùng → generate QR từ cached token khi offline
- Hiển thị badge "Offline" khi không có mạng
- Chỉ My Tickets offline, không cache events browse

---

## 7. Navigation Architecture

```
RootNavigator
├── AuthNavigator (khi chưa login)
│   ├── SplashScreen
│   ├── OnboardingScreen
│   ├── LoginScreen
│   ├── RegisterScreen
│   └── ForgotPasswordScreen
│
└── MainNavigator (Bottom Tab — khi đã login)
    ├── Tab: Explore
    │   ├── HomeScreen
    │   ├── CategoryDetailScreen
    │   ├── EventDetailScreen          ← shared, accessible từ nhiều tab
    │   ├── TicketSelectionScreen
    │   ├── SeatMapScreen
    │   ├── BookingSummaryScreen
    │   ├── PaymentScreen
    │   └── BookingConfirmationScreen
    │
    ├── Tab: Search
    │   ├── SearchScreen
    │   └── (push EventDetail từ result)
    │
    ├── Tab: Tickets
    │   ├── MyTicketsScreen
    │   ├── TicketDetailScreen
    │   └── QRScannerScreen
    │
    └── Tab: Profile
        ├── ProfileScreen
        ├── EditProfileScreen
        ├── FavoritesScreen
        ├── FollowingScreen
        ├── RecommendationsScreen
        ├── NotificationCenterScreen
        ├── SettingsScreen
        └── AboutAppScreen
```

**MapView** accessible từ Search tab hoặc floating button trên Home.

---

## 8. State Management

### MST Stores (global, persistent)

```typescript
RootStore
├── AuthStore         // user, tokens, login/logout actions
├── NotificationStore // unread count, notification list
└── AppStore          // theme, language, onboarding seen
```

### Zustand Stores (local/session, không persist)

```typescript
useBookingStore // seat selection, ticket choice, hold state, countdown
useFilterStore // active filters trên Search screen
useMapStore // visible region, selected pin
```

### TanStack Query (server state)

```
events list         → queryKey: ['events', filters]
event detail        → queryKey: ['event', eventId]
seat map            → queryKey: ['seats', eventId]
my tickets          → queryKey: ['myTickets', userId]
notifications       → queryKey: ['notifications', userId]
```

---

## 9. API Endpoints — NestJS Modules

### Auth

```
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
```

### Events

```
GET  /events                    ?category&dateFrom&dateTo&priceMin&priceMax&q&page&limit
GET  /events/:id
POST /events/:id/view           (tăng totalViews)
GET  /events/:id/seats          (cho numbered seating)
GET  /categories
```

### Seats

```
POST /seats/:id/hold            (pessimistic lock)
DELETE /seats/:id/hold          (release nếu user cancel)
```

### Bookings

```
POST /bookings                  (tạo booking + hold)
GET  /bookings                  (my bookings)
GET  /bookings/:id
```

### Tickets

```
GET  /tickets                   (my tickets, có cache offline)
GET  /tickets/:id
POST /tickets/check-in          { qrToken }
```

### Payments

```
POST /payments/initiate         { bookingId } → { paymentUrl }
POST /payments/webhook          (SePay callback — public, verify signature)
```

### Users

```
GET  /users/me
PATCH /users/me                 (edit profile)
POST /users/me/avatar           (upload → Cloudinary)
GET  /users/me/favorites
POST /users/:eventId/favorite
DELETE /users/:eventId/favorite
GET  /notifications
PATCH /notifications/:id/read
```

---

## 10. Edge Cases & Business Rules

### Booking

- **Seat hold timeout:** Nếu user không thanh toán trong 5 phút → Redis TTL expired → keyspace notification → server release seat → WebSocket broadcast → UI cập nhật seat về AVAILABLE
- **Concurrent hold:** Nếu 2 user cùng hold 1 ghế → Redis `SET NX` (atomic) → người thứ 2 nhận lỗi 409 → UI hiển thị "Ghế vừa được chọn bởi người khác"
- **Payment webhook retry:** Verify idempotency key trước khi process → nếu đã CONFIRMED thì return 200 nhưng không process lại
- **Booking expiry:** Mỗi Booking có `expiresAt = now() + 5min` → BullMQ job check expired bookings → update EXPIRED → release seats

### QR & Check-in

- **QR đã dùng:** `checkedIn = true` → server trả lỗi "Vé đã được check-in lúc {time}"
- **QR giả:** JWT signature invalid → server reject ngay
- **QR hết hạn:** Không expire — QR tồn tại vĩnh viễn (JWT không có `exp` field cho ticket)

### Events

- **Sold Out:** `availableSeats = 0` → status tự động = `SOLD_OUT` (trigger hoặc check trong booking service) → vẫn hiển thị, ẩn nút đặt vé
- **Event đã qua:** `startAt < now()` → hiển thị trong "Past Events" trên My Tickets, không cho đặt mới

### Auth

- **Refresh token expired:** → 401 → MST AuthStore clear tokens → redirect về Login
- **Multiple devices:** Refresh token mới ghi đè cũ (không hỗ trợ multi-device trong v1)

---

## 11. Deep Linking

**Scheme:** `eventhub://`

| URL                      | Màn hình                  |
| ------------------------ | ------------------------- |
| `eventhub://event/:id`   | EventDetailScreen         |
| `eventhub://ticket/:id`  | TicketDetailScreen        |
| `eventhub://booking/:id` | BookingConfirmationScreen |

**Config:** React Navigation linking config, handle cold start (app chưa mở) và warm start.

---

## 12. Image & Media

**Upload flow (avatar/event cover):**

```
1. User chọn ảnh từ gallery/camera
2. Client: resize/compress ảnh (react-native-image-picker)
3. Client: POST /users/me/avatar (multipart/form-data) → NestJS
4. NestJS: upload lên Cloudinary → trả về { imageUrl }
5. NestJS: update User.avatarUrl trong DB
6. Client: invalidate TanStack Query → refetch profile
```

**Cloudinary transformations:** Auto-format (WebP/AVIF), resize theo device, lazy load.

---

## 13. Seed Data Strategy

**Không có Organizer role** → data tạo qua:

1. **Crawler script** (Node.js): Crawl Ticketbox.vn hoặc Eventbrite lấy event thật ở HCMC
2. **Prisma seed script**: Transform data + insert vào DB với `prisma db seed`
3. **Faker.js**: Generate user giả, bookings giả để test trending algorithm

**Script location:** `backend/prisma/seed.ts`

---

## 14. i18n Structure

**Không cần đa ngôn ngữ ngay**, nhưng để sẵn cấu trúc:

- Dùng `i18n-js` (đã có trong Ignite)
- Tất cả string UI đặt trong `app/i18n/vi.ts`
- Không hard-code string tiếng Việt trực tiếp trong component

---

## 15. Definition of Done (per feature)

Mỗi feature/screen chỉ được xem là DONE khi:

- [ ] Chạy được, không crash
- [ ] Không có lỗi lint/TypeScript
- [ ] Loading state (skeleton hoặc spinner)
- [ ] Error state (toast hoặc inline error message)
- [ ] Empty state (khi không có data)
- [ ] Tên biến/hàm rõ ràng, comment tại logic phức tạp
- [ ] Dev có thể giải thích lại luồng hoạt động

---

## 16. Thứ tự Implementation (Recommended Phases)

### Phase 1 — Foundation (2-3 tuần)

1. Setup NestJS project, Prisma schema, PostgreSQL
2. Auth module (register, login, JWT, refresh)
3. RN: Auth screens (Login, Register), MST AuthStore, TanStack Query setup
4. Navigation structure (Root + Auth + Main navigators)

### Phase 2 — Core Browse (2 tuần)

5. Events API (list + filter + detail + view count)
6. Categories API + seed data (crawler script)
7. RN: Home, Search, Filter, CategoryDetail, EventDetail screens
8. react-native-maps tích hợp (EventDetail mini map + MapView screen)

### Phase 3 — Booking Flow (3 tuần)

9. TicketType API, Seat API
10. Redis seat hold + keyspace notification setup
11. BullMQ setup + booking expiry job
12. RN: TicketSelection, SeatMap (grid), BookingSummary screens
13. Booking API (create booking, hold seats)

### Phase 4 — Payment & Tickets (2 tuần)

14. SePay sandbox integration (server side + webhook)
15. Payment screen + SePay WebView/redirect
16. BookingConfirmation screen
17. Tickets API + QR token generation
18. RN: MyTickets, TicketDetail (QR display), MMKV offline cache

### Phase 5 — Real-time & Notifications (2 tuần)

19. Socket.io Gateway (NestJS) + room per event
20. RN: Socket.io client, live seat count trên EventDetail
21. FCM setup (server + client)
22. BullMQ scheduled jobs (event reminders)
23. NotificationCenter screen

### Phase 6 — Polish & Extras (2 tuần)

24. QR Scanner screen (check-in giả lập)
25. Favorites, Profile, EditProfile, Settings
26. Trending algorithm + Recommendations screen
27. Deep linking setup
28. Sentry + Firebase Analytics tích hợp
29. Husky + ESLint + Prettier final setup

---

## 17. Quy tắc làm việc với AI Coding Assistant

1. **Trước mỗi module lớn:** AI đề xuất kế hoạch ngắn → đợi xác nhận → mới code
2. **Không generate toàn app 1 lần** — từng screen/feature một
3. **Mỗi phần code quan trọng:** AI giải thích lý do chọn cách này + trade-off
4. **Tuân theo Ignite convention** — không tự ý đổi cấu trúc thư mục
5. **Khi không chắc:** Hỏi lại, không tự đoán
6. **Comment tiếng Việt** tại các điểm logic phức tạp (real-time, state sync, lock mechanism)

---

**Action item (làm ngay, song song, không chặn Phase 1-3):**
Đăng ký tài khoản dev tại `my.dev.sepay.vn`, sau đó liên hệ SePay để
được kích hoạt. Không code `PaymentModule` cho tới khi tài khoản được
kích hoạt và có thể test webhook thật.

### 18.2 Backlog — chưa làm ở v1

- **Đối soát định kỳ (reconciliation)**: xử lý case "tiền vào nhưng
  booking đã EXPIRED". Note lại, triển khai ở phase sau khi Payment
  Module đã chạy ổn định — chưa cần trong Phase 4.
- **Promo code / mã giảm giá**: để dành cho v2. Khi thiết kế
  `Booking` schema ở Phase 1, cân nhắc chừa sẵn field
  `discountCode String?` và `discountAmount Decimal?` (nullable,
  không dùng ở v1) để tránh phải migrate lại sau.
  _SPEC.md này là living document — cập nhật khi có quyết định thay đổi._
