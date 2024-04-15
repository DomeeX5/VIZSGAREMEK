import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { NextFunction } from "express";

/**
 * Middleware for authentication.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    /**
     * Creates an instance of AuthMiddleware.
     * @param authService - The authentication service.
     */
    constructor(private authService: AuthService) {}

    /**
     * Middleware function to check authentication token.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        if (!token) {
            throw new UnauthorizedException('Authorization token is required');
        }
        const userId = await this.authService.getUserIdFromToken(token);
        if (!userId) {
            throw new UnauthorizedException('Invalid token');
        }
        req['user_id'] = userId;
        next();
    }
}
