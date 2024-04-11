import { Module } from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
import {PrismaService} from "../prisma/prisma.service";
import PrismaModule from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
