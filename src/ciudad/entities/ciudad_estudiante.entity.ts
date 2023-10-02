import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'ciudad_estudiante'})
export class CiudadEstudiante{

    @PrimaryColumn()
    ciudadId:number;

    @PrimaryColumn()
    estudianteId:number;

    @Column()
    direccion:string;

    @ManyToOne(()=>Estudiante,estudiante=>estudiante.domicilios)
    estudiante:Estudiante;

    @ManyToOne(()=>Ciudad,ciudad=>ciudad.domicilios)
    ciudad:Ciudad;

    constructor(ciudadId:number,estudianteId:number,direccion:string){
        this.ciudadId=ciudadId;
        this.estudianteId=estudianteId;
        this.direccion=direccion;
    }


}