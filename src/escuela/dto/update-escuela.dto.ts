import { PartialType } from '@nestjs/mapped-types';
import { CreateEscuelaDto } from './create-escuela.dto';

export class UpdateEscuelaDto extends PartialType(CreateEscuelaDto) {
    readonly nombre : string;
    readonly domicilio : string;
}
