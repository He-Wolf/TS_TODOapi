import { Controller, Get, Post, Put, Delete, Param, Body, Request, UseGuards } from '@nestjs/common';
import { TodoDto } from './models/todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { TodoCreateDto } from './models/todo-create.dto';
import { TodoService } from './todo.service';
import { JwtAuthGuard  } from '../auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("api/todos")export class TodoController {
    constructor(
        private readonly todoService: TodoService,
        private readonly userService: UserService,
        @InjectMapper()
        private readonly mapper: AutoMapper,
    ) {}
    
    @Get()
    async findAll(@Request() req): Promise<TodoDto[]> {
        const user = await this.userService.getUser(req.user.email);
        const todos = await this.todoService.getAllTodo(user);

        return this.mapper.mapArray(todos, TodoDto, TodoEntity);
    }
    @Get(":id")
    async findOne(@Request() req, @Param("id") id: string): Promise<TodoDto> {
        const user = await this.userService.getUser(req.user.email);
        const todo = await this.todoService.getOneTodo(id, user);

        return this.mapper.map(todo, TodoDto, TodoEntity);
    }
    @Post()
    async create(@Request() req, @Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {
        const user = await this.userService.getUser(req.user.email);
        const todo = await this.todoService.createTodo(todoCreateDto, user);

        return this.mapper.map(todo, TodoDto, TodoEntity);
    }
    @Put(":id")
    async update(@Request() req, @Param("id") id: string, @Body() todoDto: TodoCreateDto ): Promise<TodoDto> {
        const user = await this.userService.getUser(req.user.email);
        const todo = await this.todoService.modifyTodo(id, todoDto, user);

        return this.mapper.map(todo, TodoDto, TodoEntity);
    }
    @Delete(":id")
    async destory(@Request() req, @Param("id") id: string): Promise<TodoDto> {
        const user = await this.userService.getUser(req.user.email);
        const todo = await this.todoService.deleteTodo(id, user);

        return this.mapper.map(todo, TodoDto, TodoEntity);
    }
}

