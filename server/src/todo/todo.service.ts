import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { v4 as uuidv4 } from 'uuid';
import { TodoEntity } from './todo-entity';
import { TodoDto } from './todo-dto';
import { TodoCreateDto } from './todo-create-dto';
import { TodoListDto } from './todo-list-dto';
import { toPromise } from '../shared/utils'
import { toTodoDto } from '../shared/mapper'

@Injectable()
export class TodoService {
    todos: TodoEntity[] = todos;
    
    async getAllTodo(): Promise<TodoEntity[]>{
        return toPromise(this.todos);
    }

    async getOneTodo(id: string): Promise<TodoDto> {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }
        return toPromise(toTodoDto(todo));
    }
    
    async createTodo(todoDto: TodoCreateDto): Promise<TodoDto>{
        const { name, description } = todoDto;
        const todo: TodoEntity = { id: uuidv4(), name, description, };
        this.todos.push(todo);
        return toPromise(toTodoDto(todo));
    }

    async updateTodo(id: string, todoDto: TodoCreateDto): Promise<TodoDto>{
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }
        todo.name = todoDto.name;
        todo.description = todoDto.description;
        return toPromise(toTodoDto(todo));
    }

    async destoryTodo(id: string): Promise<TodoDto>{
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }
        this.todos.filter(_todo => _todo.id !== id);
        return toPromise(toTodoDto(todo));
    }
}
