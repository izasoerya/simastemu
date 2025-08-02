import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { appendFileSync } from 'fs';
import { join } from 'path';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else {
      const logPath = join(process.cwd(), 'error.log');
      const errorDetails = `[${new Date().toISOString()}] ${request.url}\n${JSON.stringify(exception, Object.getOwnPropertyNames(exception))}\n\n`;
      appendFileSync(logPath, errorDetails);
      status = 400;
      message = 'Bad request';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
