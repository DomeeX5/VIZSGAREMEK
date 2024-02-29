import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {seedProducts} from "../prisma/productFiller";
import {seedUsers} from "../prisma/userFiller";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  //await seedProducts();
  //await seedUsers();
  await app.listen(3000);
}

bootstrap();
