import { FileInterceptor } from '@nestjs/platform-express';
import {
  BadRequestException,
  Injectable,
  mixin,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { diskStorage } from 'multer';
import { FileUploadInterceptorOptions } from 'src/interfaces';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { UPLOADED_FILES_DESTINATION } from './constants';
import { tap } from 'rxjs';
export function FileUploadInterceptor(
  options: FileUploadInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const filesDestination = configService.get(UPLOADED_FILES_DESTINATION);
      const destination = `${filesDestination}${options.path}`;
      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
        }),
        fileFilter: options.fileFilter,
        limits: options.limits,
      };

      this.fileInterceptor = new (FileInterceptor(
        options.fieldName,
        multerOptions,
      ))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      const contentType: string = args[0].switchToHttp().getRequest<Request>()
        .headers['content-type'];
      console.log(contentType);

      if (!contentType.includes('multipart/form-data')) {
        return args[1].handle().pipe(
          tap(() => {
            throw new BadRequestException('Content should be a file');
          }),
        );
      }

      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}
