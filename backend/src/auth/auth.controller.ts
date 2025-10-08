import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    async getAuth(
        @Query('user_id') umail: string,
        @Query('password') password: string,
    ) {
        return await this.authService.getAuth(umail, password);
    }
}
