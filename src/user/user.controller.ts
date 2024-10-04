import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { GetUserQuery } from './queries/get-user.query';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(201)
  async registerUser(@Body() createUserDto: CreateUserDto) {
    await this.commandBus.execute<CreateUserCommand>(
      new CreateUserCommand(createUserDto),
    );
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return await this.queryBus.execute(new GetUserQuery(userId));
  }
}
