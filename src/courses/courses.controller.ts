import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  //   @Get('/list')
  //   findAll(@Res() response) {
  //     return response.status(200).json({ message: 'Listagem de cursos' });
  //   }

  @Get('/list')
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.courseService.findOne(id);
  }

  @Post()
  create(@Body() createCourseDTO: CreateCourseDTO) {
    return this.courseService.create(createCourseDTO);
  }

  // @Put -- conjunto inteiro de dados de um item

  // @Patch -- apenas uma informação

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCourseDTO: UpdateCourseDTO) {
    return this.courseService.update(id, updateCourseDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: number) {
    // tenho que desestruturar o parametro corretamente
    return this.courseService.remove(id);
  }
}
