import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import  '../shared/todo-profile';

@Module({
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
