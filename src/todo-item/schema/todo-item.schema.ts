import Mongoose, { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TodoList } from '../../todo-list/schema/todo-list.schema';

export type TodoItemDocument = TodoItem & Document;
@Schema()
export class TodoItem {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;
  @Prop({ type: Mongoose.Schema.Types.ObjectId, ref: 'TodoList' })
  todoList: TodoList;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  priority: number;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
