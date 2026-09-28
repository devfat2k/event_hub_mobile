import { Translations } from "./en"

const vi: Translations = {
  common: {
    ok: "OK",
    cancel: "Huỷ",
    back: "Quay lại",
  },
  errorScreen: {
    title: "Đã xảy ra lỗi!",
    friendlySubtitle:
      "Có gì đó không ổn. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu lỗi tiếp tục xảy ra.",
    reset: "KHỞI ĐỘNG LẠI",
  },
  emptyStateComponent: {
    generic: {
      heading: "Chưa có dữ liệu",
      content: "Không tìm thấy dữ liệu. Thử làm mới hoặc quay lại sau.",
      button: "Thử lại",
    },
  },
}

// Các namespace cho EventHub sẽ thêm vào theo từng Phase:
// - authScreen: { login, register, forgotPassword }
// - homeScreen: { trending, upcoming, seeAll }
// - eventDetail: { bookNow, soldOut, about, venue, schedule }
// - ticketSelection: { selectType, proceed }
// - seatMap: { holdCountdown, seatHeld, seatTaken }
// - bookingSummary: { total, confirmAndPay }
// - myTickets: { upcoming, past, offline }
// - ticketDetail: { qrCode, checkedIn }
// - profile: { editProfile, settings, logout }
// - notifications: { markAllRead }
// - errors: { networkError, sessionExpired, seatUnavailable }

export default vi
