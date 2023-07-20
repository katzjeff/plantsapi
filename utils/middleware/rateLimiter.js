import rateLimiter from "express-rate-limit";

//Global rate limiter
export const globalLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  message:
    "You have exceeded your request limit. Please try again after 10minutes",
});

//Deleted plants limiter
export const deletePlants = rateLimiter({
  windowMs: 20 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  message:
    "Sorry, you have exceeded your delete request limits for now. Please try again after 20 minutes. Thank you.",
});

//Created, and updated plants limiter
export const createdPlants = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  message:
    "Sorry, you have exceeded your request limits for now. Please try again after 10 minutes. Thank you.",
});
