import { CreateTodoListHandler } from './create-todo-list.handler';
import { DeleteTodoListHandler } from './delete-todo-list.handler';
import { UpdateTodoListHandler } from './update-todo-list.handler';

export const todoListCommandHandler = [
  CreateTodoListHandler,
  DeleteTodoListHandler,
  UpdateTodoListHandler,
];
