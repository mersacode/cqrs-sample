import { CreateTodoItemHandler } from './create-todo-item.handler';
import { UpdateTodoItemHandler } from './update-todo-item.handler';
import { DeleteTodoItemHandler } from './delete-todo-item.handler';

export const todoItemCommandHandlers = [
  CreateTodoItemHandler,
  UpdateTodoItemHandler,
  DeleteTodoItemHandler,
];
