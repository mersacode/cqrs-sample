import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoListCommand } from './delete-todo-list.command';
import { TodoListRepository } from '../repository/todo-list.repository';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler
  implements ICommandHandler<DeleteTodoListCommand>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}
  async execute({ todolistId }: DeleteTodoListCommand) {
    return await this.todoListRepository.deleteTodoList(todolistId);
  }
}
