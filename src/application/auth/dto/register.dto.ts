import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
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

  @ApiProperty({ enum: UserRole, example: UserRole.OWNER, description: 'Pilih sebagai OWNER atau SEEKER' })
  @IsEnum(UserRole, { message: 'Role harus berupa OWNER atau SEEKER' })
  @IsNotEmpty({ message: 'Role tidak boleh kosong' })
  role: UserRole;
}
