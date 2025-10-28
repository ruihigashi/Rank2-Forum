import { IsEmail, IsOptional, IsString, MaxLength, IsDateString, IsNumber, IsInt } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsDateString()
    created_at?: string;

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    token?: string;
}
