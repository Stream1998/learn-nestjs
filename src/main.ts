import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 要指定 NestExpressApplication 范型才有 useStaticAssets 方法
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static'})
  await app.listen(3000);
}
bootstrap();
