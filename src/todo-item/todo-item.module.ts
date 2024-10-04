import { Module } from '@nestjs/common';

import { TodoItemController } from './todo-item.controller';
import { todoItemCommandHandlers } from './commands';
import { TodoItemRepository } from './repository/todo-item.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItem, TodoItemSchema } from './schema/todo-item.schema';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: TodoItem.name, schema: TodoItemSchema },
    ]),
  ],
  controllers: [TodoItemController],
  providers: [TodoItemRepository, ...todoItemCommandHandlers],
})
export class TodoItemModule {}
