import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import swaggerUi from 'swagger-ui-dist';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        ProductModule,
        CartModule,
        OrderModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../../', 'client', 'dist'),
        }),
    ],
})
export class AppModule {}
