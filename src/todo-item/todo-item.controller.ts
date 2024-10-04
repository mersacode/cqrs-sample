import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoItemCommand } from './commands/create-todo-item.command';
import { UpdateTodoItemCommand } from './commands/update-todo-Item.command';
import { DeleteTodoItemCommand } from './commands/delete-todo-item.command';

@Controller('todo-item')
export class TodoItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(201)
  async createTodoItem(@Body() createTodoItemDto: CreateTodoItemDto) {
    await this.commandBus.execute<CreateTodoItemCommand>(
      new CreateTodoItemCommand(createTodoItemDto),
    );
  }

  @Patch(':id')
  @HttpCode(204)
  async updateTodoItem(
    @Param('id') id: string,
    @Body() updateTodoItemDto: UpdateTodoItemDto,
  ) {
    await this.commandBus.execute<UpdateTodoItemCommand>(
      new UpdateTodoItemCommand(id, updateTodoItemDto),
    );
  }

  @Delete(':id')
  @HttpCode(201)
  async deleteTodoItem(@Param('id') id: string) {
    await this.commandBus.execute<DeleteTodoItemCommand>(
      new DeleteTodoItemCommand(id),
    );
  }
}
