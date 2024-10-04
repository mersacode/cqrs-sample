import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { userCommandHandler } from './commands';
import { UserRepository } from './repository/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { userQueriesHandler } from './queries';
import { userEventHandlers } from './events';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    ...userCommandHandler,
    ...userQueriesHandler,
    ...userEventHandlers,
    UserRepository,
  ],
  exports: [],
})
export class UserModule {}
