import { Injectable, NestMiddleware } from '@nestjs/common';
import {Response, Request} from 'express';

@Injectable()
export class BodyparserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('进入middleware');
    next();
  }
}
