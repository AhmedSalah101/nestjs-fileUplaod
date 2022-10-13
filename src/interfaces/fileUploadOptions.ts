import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export interface FileUploadInterceptorOptions {
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
  fieldName: string;
  path?: string;
}
