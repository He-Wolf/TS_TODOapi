import { Controller, Body, Delete, Put, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserCreateDto } from '../user/models/user-create.dto';
import { UserDto } from '../user/models/user.dto';
import { UnauthorizedResponse, BadRequestResponse } from "../shared/exception-responses.dto";
import { JwtAuthGuard  } from '../auth/jwt-auth.guard';
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
@ApiTags("user")
@Controller('profile')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @InjectMapper()
        private readonly mapper: AutoMapper
    ) {}

    @Get('display')
    @ApiOperation({
        description: "Display your user profile",
        summary: "At this endpoint you can get your user data."
    })
    @ApiProduces('application/json')
    @ApiConsumes('application/json')
    @ApiCreatedResponse({
        description: 'Your user data.',
        type: UserDto,
    })
    @ApiBadRequestResponse({
        description: 'Error message and status.',
        type: BadRequestResponse,
    })
    @ApiUnauthorizedResponse({
        description: 'Error message and status.',
        type: UnauthorizedResponse,
    })
    public async display(@Request() req): Promise<UserDto> {
        const user = await this.userService.getUser(req.user.email);

        return this.mapper.map(user, UserDto, UserEntity); 
    }

    @Put('edit')
    @ApiOperation({
        description: "Edit your user profile",
        summary: "At this endpoint you can modify your user data."
    })
    @ApiProduces('application/json')
    @ApiConsumes('application/json')
    @ApiCreatedResponse({
        description: 'Your modified user data.',
        type: UserDto,
    })
    @ApiBadRequestResponse({
        description: 'Error message and status.',
        type: BadRequestResponse,
    })
    @ApiUnauthorizedResponse({
        description: 'Error message and status.',
        type: UnauthorizedResponse,
    })
    public async edit(@Request() req, @Body() userDto: UserCreateDto): Promise<UserDto> {
        const user = await this.userService.modifyUser(req.user.email, userDto);

        return this.mapper.map(user, UserDto, UserEntity);
    }

    @Delete('delete')
    @ApiOperation({
        description: "Delete your user profile",
        summary: "At this endpoint you can delete your user data."
    })
    @ApiProduces('application/json')
    @ApiConsumes('application/json')
    @ApiCreatedResponse({
        description: 'Your deleted user data',
        type: UserDto,
    })
    @ApiBadRequestResponse({
        description: 'Error message and status.',
        type: BadRequestResponse,
    })
    @ApiUnauthorizedResponse({
        description: 'Error message and status.',
        type: UnauthorizedResponse,
    })
    public async delete(@Request() req): Promise<UserDto> {
        const user = await this.userService.deleteUser(req.user.email);

        return this.mapper.map(user, UserDto, UserEntity);
    }
}
