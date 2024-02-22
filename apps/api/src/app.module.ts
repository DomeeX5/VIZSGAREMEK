import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import {HomeModule} from "./home/home.module";
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import {dbFiller} from "../prisma/populateDB";
import {PrismaService} from "./prisma.service";
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
      UsersModule,
      HomeModule,
      AuthModule,
      ProductModule,
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../../../', 'client', 'dist'),
      }),
      CartModule,
  ],
})
export class AppModule {}
