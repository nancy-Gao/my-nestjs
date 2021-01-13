import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


interface Response<T> {
    data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    console.log('进入全局拦截器ResponseInterceptor');
    return next.handle().pipe(map(data=> {
      console.log('进入全局拦截器ResponseInterceptor返回内容');
      return {data: data, ErrorCode: 0, path: request.url}
    }));
  }
}
