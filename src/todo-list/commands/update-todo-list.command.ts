import { UpdateTodoListDto } from '../dto/update-todo-list.dto';

export class UpdateTodoListCommand {
  constructor(
    public readonly todoListId: string,
    public readonly updateTodoListDto: UpdateTodoListDto,
  ) {}
}
