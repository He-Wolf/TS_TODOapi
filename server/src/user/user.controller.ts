import { Controller, Body, Delete, Put, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserCreateDto } from '../user/models/user-create.dto';
import { UserDto } from '../user/models/user.dto';
import { JwtAuthGuard  } from '../auth/jwt-auth.guard';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';


@UseGuards(JwtAuthGuard)
@Controller('profile')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @InjectMapper()
        private readonly mapper: AutoMapper
    ) {}

    @Get('display')
    public async display(@Request() req): Promise<UserDto> {
        const user = await this.userService.getUser(req.user.email);

        return this.mapper.map(user, UserDto, UserEntity); 
    }

    @Put('edit')
    public async edit(@Request() req, @Body() userDto: UserCreateDto): Promise<UserDto> {
        const user = await this.userService.modifyUser(req.user.email, userDto);

        return this.mapper.map(user, UserDto, UserEntity);
    }

    @Delete('delete')
    public async delete(@Request() req): Promise<UserDto> {
        const user = await this.userService.deleteUser(req.user.email);

        return this.mapper.map(user, UserDto, UserEntity);
    }
}
