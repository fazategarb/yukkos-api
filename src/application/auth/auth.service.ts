import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string; userId: string }> {
    const { fullName, email, password, role } = registerDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar di sistem Yukkos');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = this.userRepository.create({
      fullName,
      email,
      passwordHash,
      role,
    });
    await this.userRepository.save(newUser);

    return {
      message: 'Registrasi berhasil',
      userId: newUser.id,
    };
  }

  async login(loginDto: LoginDto) {
    const{ email, password } = loginDto;
    
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      message: 'Login berhasil',
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }
}
