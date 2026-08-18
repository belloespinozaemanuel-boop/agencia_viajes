import { IsInt, IsPositive, Min } from 'class-validator';

export class CreateReservaDto {
    @IsInt()
    @IsPositive()
    clienteId!: number;

    @IsInt()
    @IsPositive()
    paqueteId!: number;

    @IsInt()
    @Min(1)
    cantidadPersonas!: number;
}