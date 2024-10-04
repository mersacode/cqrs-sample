import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model, Types } from 'mongoose';
import { TodoList, TodoListDocument } from '../schema/todo-list.schema';
import { CreateTodoListDto } from '../dto/create-todo-list.dto';
import { EventBus } from '@nestjs/cqrs';
import { UpdateUserTodoListEvent } from '../../user/events/update-user-todoList.event';
import { UpdateTodoListDto } from '../dto/update-todo-list.dto';
import { UpdateUserTodoListDto } from '../../user/dto/update-user-todoList.dto';
import { UpdateTodoItemEventDto } from '../dto/update-todo-item-event.dto';

@Injectable()
export class TodoListRepository {
  constructor(
    @InjectModel(TodoList.name) private todoListModel: Model<TodoListDocument>,
    private readonly eventBus: EventBus,
  ) {}
  async findOne(todoListId: string): Promise<TodoList> {
    const todoList = await this.todoListModel.findOne({
      _id: new Types.ObjectId(todoListId),
    });
    if (!todoList) throw new NotFoundException('The item not found');
    return todoList;
  }

  async find(usersFilterQuery: FilterQuery<TodoList>): Promise<TodoList[]> {
    return await this.todoListModel.find(usersFilterQuery).exec();
  }

  async getUserTodoLists(userId: string) {
    return await this.todoListModel
      .find({
        userId: new Types.ObjectId(userId),
      })
      .populate('todoItems', null, null, { sort: { priority: 1 } })

      .exec();
  }

  async createTodoList(
    createTodoListDto: CreateTodoListDto,
  ): Promise<TodoList> {
    const newTodoList = await new this.todoListModel({
      _id: new Types.ObjectId(),
      ...createTodoListDto,
    }).save();
    await this.eventBus.publish<UpdateUserTodoListEvent>(
      new UpdateUserTodoListEvent({
        todoListId: newTodoList._id.toString(),
        operation: 'ADD',
        userId: createTodoListDto.userId,
      }),
    );

    return newTodoList;
  }

  async deleteTodoList(todoListId: string) {
    const todoList = await this.findOne(todoListId);
    if (todoList) {
      await this.eventBus.publish<UpdateUserTodoListEvent>(
        new UpdateUserTodoListEvent({
          todoListId: todoList._id.toString(),
          operation: 'REMOVE',
          userId: todoList.userId._id.toString(),
        }),
      );
      await this.todoListModel
        .deleteOne({ _id: new Types.ObjectId(todoListId) })
        .exec();
    }
  }

  async findOneAndUpdate(
    todoListId: string,
    updateTodoListDto: UpdateTodoListDto,
  ): Promise<TodoList> {
    return this.todoListModel.findOneAndUpdate(
      { _id: new Types.ObjectId(todoListId) },
      { ...updateTodoListDto },
      {
        new: true,
      },
    );
  }

  async updateTodoItemEvent({
    todoItemId,
    todoListId,
    operation,
  }: UpdateTodoItemEventDto) {
    await this.findOne(todoListId);

    switch (operation) {
      case 'ADD':
        await this.todoListModel.findOneAndUpdate(
          { _id: new Types.ObjectId(todoListId) },
          {
            $push: { todoItems: new Types.ObjectId(todoItemId) },
          },
        );

        break;
      case 'REMOVE':
        await this.todoListModel.findOneAndUpdate(
          { _id: new Types.ObjectId(todoListId) },
          {
            $pop: { todoItems: new Types.ObjectId(todoItemId) },
          },
        );

        break;
    }
  }
}
