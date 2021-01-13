##目录

[控制器（controllers)](./docs/controllers.md)

[提供者（providers)](./docs/providers.md)

[模块（modules)](./docs/modules.md)

[中间件（middleware)](./docs/middleware.md)

[异常过滤器（exception filters)](./docs/filters.md)

[管道（pipes)](./docs/pipes.md)

[守卫（guards)](./docs/guards.md)

[拦截器（interceptors)](./docs/interceptors.md)

[自定义装饰器（custom decorators)](./docs/decorators.md)



![请求流程](./docs/requestprocess.jpg)

拦截器作用：

    在函数执行之前/之后绑定额外的逻辑
    转换从函数返回的结果
    转换从函数抛出的异常
    扩展基本函数行为
    根据所选条件完全重写函数 (例如, 缓存目的)

拦截器的执行顺序分为两个部分：

    第一个部分在管道和自定义逻辑(next.handle()方法)之前。
    第二个部分在管道和自定义逻辑(next.handle()方法)之后。

注意：

    同一路由注册多个拦截器时候，优先执行模块中绑定的拦截器，然后其拦截器转换的内容将作为全局拦截器的内容，即包裹两次返回内容：
    
```json
    {
       ErrorCode: 0,
       path: '/index',
       data: {
          ErrorCode: 0,
          path: '/index',
          data: data,
          status: 1,
       }
    }
```

管道作用：

    管道是请求过程中的第四个内容，主要用于对请求参数的验证和转换操作
    项目中使用class-validator class-transformer进行配合验证相关的输入操作内容

注册方式：

        1、全局注册：
        在main.ts中导入需要的模块如：ValidationPipe
        然后使用 app.useGlobalPipes(new ValidationPipe()) 即可
        2、模块注册：
        在需要注册的controller控制器中导入ValidationPipe
        然后从@nestjs/common中导入UsePipes装饰器
        最后直接放置在对应的@Controller()或者@Post/@Get等装饰器之下即可，管道还允许注册在相关的参数上如：@Body/@Query等

注意：

    同一路由注册多个管道的时候，优先执行全局管道，然后再执行模块管道
    
异常过滤器作用:
    
    捕获系统抛出的所有异常，然后自定义修改异常内容，抛出友好的提示。

内置异常类:
    
    注意每个异常抛出的状态码有所不同
    
    BadRequestException — 400
    UnauthorizedException — 401
    ForbiddenException — 403
    NotFoundException — 404
    NotAcceptableException — 406
    RequestTimeoutException — 408
    ConflictException — 409
    GoneException — 410
    PayloadTooLargeException — 413
    UnsupportedMediaTypeException — 415
    UnprocessableEntityException — 422
    InternalServerErrorException — 500
    NotImplementedException — 501
    BadGatewayException — 502
    ServiceUnavailableException — 503
    GatewayTimeoutException — 504

可自定义异常类

注册方式:

    1、全局注册：
        在main.ts中导入需要的模块如：HttpExceptionFilter
        然后使用 app.useGlobalFilters(new HttpExceptionFilter()) 即可
    2、模块注册：
        在需要注册的controller控制器中导入HttpExceptionFilter
        然后从@nestjs/common中导入UseFilters装饰器
        最后直接放置在对应的@Controller()或者@Post/@Get等装饰器之下即可


注意：
    同一路由注册多个过滤器的时候，只会执行一个异常过滤器，优先执行模块中绑定的异常过滤器，如果模块中无绑定异常过滤则执行全局异常过滤器
