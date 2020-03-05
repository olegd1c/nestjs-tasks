import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = 3003;
  const logger = new Logger('bootstrap');
  
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  logger.log(`Application listing on port ${port}`);
}
bootstrap();
