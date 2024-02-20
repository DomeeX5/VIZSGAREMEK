import {Module, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {PrismaService} from "../prisma.service";
import {APP_PIPE} from "@nestjs/core";
import {AuthModule} from "../auth/auth.module";
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";


@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
      UsersService,
      PrismaService,
      JwtService,
      AuthService,
      {
        provide: APP_PIPE,
        useValue: new ValidationPipe({ transform: true })
      }],
    exports: [UsersService]
})
export class UsersModule {}
