import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'budi@yukkos.com' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  email: string;

  @ApiProperty({ example: 'Rahasia123!' })
  @IsString()
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  password: string;
}
