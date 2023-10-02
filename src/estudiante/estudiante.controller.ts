import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Get('raw')
    async getAllRaw():Promise<CreateEstudianteDto[]>{
        return await this.estudianteService.findAllRaw();
    }

    @Get('orm')
    async getAllOrm():Promise<CreateEstudianteDto[]>{
        return await this.estudianteService.findAllOrm();
    }

    @Get(':id')
    async getId(@Param('id') id:number):Promise<CreateEstudianteDto>{
        return await this.estudianteService.findById(id);
    }

    @Post('crear')
    async crearEstudiante(@Body() estudianteDto:CreateEstudianteDto):Promise<boolean>{
        return await this.estudianteService.create(estudianteDto);
    }

    /*@Post('con_relacion')
  async createConRelacion(@Body() createEstudianteDto: CreateEstudianteDto):Promise<boolean> {
    return await this.estudianteService.createConRelacion(createEstudianteDto);
  }*/

    @Post('agregar-domicilio')
    async addDomicilio(@Body() body: any):Promise<any> {
        return this.estudianteService.createDomicilio(body);
    }

    @Put('actualizar/:id')
    async actualizarEstudianteId(@Body() estudianteDto:CreateEstudianteDto, @Param('id') id: number):Promise<String>{
        return await this.estudianteService.update(estudianteDto,id)
    }

    @Delete('eliminar/:id')
    async eliminarEstudiante(@Param('id') id:number):Promise<CreateEstudianteDto>{
        return await this.estudianteService.delete(id);
    }
  
}
