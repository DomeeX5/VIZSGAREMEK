import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import {PrismaService} from "../prisma/prisma.service";
import PrismaModule from "../prisma/prisma.module";

/**
 * Module for handling product-related functionalities.
 */
@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
