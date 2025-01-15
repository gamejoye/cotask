import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { IApiResult } from '../types/response.type';

@Injectable()
export class ResTransformInterceptor<T> implements NestInterceptor<T, IApiResult<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResult<T>> {
    const response: Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data: T) => {
        const transformed = {
          statusCode: response.statusCode as HttpStatus,
          data: data,
          message: 'success',
        };
        return transformed;
      })
    );
  }
}
