import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelsService {
    getHotelsName() {
      return 'hotels'
    }
}
