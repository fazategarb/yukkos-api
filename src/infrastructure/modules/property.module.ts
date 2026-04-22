import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../../domain/entities/property.entity';
import { Room } from '../../domain/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Room])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class PropertyModule {}