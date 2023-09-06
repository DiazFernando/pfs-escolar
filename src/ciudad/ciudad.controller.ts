import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDto } from "./dto/CiudadDto";

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

    @Post('crear')
    async crearCiudad(@Body() ciudadDTO:CiudadDto):Promise<boolean>{
        return this.ciudadService.create(ciudadDTO);
    }
}
