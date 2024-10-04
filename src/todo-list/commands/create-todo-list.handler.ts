import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './create-todo-list.command';
import { TodoListRepository } from '../repository/todo-list.repository';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}
  execute({ createTodoListDto }: CreateTodoListCommand): Promise<any> {
    return this.todoListRepository.createTodoList(createTodoListDto);
  }
}
