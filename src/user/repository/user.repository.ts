import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { UpdateUserTodoListDto } from '../dto/update-user-todoList.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findOne(userId: string): Promise<User> {
    const user = await this.userModel
      .findOne({ _id: new Types.ObjectId(userId) })
      .populate('todoLists')
      // .populate({
      //   path: 'todoLists',
      //   model: 'TodoList',
      //   populate: { path: 'todoItems', model: 'TodoItem' },
      // })
      .exec();
    if (!user) throw new NotFoundException('The item not found');
    return user;
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(usersFilterQuery);
  }

  async createUser({ password, ...userProps }: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = new this.userModel({
      _id: new Types.ObjectId(),
      password: hashPassword,
      ...userProps,
    });
    return newUser.save();
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user, {
      new: true,
    });
  }

  async updateUserTodoList({
    userId,
    todoListId,
    operation,
  }: UpdateUserTodoListDto) {
    await this.findOne(userId);

    switch (operation) {
      case 'ADD':
        await this.userModel.findOneAndUpdate(
          { _id: new Types.ObjectId(userId) },
          {
            $push: { todoLists: new Types.ObjectId(todoListId) },
          },
        );

        break;
      case 'REMOVE':
        await this.userModel.findOneAndUpdate(
          { _id: new Types.ObjectId(userId) },
          {
            $pop: { todoLists: new Types.ObjectId(todoListId) },
          },
        );

        break;
    }
  }
}
