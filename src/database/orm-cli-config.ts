import { DataSource } from 'typeorm';
import { dbOptions } from './database.module';
import { CreateCoursesTable1728822735397 } from 'src/migrations/1728822735397-CreateCoursesTable';
import { CreateTagsTable1728823349455 } from 'src/migrations/1728823349455-CreateTagsTable';
import { CreateCoursesTagsTable1728824835886 } from 'src/migrations/1728824835886-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1728825329336 } from 'src/migrations/1728825329336-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1728825750329 } from 'src/migrations/1728825750329-AddTagsIdToCoursesTagsTable';

export const dataSource = new DataSource({
  ...dbOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1728822735397,
    CreateTagsTable1728823349455,
    CreateCoursesTagsTable1728824835886,
    AddCoursesIdToCoursesTagsTable1728825329336,
    AddTagsIdToCoursesTagsTable1728825750329
  ]
});
