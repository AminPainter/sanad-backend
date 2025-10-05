import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod';

type TParsedZodError = {
  code: string;
  values: string[];
  path: string[];
  message: string;
};

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const zodError = exception.getZodError();
    const parsedZodErrors = this.parseZodErrors(zodError as ZodError);
    const humanizedErrorMessage = this.humanizeZodErrors(parsedZodErrors);

    response.json({
      statusCode: status,
      message: humanizedErrorMessage,
      errors: parsedZodErrors,
    });
  }

  private humanizeZodErrors(errors: TParsedZodError[]) {
    return errors.map((err) => `${err.message} at ${err.path[0]}`).join('. ');
  }

  private parseZodErrors(error: ZodError) {
    const parsedErrors = JSON.parse(error.message) as TParsedZodError[];
    return parsedErrors;
  }
}
