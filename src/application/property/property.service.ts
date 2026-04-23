import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../../domain/entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepo: Repository<Property>,
  ) {}

  async getAllPropertiesRooms() {
    return await this.propertyRepo.find({ relations: ['rooms'] });
  }
}
