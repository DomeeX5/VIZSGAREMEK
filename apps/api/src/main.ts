import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {seedProducts} from "../prisma/populateDB";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  //await seedProducts();
  await app.listen(3000);
}

bootstrap();
