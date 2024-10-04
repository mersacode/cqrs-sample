import { Module } from '@nestjs/common';
import { TodoListController } from './todo-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoList, TodoListSchema } from './schema/todo-list.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { todoListCommandHandler } from './commands';
import { TodoListRepository } from './repository/todo-list.repository';
import { todoListQueryHandlers } from './queries';
import { todoListEventHandlers } from './events';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
    ]),
  ],
  controllers: [TodoListController],
  providers: [
    ...todoListCommandHandler,
    TodoListRepository,
    ...todoListQueryHandlers,
    ...todoListEventHandlers,
  ],
})
export class TodoListModule {}
