import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'ciudad_profesor'})
export class CiudadProfesor{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    direccion:string;

    @ManyToOne(()=>Profesor,profesor=>profesor.domicilios)
    profesor:Profesor;

    @ManyToOne(()=>Ciudad,ciudad=>ciudad.domicilios)
    ciudad:Ciudad;


}