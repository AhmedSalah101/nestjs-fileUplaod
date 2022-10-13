import { IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
