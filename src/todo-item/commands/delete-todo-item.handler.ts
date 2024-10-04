import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoItemCommand } from './delete-todo-item.command';
import { TodoItemRepository } from '../repository/todo-item.repository';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler
  implements ICommandHandler<DeleteTodoItemCommand>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}
  async execute({ todoItemId }: DeleteTodoItemCommand) {
    return await this.todoItemRepository.deleteTodoItem(todoItemId);
  }
}
