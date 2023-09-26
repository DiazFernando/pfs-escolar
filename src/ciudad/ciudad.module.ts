import { Module } from '@nestjs/common';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Ciudad,Escuela,Estudiante,Profesor])],
  controllers: [CiudadController],
  providers: [CiudadService]
})
export class CiudadModule {}
