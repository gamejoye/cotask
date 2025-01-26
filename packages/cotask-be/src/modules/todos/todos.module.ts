import { Module } from '@nestjs/common';
import { TodosService } from './services/todos.service';
import { ITodosService } from './services/todos.abstract';
import { DatabaseModule } from '@cotask-be/modules/database';
import { DATA_SOURCE, GROUP_REPO, TODO_REPO } from '@cotask-be/common/constans/table-repos';
import { DataSource } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TodosController } from './controllers/todos.controller';
import { Group } from '../groups';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: ITodosService,
      useClass: TodosService,
    },
    {
      provide: TODO_REPO,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Todo),
      inject: [DATA_SOURCE],
    },
    {
      provide: GROUP_REPO,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Group),
      inject: [DATA_SOURCE],
    },
  ],
  controllers: [TodosController],
  exports: [ITodosService],
})
export class TodosModule {}
