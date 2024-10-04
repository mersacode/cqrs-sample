import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

export enum TodoItemPriorityEnum {
  LOW = 3,
  MEDIUM = 2,
  HIGH = 1,
}
export class CreateTodoItemDto {
  @IsString()
  todoList: string;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  @IsEnum(TodoItemPriorityEnum)
  priority: TodoItemPriorityEnum;
}
