import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import {UsersService} from "../users/service/users.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PrismaService} from "../prisma/prisma.service";
import {JwtStrategy} from "./strategies/jwt-strategy";
import PrismaModule from "../prisma/prisma.module";

@Module({
  providers: [
      AuthService,
      UsersService,
      JwtStrategy
  ],
  controllers: [AuthController],
  imports: [
      JwtModule.register({
        secret: process.env.jwt_secret,
        signOptions: { expiresIn: '7d'},
      }),
      PrismaModule
  ],
    exports: [AuthService]
})
export class AuthModule {}
