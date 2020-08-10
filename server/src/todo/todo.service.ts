import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { v4 as uuidv4 } from 'uuid';
import { TodoEntity } from './todo-entity';
import { TodoDto } from './todo-dto';
import { TodoCreateDto } from './todo-create-dto';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class TodoService {
    todos: TodoEntity[] = todos;

    constructor(@InjectMapper() private readonly mapper: AutoMapper) { }
    
    async getAllTodo(): Promise<TodoDto[]>{
        return await this.mapper.mapArrayAsync(this.todos, TodoDto, TodoEntity);
    }

    async getOneTodo(id: string): Promise<TodoDto> {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }
        console.log(this.mapper.map(todo, TodoDto, TodoEntity))
        return await this.mapper.mapAsync(todo, TodoDto, TodoEntity);
    }
    
    async createTodo(todoDto: TodoCreateDto): Promise<TodoDto>{
        const { name, description } = todoDto;
        const todo: TodoEntity = { id: uuidv4(), name, description, };
        this.todos.push(todo);
        return await this.mapper.mapAsync(todo, TodoDto, TodoEntity);
    }

    async updateTodo(id: string, todoDto: TodoCreateDto): Promise<TodoDto>{
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }
        todo.name = todoDto.name;
        todo.description = todoDto.description;
        return await this.mapper.mapAsync(todo, TodoDto, TodoEntity);
    }

    async destoryTodo(id: string): Promise<TodoDto>{
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }
        this.todos = this.todos.filter(_todo => _todo.id !== id);
        return await this.mapper.mapAsync(todo, TodoDto, TodoEntity);
    }
}
