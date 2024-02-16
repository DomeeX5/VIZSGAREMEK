import {Module, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {PrismaService} from "../prisma.service";
import {APP_PIPE} from "@nestjs/core";


@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
      UsersService,
      PrismaService,
      {
        provide: APP_PIPE,
        useValue: new ValidationPipe({ transform: true })
      }],
})
export class UsersModule {}
