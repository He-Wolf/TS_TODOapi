import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './models/todo.entity';
import { TodoDto } from './models/todo.dto';
import { TodoCreateDto } from './models/todo-create.dto';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(TodoEntity)
        private todoRepository: Repository<TodoEntity>,
        @InjectMapper()
        private readonly mapper: AutoMapper,

    ) { }
    
    async getAllTodo(): Promise<TodoDto[]>{
        const todos : TodoEntity[] = await this.todoRepository.find();
        return this.mapper.mapArray(todos, TodoDto, TodoEntity);
    }

    async getOneTodo(id: string): Promise<TodoDto> {
        const todo : TodoEntity = await this.todoRepository.findOne(id);
        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }
        return this.mapper.map(todo, TodoDto, TodoEntity);
    }
    
    async createTodo(todoDto: TodoCreateDto): Promise<TodoDto>{
        const todo: TodoEntity = this.todoRepository.create({ name: todoDto.name, description: todoDto.description, });
        await this.todoRepository.save(todo);
        return this.mapper.map(todo, TodoDto, TodoEntity);
    }

    async updateTodo(id: string, todoDto: TodoCreateDto): Promise<TodoDto>{
        let todo = await this.todoRepository.findOne(id);
        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }
        await this.todoRepository.update(id, {name: todoDto.name, description: todoDto.description});
        todo = await this.todoRepository.findOne(id);
        return this.mapper.map(todo, TodoDto, TodoEntity);
    }

    async destoryTodo(id: string): Promise<TodoDto>{
        const todo = await this.todoRepository.findOne(id);
        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }
        await this.todoRepository.delete(todo)
        return this.mapper.map(todo, TodoDto, TodoEntity);
    }
}
