import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'escuela'})
export class Escuela {
    
    //atributos o estados
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    domicilio:string;

    //constructor
    constructor(nombre:string,domicilio:string){
        this.nombre = nombre;
        this.domicilio = domicilio
    }

    //metodos
    public getId():number{
        return this.id;
    }

    public getNombre():string{
        return this.nombre;
    }

    public setNombre(nombre:string){
        this.nombre = nombre;
    }

    public getDomicilio():string{
        return this.domicilio;
    }

    public setDomicilio(domicilio:string){
        this.domicilio = domicilio;
    }
}
