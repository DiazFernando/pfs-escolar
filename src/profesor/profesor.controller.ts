import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post('agregar-domicilio')
  async addDomicilio(@Body() body: any):Promise<any> {
    return this.profesorService.createDomicilio(body);
  }

  @Post()
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  @Get('/all')
  findAll() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profesorService.findOne(id);
  }

  @Put('modificar/:id')
  update(@Param('id') id: number, @Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.update(id, createProfesorDto);
  }

  @Delete('eliminar/:id')
  remove(@Param('id') id: number) {
    return this.profesorService.remove(id);
  }
}
