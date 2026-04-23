import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Mendaftarkan pengguna baru (Pemilik atau Pencari Kos)' })
  @ApiResponse({ status: 201, description: 'User berhasil didaftarkan.' })
  @ApiResponse({ status: 409, description: 'Email sudah terdaftar.' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}