import { Request, Response, NextFunction } from "express"
import { Logger } from "../../utils/logger"
import { ERROR_MESSAGES } from "../../utils/constants"

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  Logger.error("Unhandled error:", err)

  const statusCode = err.statusCode || 500
  const message = err.message || ERROR_MESSAGES.SERVER_ERROR

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  })
}
