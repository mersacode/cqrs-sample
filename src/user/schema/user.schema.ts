import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose, { Document, Types } from 'mongoose';
import { TodoList } from '../../todo-list/schema/todo-list.schema';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;
  @Prop({ type: String, required: true, unique: true })
  username: string;
  @Prop({ select: false })
  password: string;

  @Prop({
    type: [Mongoose.Schema.Types.ObjectId],
    ref: TodoList.name,
    default: [],
  })
  todoLists: TodoList[];
}

export const UserSchema = SchemaFactory.createForClass(User);
