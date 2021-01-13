import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {plainToClass} from 'class-transformer';
import { validate } from 'class-validator';

// 自定义的校验
@Injectable()
export class ValidationPipe implements PipeTransform {
  // value 当前处理的参数 ，metadata.metatype是属性元类型
  async transform(value: any, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype
    console.log(metadata.metatype, '元类型')
    console.log('进入全局管道');
    if(!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // plainToClass方法将普通的javascript对象转换为特定类的实例
    const object = plainToClass(metatype, value);
    // 验证该对象返回出错的数组
    const errors = await validate(object);
    if(errors.length > 0) {
      // 将错误信息中的第一个内容返回给异常过滤器
      let errormsg = errors.shift().constraints;
      throw new BadRequestException(errormsg);
    }
    return value;
  }
  // 验证属性值的元类型是string、boolean、number、array、object的一种
  private toValidate(metatype:any):boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
