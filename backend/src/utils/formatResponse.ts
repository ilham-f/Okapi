export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
}

export function successResponse<T>(data: T, message = "OK"): ApiResponse<T> {
  return { success: true, message, data }
}

export function errorResponse(message = "Error"): ApiResponse<null> {
  return { success: false, message }
}
