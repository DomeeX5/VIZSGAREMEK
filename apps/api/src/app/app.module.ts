import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import {HomeModule} from "../home/home.module";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
      UsersModule,
      HomeModule,
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '../../../', 'client', 'dist'),
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
