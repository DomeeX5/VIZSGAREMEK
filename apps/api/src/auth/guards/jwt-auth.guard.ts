import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

/**
 * Guard that provides JWT-based authentication for routes.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
