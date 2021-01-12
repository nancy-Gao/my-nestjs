import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelsController } from './hotels/hotels.controller';
import { HotelsModule } from './hotels/hotels.module';

@Module({
  imports: [HotelsModule],
  controllers: [AppController, HotelsController],
  providers: [AppService],
})
export class AppModule {}
