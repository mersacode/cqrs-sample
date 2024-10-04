export type OperationType = 'ADD' | 'REMOVE';
export class UpdateUserTodoListDto {
  userId: string;
  todoListId: string;
  operation: OperationType;
}
