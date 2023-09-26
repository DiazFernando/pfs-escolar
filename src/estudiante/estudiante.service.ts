import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from 'src/clases/entities/clase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
  constructor(@InjectRepository(Estudiante)
  private estudianteRepository:Repository<Estudiante>,
  @InjectRepository(Clase)
  private claseRepository:Repository<Clase>){}

  create(createEstudianteDto: CreateEstudianteDto) {
    return 'This action adds a new estudiante';
  }

  async createConRelacion (estudianteDto:CreateEstudianteDto):Promise<boolean>{
    let estudiante:Estudiante = new Estudiante(estudianteDto.nombre,estudianteDto.apellido,estudianteDto.fechaDeNacimiento)
    const clase:Clase[] = await this.claseRepository.findOne();
    
    if(clase)
    estudiante.clases= clase;
  await this.estudianteRepository.save(estudiante);
  if(estudiante)
        return true;
    return false;
  }

  findAll() {
    return `This action returns all estudiante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudiante`;
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
