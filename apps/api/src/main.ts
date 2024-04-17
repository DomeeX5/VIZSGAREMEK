import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

/**
 * Bootstrap function to start the NestJS application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  // Swagger configuration
  const config = new DocumentBuilder()
      .setTitle('Webshop')
      .setDescription('Webshop made with NestJS and React')
      .setVersion('1.0')
      .addBearerAuth({type: "http", scheme: 'bearer', bearerFormat: 'JWT'})
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start listening to the specified port
  await app.listen(3000);
}

bootstrap();
