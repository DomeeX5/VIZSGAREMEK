import {Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./service/auth.service";
import {NextFunction} from "express";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) {}

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