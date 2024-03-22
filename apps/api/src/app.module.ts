import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import {PrismaService} from "./prisma/prisma.service";
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
      UsersModule,
      AuthModule,
      ProductModule,
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../../../', 'client', 'dist'),
      }),
      CartModule,
      OrderModule,
  ],
})
export class AppModule {}
