import {HttpStatus, Module, ValidationPipe} from '@nestjs/common';
import { UsersService } from './service/users.service';
import {PrismaService} from "../prisma/prisma.service";
import {APP_PIPE} from "@nestjs/core";
import {AuthModule} from "../auth/auth.module";
import {AuthService} from "../auth/service/auth.service";
import {JwtService} from "@nestjs/jwt";
import PrismaModule from "../prisma/prisma.module";


@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [
      UsersService,
      JwtService,
      AuthService,
      {
        provide: APP_PIPE,
        useValue: new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
      }],
    exports: [UsersService]
})
export class UsersModule {}
