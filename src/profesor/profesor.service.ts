import { Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';

@Injectable()
export class ProfesorService {

  constructor(@InjectRepository(Profesor)
              private readonly profesorRepository:Repository<Profesor>,
              @InjectRepository(Ciudad)
              private readonly ciudadRepository:Repository<Ciudad>,
              @InjectRepository(CiudadProfesor)
              private readonly ciudadProfesorRepository:Repository<CiudadProfesor>){}

  create(createProfesorDto: CreateProfesorDto) {
    return 'This action adds a new profesor';
  }

  async createDomicilio(body){
    const { ciudadId, profesorId,domicilio} = body;

    const profesor = await this.profesorRepository.findOne({where:{id:profesorId}})
    if(!profesor)
      return 'error - no existe este profesor'
    
    const ciudad = await this.ciudadRepository.findOne({where:{id:ciudadId}})
    if(!ciudad)
        return 'error - no existe la ciudad para este profesor'

    const nuevo_domicilio = await this.ciudadProfesorRepository.findOne({where:{ciudadId:ciudadId,profesorId:profesorId}})
    if(nuevo_domicilio)
    return 'profesor ya tiene domicilio'
  return await this.ciudadProfesorRepository.save(new CiudadProfesor(ciudadId,profesorId,domicilio))
  }

  findAll() {
    return `This action returns all profesor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profesor`;
  }

  update(id: number, createProfesorDto: CreateProfesorDto) {
    return `This action updates a #${id} profesor`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesor`;
  }
}
