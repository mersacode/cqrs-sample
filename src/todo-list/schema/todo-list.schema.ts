import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose, { Document, Types } from 'mongoose';
import { User } from '../../user/schema/user.schema';
import { TodoItem } from '../../todo-item/schema/todo-item.schema';

export type TodoListDocument = TodoList & Document;
@Schema()
export class TodoList {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  title: string;
  @Prop({ type: Mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
  @Prop({
    type: [Mongoose.Schema.Types.ObjectId],
    ref: TodoItem.name,
    default: [],
  })
  todoItems: TodoItem[];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
