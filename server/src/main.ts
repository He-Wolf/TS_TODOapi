import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe  } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  app.use(helmet());
  app.enableCors();
  app.use(compression());

  const options = new DocumentBuilder()
    .setTitle('Todo NestJS web API')
    .setDescription('This is a web API built using Típescript and NestJS framework.')
    .setVersion('1.0')
    .addTag('todos')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  Logger.log(`Server started running on http://localhost:3000`, 'Bootstrap');
}
bootstrap();
