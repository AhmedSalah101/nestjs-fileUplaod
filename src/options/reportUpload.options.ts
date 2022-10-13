import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileUploadInterceptorOptions } from 'src/interfaces';

const FileUploadFilter: MulterOptions['fileFilter'] = (req, file, callback) => {
  if (!file.mimetype.includes('pdf')) {
    return callback(new BadRequestException('Report type is not valid'), false);
  }
  callback(null, true);
};

export const reportUploadOptions: FileUploadInterceptorOptions = {
  fieldName: 'file',
  fileFilter: FileUploadFilter,
  path: '/reports',
  limits: {
    fileSize: 1024 * 1024,
  },
};
