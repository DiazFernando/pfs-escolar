import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CiudadDto } from './dto/CiudadDto';

@Injectable()
export class CiudadService {

    private ciudades:Ciudad[]=[];

    constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository:Repository<Ciudad>
    ){}

    async findAllRaw():Promise<Ciudad[]>{
        this.ciudades=[];
        let datos = await this.ciudadRepository.query("select * from ciudad");

        datos.forEach(element => {
            let ciudad : Ciudad = new Ciudad(element["nombre"]);
            this.ciudades.push(ciudad);
        });
        return this.ciudades;
    }

    async findAllOrm():Promise<Ciudad[]>{
        return await this.ciudadRepository.find();
    }

    async findById(id:number):Promise<Ciudad>{
        try{
            const criterio:FindOneOptions={ where :{id:id}};
            let ciudad :Ciudad = await this.ciudadRepository.findOne(criterio);
            if(ciudad)
                return ciudad
            else
                throw new Error('No se encuentra la ciudad');
        }
        catch(error){
            throw new HttpException({
                status:HttpStatus.CONFLICT,
                error:'Error en ciudad - ' + error,

            },HttpStatus.NOT_FOUND)
        }
    }

    async create(ciudadDTO:CiudadDto): Promise<boolean>{
        try{
            let ciudad:Ciudad = await this.ciudadRepository.save(new Ciudad(ciudadDTO.nombre));
        if(ciudad)

        return true;
            else
                throw new Error('No se pudo crear la ciudad');
        }
        catch(error){
            throw new HttpException({
                status:HttpStatus.NOT_FOUND,
                error:'Error en ciudad - ' + error,

            },HttpStatus.NOT_FOUND)
        }
    }

}
