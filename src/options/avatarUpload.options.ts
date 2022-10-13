import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileUploadInterceptorOptions } from 'src/interfaces';

const FileUploadFilter: MulterOptions['fileFilter'] = (req, file, callback) => {
  console.log('filename : ', file.fieldname);

  if (!file.mimetype.includes('jpeg')) {
    return callback(
      new BadRequestException('The image type for avatar is not valid'),
      false,
    );
  }
  callback(null, true);
};

export const avatarUploadOptions: FileUploadInterceptorOptions = {
  fieldName: 'file',
  fileFilter: FileUploadFilter,
  path: '/avatar',
  limits: {
    fileSize: 1024 * 1024,
  },
};
