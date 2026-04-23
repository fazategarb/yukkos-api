import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../domain/entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'Budi Santoso' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'budi@yukkos.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Rahasia123!', minLength: 6 })
  @IsString()
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;

  @ApiProperty({ enum: UserRole, default: UserRole.OWNER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}