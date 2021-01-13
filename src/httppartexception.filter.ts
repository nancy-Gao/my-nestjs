import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttppartexceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('进入HttppartexceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // HttpException 基础异常类，可自定义内容
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || null;
    let msgLog = {
      status,
      message,
      error: 'part'
    };
    response
    .status(status)
    .json(msgLog);
  }
}
