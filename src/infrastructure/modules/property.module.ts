import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../../domain/entities/property.entity';
import { Room } from '../../domain/entities/room.entity';
import { MobileBffController } from '../controllers/mobile-bff.controller';
import { WebBffController } from '../controllers/web-bff.controller';
import { PropertyService } from 'src/application/use-cases/property.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Room])],
  controllers: [
    MobileBffController,
    WebBffController
  ],
  providers: [
    PropertyService
  ],
  exports: [TypeOrmModule],
})
export class PropertyModule {}