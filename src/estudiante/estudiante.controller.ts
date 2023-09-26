import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudianteService.create(createEstudianteDto);
  }

  /*@Post('con_relacion')
  async createConRelacion(@Body() createEstudianteDto: CreateEstudianteDto):Promise<boolean> {
    return await this.estudianteService.createConRelacion(createEstudianteDto);
  }*/

  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudianteDto: CreateEstudianteDto) {
    return this.estudianteService.update(+id, updateEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
