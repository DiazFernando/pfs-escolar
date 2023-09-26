import { Clase } from "src/clases/entities/clase.entity";

export class CreateEstudianteDto {
    readonly nombre:string;
    readonly apellido:string;
    readonly fechaDeNacimiento:Date;
    readonly fk_clases:Clase[];
}
