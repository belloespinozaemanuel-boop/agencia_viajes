import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Controller('reservas')
export class ReservasController {
    constructor(private readonly reservasService: ReservasService) { }

    @Post()
    create(@Body() createReservaDto: CreateReservaDto) {
        return this.reservasService.create(createReservaDto);
    }

    @Get()
    findAll() {
        return this.reservasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.reservasService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateReservaDto: UpdateReservaDto) {
        return this.reservasService.update(id, updateReservaDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.reservasService.remove(id);
    }
}