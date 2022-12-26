import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = req; //1. 제일 먼저 request에 대한 정보 저장
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      //3. 라우터 끝나고('finish'할 때) 실행(로그 기록)
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      this.logger.log(
        //지금은 new Logger('HTTP');로 context를 만들어줘서 그런데 안만들었으면 그냥 Logger.log로 해도 됨.
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next(); //2. 라우터로 이동
  }
}
