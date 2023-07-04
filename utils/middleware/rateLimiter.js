import rateLimiter from "express-rate-limit";

//Global rate limiter
export const globalLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  message: "You have exceeded your request limit. Please try again after 10minutes"
});

//Users created limiter
export const userLimiter = rateLimiter({
  windowMs: 2 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  message: "Sorry, you have exceeded your request limits for now. Please try again after 2 minutes. Thank you."
});

//Created, updated or deleted plants limiter
export const createdPlants = rateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  message: "Sorry, you have exceeded your request limits for now. Please try again after 5 minutes. Thank you."

});
