import { CreateTodoListDto } from '../dto/create-todo-list.dto';

export class CreateTodoListCommand {
  constructor(public readonly createTodoListDto: CreateTodoListDto) {}
}
