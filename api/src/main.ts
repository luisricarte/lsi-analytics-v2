import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bodyparser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyparser.json({ limit: '50mb' }));
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('frontendURL'),
    methods: 'GET, PUT, PATCH, POST, DELETE',
    credentials: true,
  });
  const port = configService.get('port');
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  await app.listen(port, '0.0.0.0');
}
bootstrap();
