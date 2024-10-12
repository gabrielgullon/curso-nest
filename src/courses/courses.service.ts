import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable() // singleton
export class CoursesService {
  private courses: Course[] = [
    {
      id: 'NBZOTB3',
      name: 'NestJs',
      description: 'Eu eiusmod minim duis ipsum.',
      tags: ['node.js', 'ts', 'nestjs']
    }
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find((c) => c.id === id);

    if (!course) {
      throw new NotFoundException(`Course id ${id} not found`);

      //       throw new HttpException(
      //         `Course id ${id} not found`,
      //         HttpStatus.NOT_FOUND
      //       );
    }

    return course;
  }

  create(newCourse: any) {
    this.courses.push(newCourse);
    return newCourse;
  }

  update(id: string, toUpdate: any) {
    const existingCourse = this.findOne(id);
    if (existingCourse as any) {
      const idx = this.courses.findIndex((c) => c.id === id);

      this.courses[idx] = {
        id,
        ...toUpdate
      };
    }
  }

  remove(id: string) {
    const idx = this.courses.findIndex((c) => {
      return c.id === id;
    });
    if (idx >= 0) {
      this.courses.splice(idx, 1);
    }
  }
}
