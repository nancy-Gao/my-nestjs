import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private hotelService:HotelsService) {} // 全局注入的方式会报错 需要在app.module注入此guard
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('进入AuthGuard')
    return true;
  }
}
