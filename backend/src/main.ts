import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  app.enableCors({ origin: process.env.APP_BASE_URL });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
