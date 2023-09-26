import { Escuela } from "src/escuela/entities/escuela.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'clases'})
export class Clase {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @ManyToOne(()=>Profesor,profesor=>profesor.clases)
    @JoinColumn({name:"id_profesor"})
    profesor:Profesor;

    @ManyToOne(()=>Escuela,escuela=>escuela.clases)
    @JoinColumn({name:"id_escuela"})
    escuela:Escuela;

    @ManyToMany(()=>Estudiante,estudiantes=>estudiantes.clases)
    @JoinTable()
    estudiantes:Estudiante[];


    constructor(nombre:string){
        this.nombre=nombre;
    }

    public getId():number{
        return this.id
    }

    public getNombre():string{
        return this.nombre
    }

    public setNombre(nombre:string){
        this.nombre=nombre;
    }


}
