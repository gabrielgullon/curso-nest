import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable() // singleton
export class CoursesService {
  // private courses: Course[] = [
  //   {
  //     id: 'NBZOTB3',
  //     name: 'NestJs',
  //     description: 'Eu eiusmod minim duis ipsum.',
  //     tags: ['node.js', 'ts', 'nestjs']
  //   }
  // ];

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}

  async findAll() {
    return await this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course id ${id} not found`);

      //       throw new HttpException(
      //         `Course id ${id} not found`,
      //         HttpStatus.NOT_FOUND
      //       );
    }

    return course;
  }

  async create(newCourse: any) {
    const course = this.courseRepository.create(newCourse);
    return this.courseRepository.save(course);
  }

  async update(id: number, toUpdate: any) {
    const course = await this.courseRepository.preload({ ...toUpdate, id });
    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }
    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return this.courseRepository.remove(course);
  }
}
