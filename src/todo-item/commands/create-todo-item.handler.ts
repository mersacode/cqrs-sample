import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoItemCommand } from './create-todo-item.command';
import { TodoItemRepository } from '../repository/todo-item.repository';

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler
  implements ICommandHandler<CreateTodoItemCommand>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}
  execute({ createTodoItemDto }: CreateTodoItemCommand): Promise<any> {
    return this.todoItemRepository.createTodoItem(createTodoItemDto);
  }
}
