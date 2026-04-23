import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Mendaftarkan pengguna baru (Pemilik atau Pencari Kos)',
  })
  @ApiResponse({ status: 201, description: 'User berhasil didaftarkan.' })
  @ApiResponse({ status: 409, description: 'Email sudah terdaftar.' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login untuk mendapatkan JWT Token' })
  @ApiResponse({ status: 200, description: 'Login berhasil, mengembalikan Access Token.'})
  @ApiResponse({ status: 401, description: 'Email atau password salah.'})
  async login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto)
  }
}
