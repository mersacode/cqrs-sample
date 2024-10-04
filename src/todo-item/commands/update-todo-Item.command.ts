import { UpdateTodoItemDto } from '../dto/update-todo-item.dto';

export class UpdateTodoItemCommand {
  constructor(
    public readonly todoItemId: string,
    public readonly updateTodoItemDto: UpdateTodoItemDto,
  ) {}
}
