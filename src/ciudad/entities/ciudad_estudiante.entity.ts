import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'ciudad_estudiante'})
export class CiudadEstudiante{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    direccion:string;

    @ManyToOne(()=>Estudiante,estudiante=>estudiante.domicilios)
    estudiante:Estudiante;

    @ManyToOne(()=>Ciudad,ciudad=>ciudad.domicilios)
    ciudad:Ciudad;


}