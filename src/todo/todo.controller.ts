import { Controller, Get, Post, Put, Delete, Param, Body, Request, UseGuards } from '@nestjs/common';
import { TodoDto } from './models/todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { TodoCreateDto } from './models/todo-create.dto';
import { UnauthorizedResponse, BadRequestResponse } from "../shared/exception-responses.dto";
import { TodoService } from './todo.service';
import { JwtAuthGuard  } from '../auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiOperation,
    ApiProduces,
    ApiConsumes,
    ApiTags
} from '@nestjs/swagger';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("todos")
@Controller("api/todos")export class TodoController {
    constructor(
        private readonly todoService: TodoService,
        private readonly userService: UserService,
        @InjectMapper()
        private readonly mapper: AutoMapper,
    ) {}
    
    @Get()
    @ApiOperation({
        description: "Get all your todo items.",
        summary: "At this endpoint you can view all your todo items."
    })
    @ApiProduces('application/json')
    @ApiConsumes('application/json')
    @ApiCreatedResponse({
        description: 'All todo items.',
        type: TodoDto,
    })
    @ApiBadRequestResponse({
        description: 'Error message and status.',
        type: BadRequestResponse,
    })
    @ApiUnauthorizedResponse({
        description: 'Error message and status.',
        type: UnauthorizedResponse,
    })
    async findAll(@Request() req): Promise<TodoDto[]> {
        const user = await this.userService.getUser(req.user.email);
        const todos = await this.todoService.getAllTodo(user);

        return this.mapper.mapArray(todos, TodoDto, TodoEntity);
    }
    @Get(":id")
    @ApiOperation({
        description: "Get one of your todo items.",
        summary: "At this endpoint you can view a specific todo item."
    })
    @ApiProduces('application/json')
    @ApiConsumes('application/json')
    @ApiCreatedResponse({
        description: 'The todo item.',
        type: TodoDto,
    })
    @ApiBadRequestResponse({
        description: 'Error message and status.',
        type: BadRequestResponse,
    })
    @ApiUnauthorizedResponse({
        description: 'Error message and status.',
        type: UnauthorizedResponse,
    })
    async findOne(@Request() req, @Param("id") id: string): Promise<TodoDto> {
        const user = await this.userService.getUser(req.user.email);
        const todo = await this.todoService.getOneTodo(id, user);

        return this.mapper.map(todo, TodoDto, TodoEntity);
    }
    @Post()
    @ApiOperation({
        description: "Create a todo item.",
        summary: "At this endpoint you can create a todo item for yourself."
    })
    @ApiProduces('application/json')
    @ApiConsumes('application/json')
    @ApiCreatedResponse({
        description: 'The created todo item.',
        type: TodoDto,
    })
    @ApiBadRequestResponse({
        description: 'Error message and status.',
        type: BadRequestResponse,
    })
    @ApiUnauthorizedResponse({
        description: 'Error message and status.',
        type: UnauthorizedResponse,
    })
    async create(@Request() req, @Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {
        const user = await this.userService.getUser(req.user.email);
        const todo = await this.todoService.createTodo(todoCreateDto, user);

        return this.mapper.map(todo, TodoDto, TodoEntity);
    }
    @Put(":id")
    @ApiOperation({
        description: "Edit a todo item.",
        summary: "At this endpoint you can edit one of your todo items."
    })
    @ApiProduces('application/json')
    @ApiConsumes('application/json')
    @ApiCreatedResponse({
        description: 'The edited todo item.',
        type: TodoDto,
    })
    @ApiBadRequestResponse({
        description: 'Error message and status.',
        type: BadRequestResponse,
    })
    @ApiUnauthorizedResponse({
        description: 'Error message and status.',
        type: UnauthorizedResponse,
    })
    async update(@Request() req, @Param("id") id: string, @Body() todoDto: TodoCreateDto ): Promise<TodoDto> {
        const user = await this.userService.getUser(req.user.email);
        const todo = await this.todoService.modifyTodo(id, todoDto, user);

        return this.mapper.map(todo, TodoDto, TodoEntity);
    }
    @Delete(":id")
    @ApiOperation({
        description: "Delete a todo item",
        summary: "At this endpoint you can delete one of your todo items."
    })
    @ApiProduces('application/json')
    @ApiConsumes('application/json')
    @ApiCreatedResponse({
        description: 'The deleted todo item.',
        type: TodoDto,
    })
    @ApiBadRequestResponse({
        description: 'Error message and status.',
        type: BadRequestResponse,
    })
    @ApiUnauthorizedResponse({
        description: 'Error message and status.',
        type: UnauthorizedResponse,
    })
    async destory(@Request() req, @Param("id") id: string): Promise<TodoDto> {
        const user = await this.userService.getUser(req.user.email);
        const todo = await this.todoService.deleteTodo(id, user);

        return this.mapper.map(todo, TodoDto, TodoEntity);
    }
}

