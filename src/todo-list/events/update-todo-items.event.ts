import { UpdateTodoItemEventDto } from '../dto/update-todo-item-event.dto';

export class UpdateTodoItemsEvent {
  constructor(public readonly updateTodoItemEventDto: UpdateTodoItemEventDto) {}
}
