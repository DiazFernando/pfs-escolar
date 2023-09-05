import { Controller, Get, Param } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';

@Controller('ciudad')
export class CiudadController {

    constructor(private readonly ciudadService:CiudadService){}

    @Get('raw')
    async getAllRaw():Promise<Ciudad[]>{
        return await this.ciudadService.findAllRaw();
    }

    @Get('orm')
    async getAllOrm():Promise<Ciudad[]>{
        return await this.ciudadService.findAllOrm();
    }

    @Get(':id')
    async getId(@Param('id') id:number):Promise<Ciudad>{
        return await this.ciudadService.findById(id);
    }
}
