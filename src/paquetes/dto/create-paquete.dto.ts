import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreatePaqueteDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsNumber()
    @IsPositive()
    precio: number;

    @IsInt()
    @Min(1)
    capacidad: number;

    @IsInt()
    @IsPositive()
    destinoId: number;
}