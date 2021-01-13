import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth.guard';
import { BodyparserMiddleware } from './bodyparser.middleware';
import { HttpexceptionFilter } from './httpexception.filter';
import { ResponseInterceptor } from './response.interceptor';
import { ValidationPipe } from './validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new BodyparserMiddleware().use); // 全局注册中间件
  app.useGlobalGuards(new AuthGuard()); // 全局注册guard
  app.useGlobalInterceptors(new ResponseInterceptor()); // 全局注册
  app.useGlobalPipes(new ValidationPipe()); // 全局注册pipe
  app.useGlobalFilters(new HttpexceptionFilter());
  await app.listen(3000);
}
bootstrap();
