import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'asistencia'})
export class Asistencia {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fecha:Date

}
