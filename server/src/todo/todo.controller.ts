import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TodoListDto } from './models/todo-list.dto';
import { TodoDto } from './models/todo.dto';
import { TodoCreateDto } from './models/todo-create.dto';
import { TodoService } from './todo.service'

@Controller("api/todos")export class TodoController {
    constructor(private readonly todoService: TodoService) {}
    
    @Get()
    async findAll(): Promise<TodoListDto> {
      const todos = await this.todoService.getAllTodo();
      return { todos };
    }
    @Get(":id")
    async findOne(@Param("id") id: string): Promise<TodoDto> {
        return await this.todoService.getOneTodo(id);
    }
    @Post()
    async create(@Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {
        return await this.todoService.createTodo(todoCreateDto);
    }
    @Put(":id")
    async update( @Param("id") id: string, @Body() todoDto: TodoDto ): Promise<TodoDto> {
        return await this.todoService.updateTodo(id, todoDto);
    }
    @Delete(":id")
    async destory( @Param("id") id: string): Promise<TodoDto> {
        return await this.todoService.destoryTodo(id);
    }
}

