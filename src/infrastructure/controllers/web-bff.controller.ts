import { Controller, Get, Param } from '@nestjs/common';
import { PropertyService } from '../../application/use-cases/property.service';

@Controller('api/v1/web/properties')
export class WebBffController {
    constructor(
        private readonly propertyService: PropertyService
    ) {}

    @Get()
    async getPropertiesForWeb() {
        const rawProperties = await this.propertyService.getAllPropertiesRooms();
        const webData = rawProperties.map(prop => {
            const occupiedRooms = prop.rooms.filter(room => !room.isAvailable);
            const availableRooms = prop.rooms.filter(room => room.isAvailable);
            const monthlyRevenue = occupiedRooms.reduce((sum, room) => sum + room.pricePerMonth, 0);
            const potentialLoss = availableRooms.reduce((sum, room) => sum + room.pricePerMonth, 0);

            return {
                id: prop.id,
                name: prop.name,
                address: prop.address,
                facilities: prop.facilities,

                metrics: {
                    total_rooms: prop.rooms.length,
                    occupied_rooms_count: occupiedRooms.length,
                    available_rooms_count: availableRooms.length,
                    occupancy_rate_percentage: prop.rooms.length > 0
                    ? Math.round((occupiedRooms.length / prop.rooms.length) * 100)
                    : 0
                },

                financials: {
                    monthly_revenue: monthlyRevenue,
                    potential_loss: potentialLoss,
                    maintenance_cost_estimation: 50000
                },

                rooms_detail: prop.rooms.map(room => ({
                    room_id: room.id,
                    number: room.roomNumber,
                    price: room.pricePerMonth,
                    status: room.isAvailable ? 'Kosong' : 'Disewa',
                }))
            };
        });

        return {
            success: true,
            platform: 'Web',
            data: webData
        }
    }
}