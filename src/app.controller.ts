import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserRegisterDto } from './dto';
import { FileUploadInterceptor } from './fileUpload.interceptor';
import { avatarUploadOptions, reportUploadOptions } from './options';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() newUser: UserRegisterDto): string {
    return;
  }

  @Post('avatar')
  @UseInterceptors(FileUploadInterceptor(avatarUploadOptions))
  uploadAvatar(@UploadedFile() file: Express.Multer.File): string {
    return;
  }

  @Post('report')
  @UseInterceptors(FileUploadInterceptor(reportUploadOptions))
  uploadReport(@UploadedFile() file: Express.Multer.File): string {
    return;
  }
}
