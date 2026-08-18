import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDestinoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    pais: string;

    @IsString()
    @IsOptional()
    descripcion?: string;
}