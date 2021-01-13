import {
  Controller,
  Header,
  Post,
  Redirect,
  Query,
  Req,
  Param,
  HostParam,
  Get,
  UseGuards,
  ParseIntPipe,
  UseFilters,
  HttpException, UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthpartGuard } from 'src/authpart.guard';
import { HotelsService } from './hotels.service';
import { HttppartexceptionFilter } from '../httppartexception.filter';
import { ResponsepartInterceptor } from 'src/responsepart.interceptor';
import { Role } from 'src/role.decorator';
import { RoleGuard } from '../role.guard';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelService: HotelsService) {}

  @Post(':id') // 动态路由 参数
  @Header('Cache-Control', 'none')
  @Redirect('/index/a')
  create(@Query('version') version, @Req() request: Request, @Param() param, @HostParam('account') account: string) : string | Object {
    console.log(version, request.query, account);
    if (version && version === '5') {
      // 动态定义重定向地址
      return { url: 'https://docs.nestjs.com/v5/' };
    }
    return 'create new hotels';
  }

  @Get(':id')
  @UseGuards(AuthpartGuard) // 局部注册guard
  // @UsePipes(...)
  @UseFilters(HttppartexceptionFilter)
  @UseInterceptors(ResponsepartInterceptor)
  @Role('role', 'admin')
  @UseGuards(RoleGuard)
  getName(@Param('id', ParseIntPipe) id:number) {
    console.log('get name');
    // throw new HttpException({message: 'auto'}, 400);
    return this.hotelService.getHotelsName();
  }

}
