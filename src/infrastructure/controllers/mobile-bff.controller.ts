import { Controller, Get } from '@nestjs/common';
import { PropertyService } from '../../application/property/property.service';

@Controller('api/v1/mobile/properties')
export class MobileBffController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async getPropertiesForMobile() {
    const rawProperties = await this.propertyService.getAllPropertiesRooms();
    const mobileData = rawProperties.map((prop) => {
      const availableRooms = prop.rooms.filter((room) => room.isAvailable);
      const startingPrice =
        prop.rooms.length > 0
          ? Math.min(...prop.rooms.map((room) => room.pricePerMonth))
          : 0;

      return {
        id: prop.id,
        name: prop.name,
        address: prop.address,
        status: availableRooms.length > 0 ? 'Tersedia' : 'Penuh',
        price_start_from: startingPrice,
      };
    });

    return {
      success: true,
      platfrom: 'Mobile',
      data: mobileData,
    };
  }
}
