import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import {HomeModule} from "../home/home.module";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [
      UsersModule,
      HomeModule,
      AuthModule,
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../../../', 'client', 'dist'),
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
