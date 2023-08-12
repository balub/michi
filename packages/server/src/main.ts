import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: process.env.WHITELISTED_ORIGINS.split(','),
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
