import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateUserTodoListEvent } from './update-user-todoList.event';
import { UserRepository } from '../repository/user.repository';

@EventsHandler(UpdateUserTodoListEvent)
export class UpdateUserTodoListHandler implements IEventHandler {
  constructor(private readonly userRepository: UserRepository) {}
  async handle({ updateUserTodoListDto }: UpdateUserTodoListEvent) {
    await this.userRepository.updateUserTodoList(updateUserTodoListDto);
  }
}
