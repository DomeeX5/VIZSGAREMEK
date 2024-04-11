import { Module } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import {PrismaService} from "../prisma/prisma.service";
import PrismaModule from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
