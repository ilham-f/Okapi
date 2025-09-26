export const ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  STAFF: "staff"
} as const

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Anda tidak memiliki izin untuk mengakses resource ini.",
  NOT_FOUND: "Data tidak ditemukan.",
  SERVER_ERROR: "Terjadi kesalahan pada server."
} as const
