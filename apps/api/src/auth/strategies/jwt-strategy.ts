import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as process from "process";

/**
 * Passport strategy for JWT-based authentication.
 */
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    /**
     * Creates an instance of JwtStrategy.
     */
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: `${process.env.jwt_secret}`,
        });
    }

    /**
     * Validates the payload extracted from the JWT token.
     * @param payload - The payload extracted from the JWT token.
     * @returns An object containing user details (user ID and email).
     */
    async validate(payload: any) {
        return {
            user: payload.sub,
            email: payload.email
        };
    }
}
