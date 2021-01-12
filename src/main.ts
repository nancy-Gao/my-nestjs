import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth.guard';
import { BodyparserMiddleware } from './bodyparser.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new BodyparserMiddleware().use); // 全局注册中间件
  app.useGlobalGuards(new AuthGuard()); // 全局注册guard
  await app.listen(3000);
}
bootstrap();
