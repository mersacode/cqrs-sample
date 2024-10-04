import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    private readonly username: string,
    private readonly password: string,
  ) {
    super();
  }
}
