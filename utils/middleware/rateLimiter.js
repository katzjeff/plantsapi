import rateLimiter from "express-rate-limit";

//Global rate limiter
export const globalLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 1000,
});

//Users created limiter
export const userLimiter = rateLimiter({
  windowMs: 2 * 60 * 1000,
  max: 3,
});

//Created, updated or deleted plants limiter
export const createdPlants = rateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 20,
});
