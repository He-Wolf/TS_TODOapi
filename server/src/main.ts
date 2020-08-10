import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  Logger.log(`Server started running on http://localhost:3000`, 'Bootstrap');
}
bootstrap();
