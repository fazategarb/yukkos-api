import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../../domain/entities/property.entity';
import { Room } from '../../domain/entities/room.entity';
import { MobileBffController } from '../../infrastructure/controllers/mobile-bff.controller';
import { WebBffController } from '../../infrastructure/controllers/web-bff.controller';
import { PropertyService } from './property.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Room])],
  controllers: [MobileBffController, WebBffController],
  providers: [PropertyService],
  exports: [TypeOrmModule],
})
export class PropertyModule {}
