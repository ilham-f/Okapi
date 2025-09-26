import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // maksimal 100 request / 15 menit
  message: { success: false, message: "Too many requests, please try again later." },
});
