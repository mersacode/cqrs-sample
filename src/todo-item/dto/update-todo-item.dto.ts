import { TodoItemPriorityEnum } from './create-todo-item.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTodoItemDto {
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsNumber()
  @IsEnum(TodoItemPriorityEnum)
  @IsOptional()
  priority?: TodoItemPriorityEnum;
}
