import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"

export function middleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.json({ message: "Token not found" });
    }

    const token = authHeader.split(" ")[1]; 

    if (!token) {
        return res.json({ message: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.json({ message: "Invalid or expired token" });
    }
}
