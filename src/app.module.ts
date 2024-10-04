import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodoItemModule } from './todo-item/todo-item.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    TodoItemModule,
    TodoListModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
