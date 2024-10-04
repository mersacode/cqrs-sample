import { IsString } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  userId: string;
  @IsString()
  title: string;
}
