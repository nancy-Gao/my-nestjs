import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { BodyparserMiddleware } from '../bodyparser.middleware';

@Module({
  providers: [HotelsService],
  controllers: [HotelsController],
})
export class HotelsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 模块注册中间件
    consumer.apply(BodyparserMiddleware)
      .forRoutes('hotels')
  }
}
