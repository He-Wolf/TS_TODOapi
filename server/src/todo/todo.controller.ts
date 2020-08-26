import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TodoListDto } from './models/todo-list.dto';
import { TodoDto } from './models/todo.dto';
import { TodoCreateDto } from './models/todo-create.dto';
import { TodoService } from './todo.service';
import { JwtAuthGuard  } from '../auth/jwt-auth.guard';

@Controller("api/todos")export class TodoController {
    constructor(private readonly todoService: TodoService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(): Promise<TodoListDto> {
      const todos = await this.todoService.getAllTodo();
      return { todos };
    }
    @Get(":id")
    @UseGuards(JwtAuthGuard)
    async findOne(@Param("id") id: string): Promise<TodoDto> {
        return await this.todoService.getOneTodo(id);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {
        return await this.todoService.createTodo(todoCreateDto);
    }
    @Put(":id")
    @UseGuards(JwtAuthGuard)
    async update( @Param("id") id: string, @Body() todoDto: TodoCreateDto ): Promise<TodoDto> {
        return await this.todoService.modifyTodo(id, todoDto);
    }
    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    async destory( @Param("id") id: string): Promise<TodoDto> {
        return await this.todoService.deleteTodo(id);
    }
}

