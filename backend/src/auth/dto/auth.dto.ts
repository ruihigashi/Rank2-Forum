import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  umail: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
