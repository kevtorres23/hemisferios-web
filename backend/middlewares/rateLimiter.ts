import ratelimit from "../config/upstash.js";
import { Request, Response, NextFunction } from 'express';

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { success } = await ratelimit.limit("my-rate-limit");

        if (!success) {
            return res.status(429).json({
                message: "Too many requests. Please try again later."
            });
        };

        next();

    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
}

export default rateLimiter;