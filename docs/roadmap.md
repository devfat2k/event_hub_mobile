# Roadmap — EventHub Implementation Phases

Nguồn: SPEC.md (Section 16)

## Phase 1 — Foundation (2-3 tuần)
1. Setup NestJS project, Prisma schema, PostgreSQL
2. Auth module (register, login, JWT, refresh)
3. RN: Auth screens (Login, Register), MST AuthStore, TanStack Query setup
4. Navigation structure (Root + Auth + Main navigators)

## Phase 2 — Core Browse (2 tuần)
5. Events API (list + filter + detail + view count)
6. Categories API + seed data (crawler script)
7. RN: Home, Search, Filter, CategoryDetail, EventDetail screens
8. react-native-maps tích hợp (EventDetail mini map + MapView screen)

## Phase 3 — Booking Flow (3 tuần)
9. TicketType API, Seat API
10. Redis seat hold + keyspace notification setup
11. BullMQ setup + booking expiry job
12. RN: TicketSelection, SeatMap (grid), BookingSummary screens
13. Booking API (create booking, hold seats)

## Phase 4 — Payment & Tickets (2 tuần)
14. SePay sandbox integration (server side + webhook)
15. Payment screen + SePay WebView/redirect
16. BookingConfirmation screen
17. Tickets API + QR token generation
18. RN: MyTickets, TicketDetail (QR display), MMKV offline cache

## Phase 5 — Real-time & Notifications (2 tuần)
19. Socket.io Gateway (NestJS) + room per event
20. RN: Socket.io client, live seat count trên EventDetail
21. FCM setup (server + client)
22. BullMQ scheduled jobs (event reminders)
23. NotificationCenter screen

## Phase 6 — Polish & Extras (2 tuần)
24. QR Scanner screen (check-in giả lập)
25. Favorites, Profile, EditProfile, Settings
26. Trending algorithm + Recommendations screen
27. Deep linking setup
28. Sentry + Firebase Analytics tích hợp
29. Husky + ESLint + Prettier final setup
