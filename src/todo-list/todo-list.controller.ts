import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from './commands/create-todo-list.command';
import { GetUserTodoListsQuery } from './queries/get-user-todoLists.query';
import { DeleteTodoListCommand } from './commands/delete-todo-list.command';
import { UpdateTodoListCommand } from './commands/update-todo-list.command';

@Controller('todo-list')
export class TodoListController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Get('userid/:id')
  async getUserTodoLists(@Param('id') userId: string) {
    return await this.queryBus.execute(new GetUserTodoListsQuery(userId));
  }
  @Post()
  @HttpCode(201)
  async createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
    return await this.commandBus.execute<CreateTodoListCommand>(
      new CreateTodoListCommand(createTodoListDto),
    );
  }

  @Patch(':id')
  @HttpCode(204)
  async updateTodoList(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    await this.commandBus.execute<UpdateTodoListCommand>(
      new UpdateTodoListCommand(id, updateTodoListDto),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTodoList(@Param('id') id: string) {
    await this.commandBus.execute<DeleteTodoListCommand>(
      new DeleteTodoListCommand(id),
    );
  }
}
