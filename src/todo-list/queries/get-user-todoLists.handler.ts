import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserTodoListsQuery } from './get-user-todoLists.query';
import { TodoListRepository } from '../repository/todo-list.repository';

@QueryHandler(GetUserTodoListsQuery)
export class GetUserTodoListsHandler
  implements IQueryHandler<GetUserTodoListsQuery>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}
  execute({ userId }: GetUserTodoListsQuery) {
    return this.todoListRepository.getUserTodoLists(userId);
  }
}
