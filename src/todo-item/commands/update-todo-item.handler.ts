import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from './update-todo-Item.command';
import { TodoItemRepository } from '../repository/todo-item.repository';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler
  implements ICommandHandler<UpdateTodoItemCommand>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}
  async execute({ todoItemId, updateTodoItemDto }: UpdateTodoItemCommand) {
    return await this.todoItemRepository.findOneAndUpdate(
      todoItemId,
      updateTodoItemDto,
    );
  }
}
