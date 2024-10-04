import { UpdateUserTodoListDto } from '../dto/update-user-todoList.dto';

export class UpdateUserTodoListEvent {
  constructor(public readonly updateUserTodoListDto: UpdateUserTodoListDto) {}
}
