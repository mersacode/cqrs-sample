import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model, Types } from 'mongoose';
import { TodoItem, TodoItemDocument } from '../schema/todo-item.schema';
import { EventBus } from '@nestjs/cqrs';
import { CreateTodoItemDto } from '../dto/create-todo-item.dto';
import { UpdateTodoItemsEvent } from '../../todo-list/events/update-todo-items.event';
import { UpdateTodoItemDto } from '../dto/update-todo-item.dto';

@Injectable()
export class TodoItemRepository {
  constructor(
    @InjectModel(TodoItem.name) private todoItemModel: Model<TodoItemDocument>,
    private readonly eventBus: EventBus,
  ) {}
  async findOne(todoItemId: string): Promise<TodoItem> {
    const todoItem = await this.todoItemModel.findOne({
      _id: new Types.ObjectId(todoItemId),
    });
    if (!todoItem) throw new NotFoundException('The item not found');
    return todoItem;
  }

  async find(usersFilterQuery: FilterQuery<TodoItem>): Promise<TodoItem[]> {
    return await this.todoItemModel.find(usersFilterQuery).exec();
  }

  async createTodoItem(
    createTodoItemDto: CreateTodoItemDto,
  ): Promise<TodoItem> {
    const newTodoItem = await new this.todoItemModel({
      _id: new Types.ObjectId(),
      ...createTodoItemDto,
    }).save();

    await this.eventBus.publish<UpdateTodoItemsEvent>(
      new UpdateTodoItemsEvent({
        todoItemId: newTodoItem._id.toString(),
        todoListId: createTodoItemDto.todoList,
        operation: 'ADD',
      }),
    );

    return newTodoItem;
  }

  async deleteTodoItem(todoItemId: string) {
    const todoItem = await this.findOne(todoItemId);
    if (todoItem) {
      await this.eventBus.publish<UpdateTodoItemsEvent>(
        new UpdateTodoItemsEvent({
          todoItemId: todoItem._id.toString(),
          operation: 'REMOVE',
          todoListId: todoItem.todoList._id.toString(),
        }),
      );
      await this.todoItemModel
        .deleteOne({ _id: new Types.ObjectId(todoItemId) })
        .exec();
    }
  }

  async findOneAndUpdate(
    todoItemId: string,
    updateTodoItemDto: UpdateTodoItemDto,
  ): Promise<TodoItem> {
    return this.todoItemModel.findOneAndUpdate(
      { _id: new Types.ObjectId(todoItemId) },
      { ...updateTodoItemDto },
      {
        new: true,
      },
    );
  }
}
