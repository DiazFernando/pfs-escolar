import { Module } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { ClasesController } from './clases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Clase,Profesor,Escuela])],
  controllers: [ClasesController],
  providers: [ClasesService],
})
export class ClasesModule {}
