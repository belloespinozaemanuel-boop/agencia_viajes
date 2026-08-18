import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PaquetesService } from './paquetes.service';
import { CreatePaqueteDto } from './dto/create-paquete.dto';
import { UpdatePaqueteDto } from './dto/update-paquete.dto';

@Controller('paquetes')
export class PaquetesController {
    constructor(private readonly paquetesService: PaquetesService) { }

    @Post()
    create(@Body() createPaqueteDto: CreatePaqueteDto) {
        return this.paquetesService.create(createPaqueteDto);
    }

    @Get()
    findAll() {
        return this.paquetesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.paquetesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePaqueteDto: UpdatePaqueteDto) {
        return this.paquetesService.update(id, updatePaqueteDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.paquetesService.remove(id);
    }
}