import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersService} from "../users/users.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {LocalStrategy} from "./strategies/local-strategy";
import {PrismaService} from "../prisma.service";
import {JwtStrategy} from "./strategies/jwt-strategy";
import {RefreshJwtStrategy} from "./strategies/refreshToken.strategy";

@Module({
  providers: [
      AuthService,
      UsersService,
      LocalStrategy,
      JwtStrategy,
      RefreshJwtStrategy,
      PrismaService
  ],
  controllers: [AuthController],
  imports: [
      JwtModule.register({
        secret: process.env.jwt_secret,
        signOptions: { expiresIn: '60s'},
      })
  ],
    exports: [AuthService]
})
export class AuthModule {}
