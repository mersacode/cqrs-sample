import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateTodoItemsEvent } from './update-todo-items.event';
import { TodoListRepository } from '../repository/todo-list.repository';

@EventsHandler(UpdateTodoItemsEvent)
export class UpdateTodoItemsHandler
  implements IEventHandler<UpdateTodoItemsEvent>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}
  async handle({ updateTodoItemEventDto }: UpdateTodoItemsEvent) {
    await this.todoListRepository.updateTodoItemEvent(updateTodoItemEventDto);
  }
}
