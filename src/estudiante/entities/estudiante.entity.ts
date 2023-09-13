import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'estudiantes'})
export class Clase {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    apellido:string;

    @Column()
    fechaDeNacimiento:Date;

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