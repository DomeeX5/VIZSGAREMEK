import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {User} from "@prisma/client";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Email or password is invalid');
        }
        return user;
    }
}