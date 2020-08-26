import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { UserModule } from '../user/user.module';
import  './todo.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
    UserModule
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [],
})
export class TodoModule {}
