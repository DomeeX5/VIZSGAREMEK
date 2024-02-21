import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import {HomeModule} from "./home/home.module";
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
      UsersModule,
      HomeModule,
      AuthModule,
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../../../', 'client', 'dist'),
      })
  ],
})
export class AppModule {}
