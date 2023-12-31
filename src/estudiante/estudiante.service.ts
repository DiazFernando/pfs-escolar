import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from 'src/clases/entities/clase.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadEstudiante } from 'src/ciudad/entities/ciudad_estudiante.entity';
import { EstudianteClase } from './entities/estudiante_clase.entity';

@Injectable()
export class EstudianteService {

  private estudiantes:Estudiante[] = [];


  constructor(@InjectRepository(Estudiante)
              private estudianteRepository:Repository<Estudiante>,
              @InjectRepository(Clase)
              private claseRepository:Repository<Clase>,
              @InjectRepository(EstudianteClase)
              private estudianteClaseRepository:Repository<EstudianteClase>,
              @InjectRepository(Ciudad)
              private readonly ciudadRepository:Repository<Ciudad>,
              @InjectRepository(CiudadEstudiante)
              private readonly ciudadEstudianteRepository:Repository<CiudadEstudiante>){}

  async findAllRaw():Promise<CreateEstudianteDto[]>{
    this.estudiantes = [];
    let datos = await this.estudianteRepository.query("select * from estudiantes");
    datos.forEach(element => {
        let estudiante : Estudiante = new Estudiante(element['nombre'],element['apellido'],element['fechaDeNacimiento']);
        this.estudiantes.push(estudiante)
    });

    return this.estudiantes;
}

async findAllOrm():Promise<CreateEstudianteDto[]>{
    return await this.estudianteRepository.find();
}

async findById(id :number):Promise<CreateEstudianteDto> {
    try{
        const criterio : FindOneOptions = { where: {id:id} };
        const estudiante : CreateEstudianteDto = await this.estudianteRepository.findOne(criterio);
        if(estudiante)
            return estudiante
        else  
            throw new Error('No se encuentra el estudiante');
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Error en estudiante - ' + error
        },HttpStatus.NOT_FOUND)
    }
    
}

  

async create(estudianteDto:CreateEstudianteDto):Promise<boolean>{
  try{
      let estudiante:Estudiante = await this.estudianteRepository.save(new Estudiante(estudianteDto.nombre,estudianteDto.apellido,estudianteDto.fechaDeNacimiento));
      if(estudiante)
         return true;
     else
         throw new Error('No se pudo crear el estudiante');
  }
  catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en estudiante - ' + error
      },HttpStatus.NOT_FOUND)
  }

}

async createDomicilio(body){
  const { ciudadId, estudianteId,domicilio} = body;

  const estudiante = await this.estudianteRepository.findOne({where:{id:estudianteId}})
  if(!estudiante)
    return 'error - no existe este estudiante'
  
  const ciudad = await this.ciudadRepository.findOne({where:{id:ciudadId}})
  if(!ciudad)
      return 'error - no existe la ciudad para este estudiante'

  const nuevo_domicilio = await this.ciudadEstudianteRepository.findOne({where:{ciudadId:ciudadId,estudianteId:estudianteId}})
  if(nuevo_domicilio)
  return 'estudiante ya tiene domicilio'
return await this.ciudadEstudianteRepository.save(new CiudadEstudiante(ciudadId,estudianteId,domicilio))
}

async addClase(body):Promise<any>{
    const {claseId,estudianteId} = body;
    const estudiante = await this.estudianteRepository.findOne({where:{id:estudianteId}})
    if(!estudiante)
      return `error - no se encontre el estudiante con id ${estudianteId}`;
    const clase = await this.claseRepository.findOne({where:{id:claseId}})
    if(!clase)
      return 'error - no se encontro esa clase';
    const clase_estudiante = await this.estudianteClaseRepository.findOne({where:{claseId:claseId,estudianteId:estudianteId}})
    if(clase_estudiante)
      return 'error - el estudiante ya tiene asignada esa clase';
    return await this.estudianteClaseRepository.save(new EstudianteClase(estudianteId,claseId));
  }

async update(estudianteDto : CreateEstudianteDto, id:number) : Promise<String>{
    try{
        const criterio : FindOneOptions = { where : {id:id} }
        let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
        if(!estudiante)
            throw new Error('no se pudo encontrar el estudiante a modificar ');
        else{
            let estudianteAntiguo = estudiante.getNombre() + ' ' + estudiante.getApellido();
            if((estudianteDto.nombre != null && estudianteDto.nombre != undefined && estudianteDto.nombre != "") && (estudianteDto.apellido != null && estudianteDto.apellido != undefined && estudianteDto.apellido != "") && (estudianteDto.fechaDeNacimiento != null && estudianteDto.fechaDeNacimiento != undefined)){
                estudiante.setNombre(estudianteDto.nombre);
                estudiante.setApellido(estudianteDto.apellido);
                estudiante.setFechaDeNacimiento(estudianteDto.fechaDeNacimiento);
            estudiante = await this.estudianteRepository.save(estudiante);
            return `OK - ${estudianteAntiguo} --> ${estudianteDto.nombre} ${estudianteDto.apellido} ${estudianteDto.fechaDeNacimiento}`
          }else{
              return `datos incorrectos --> ${estudianteDto.nombre} ${estudianteDto.apellido} ${estudianteDto.fechaDeNacimiento}`
            }}
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Error en estudiante - ' + error
        },HttpStatus.NOT_FOUND)
    }

}

async delete(id:number): Promise<any>{
    try{
        const criterio : FindOneOptions = { where : {id:id} }
        let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
        if(!estudiante)
            throw new Error('no puede se eliminar estudiante ');
        else{
            await this.estudianteRepository.remove(estudiante);
            return { id:id,
                    message:'se elimino exitosamente'
                }
            }
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'Error en estudiante - ' + error
        },HttpStatus.NOT_FOUND)
    }
    
}
}
