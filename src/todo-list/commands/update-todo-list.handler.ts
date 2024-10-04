import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from './update-todo-list.command';
import { TodoListRepository } from '../repository/todo-list.repository';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}
  async execute({ todoListId, updateTodoListDto }: UpdateTodoListCommand) {
    return await this.todoListRepository.findOneAndUpdate(
      todoListId,
      updateTodoListDto,
    );
  }
}
