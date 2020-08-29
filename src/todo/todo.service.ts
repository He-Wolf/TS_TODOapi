import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { TodoCreateDto } from './models/todo-create.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(TodoEntity)
        private todoRepository: Repository<TodoEntity>
    ) { }
    
    async getAllTodo(user: UserEntity): Promise<TodoEntity[]>{
        const todos : TodoEntity[] = await this.todoRepository.find( {where: { user }} );

        return todos;
    }

    async getOneTodo(id: string, user: UserEntity): Promise<TodoEntity> {
        const todo : TodoEntity = await this.todoRepository.findOne( {where: { id, user }} );

        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }

        return todo;
    }
    
    async createTodo(todoDto: TodoCreateDto, user: UserEntity): Promise<TodoEntity> {
        let todo = new TodoEntity();

        todo.name = todoDto.name;
        todo.isDone = todoDto.isDone;
        todo.description = todoDto.description;
        todo.user = user;
        
        todo = await this.todoRepository.save(todo);

        return todo;
    }

    async modifyTodo(id: string, todoDto: TodoCreateDto, user: UserEntity): Promise<TodoEntity>{
        let todo = await this.todoRepository.findOne( {where: { id, user }} );

        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }

        todo.name = todoDto.name;
        todo.isDone = todoDto.isDone;
        todo.description = todoDto.description;

        todo = await this.todoRepository.save(todo);

        return todo;
    }

    async deleteTodo(id: string, user: UserEntity): Promise<TodoEntity>{
        let todo = await this.todoRepository.findOne( {where: { id, user }} );

        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }

        todo = await this.todoRepository.remove(todo);

        return todo;
    }
}
