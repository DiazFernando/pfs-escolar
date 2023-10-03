import { IsNotEmpty } from "class-validator";
import { CiudadEstudiante } from "src/ciudad/entities/ciudad_estudiante.entity";
import { Clase } from "src/clases/entities/clase.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstudianteClase } from "./estudiante_clase.entity";

@Entity({name: 'estudiantes'})
export class Estudiante {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    nombre:string;

    @Column()
    @IsNotEmpty()
    apellido:string;

    @Column()
    fechaDeNacimiento:Date;

    @OneToMany(()=>EstudianteClase,estudianteclases=>estudianteclases.estudiante)
    estudianteClases:EstudianteClase[];

    @OneToMany(()=> CiudadEstudiante,domicilios=>domicilios.estudiante)
    domicilios:CiudadEstudiante[];

    constructor(nombre:string,apellido:string,fechaDeNacimiento:Date){
        this.nombre=nombre;
        this.apellido=apellido;
        this.fechaDeNacimiento=fechaDeNacimiento;
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

    public getApellido():string{
        return this.apellido;
    }

    public setApellido(apellido:string){
        this.apellido=apellido;
    }

    public getFechaDeNacimiento():Date{
        return this.fechaDeNacimiento;
    }

    public setFechaDeNacimiento(nuevaFecha:Date){
        this.fechaDeNacimiento=nuevaFecha;
    }


}