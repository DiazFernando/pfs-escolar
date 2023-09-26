import { CiudadEstudiante } from "src/ciudad/entities/ciudad_estudiante.entity";
import { Clase } from "src/clases/entities/clase.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'estudiantes'})
export class Estudiante {
    [x: string]: any;
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    apellido:string;

    @Column()
    fechaDeNacimiento:Date;

    @ManyToMany(()=>Clase,clases=>clases.estudiantes)
    clases:Clase[];

    @OneToMany(()=> CiudadEstudiante,domicilios=>domicilios.estudiante)
    public domicilios:CiudadEstudiante[];

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

    /*public setFechaDeNacimiento(:string){
        this.apellido=apellido;
    }*/


}