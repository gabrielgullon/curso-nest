import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

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
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async findAll() {
    return await this.courseRepository.find({
      relations: ['tags']
    });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags']
    });

    if (!course) {
      throw new NotFoundException(`Course id ${id} not found`);

      //       throw new HttpException(
      //         `Course id ${id} not found`,
      //         HttpStatus.NOT_FOUND
      //       );
    }

    return course;
  }

  async create(newCourse: CreateCourseDTO) {
    const tags = await Promise.all(
      newCourse.tags.map((t) => this.preloadTagByName(t))
    );

    const course = this.courseRepository.create({
      ...newCourse,
      tags
    });
    return this.courseRepository.save(course);
  }

  async update(id: number, toUpdate: UpdateCourseDTO) {
    const tags =
      toUpdate.tags &&
      (await Promise.all(toUpdate.tags.map((t) => this.preloadTagByName(t))));

    const course = await this.courseRepository.preload({
      ...toUpdate,
      id,
      tags
    });

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

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });
    if (tag) {
      return tag;
    }
    return this.tagRepository.create({ name });
  }
}
