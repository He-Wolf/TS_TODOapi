import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe  } from '@nestjs/common';
import { AppModule } from './app.module';
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
  await app.listen(3000);
  Logger.log(`Server started running on http://localhost:3000`, 'Bootstrap');
}
bootstrap();
