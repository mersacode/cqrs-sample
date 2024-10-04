import { CreateTodoItemDto } from '../dto/create-todo-item.dto';

export class CreateTodoItemCommand {
  constructor(public readonly createTodoItemDto: CreateTodoItemDto) {}
}
