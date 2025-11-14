/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    // ✅ Si es una excepción HTTP estándar
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseObj = exception.getResponse();
      message =
        typeof responseObj === 'string'
          ? responseObj
          : (responseObj as any).message || responseObj;
    }

    // ✅ Si es un error de JS (TypeError, ReferenceError, etc.)
    else if (exception instanceof Error) {
      message = exception.message;
    }

    // ✅ Log detallado en consola o logs
    this.logger.error(
      `Status: ${status} | Message: ${message} | Stack: ${(exception as Error)?.stack}`,
    );

    // ✅ Enviar una respuesta clara al cliente
    const errorResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: status,
      error: message,
    };

    response.status(status).json(errorResponse);
  }
}
