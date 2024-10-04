export type OperationType = 'ADD' | 'REMOVE';

export class UpdateTodoItemEventDto {
  todoListId: string;
  todoItemId: string;
  operation: OperationType;
}
