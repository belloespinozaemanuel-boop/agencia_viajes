import { Controller, Get, Post, Body } from '@nestjs/common';
import { DestinosService } from './destinos.service';
import { CreateDestinoDto } from './dto/create-destino.dto';

@Controller('destinos')
export class DestinosController {
    constructor(private readonly destinosService: DestinosService) { }

    @Post()
    create(@Body() createDestinoDto: CreateDestinoDto) {
        return this.destinosService.create(createDestinoDto);
    }

    @Get()
    findAll() {
        return this.destinosService.findAll();
    }
}