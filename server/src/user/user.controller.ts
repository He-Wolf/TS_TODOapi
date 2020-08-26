import { Controller, Body, Delete, Put, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserCreateDto } from '../user/models/user-create.dto';
import { UserDto } from '../user/models/user.dto';
import { JwtAuthGuard  } from '../auth/jwt-auth.guard';

@Controller('profile')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('display')
    @UseGuards(JwtAuthGuard)
    public async display(@Request() req): Promise<UserDto> {
        
        return await this.userService.getUser(req.user.email);
    }

    @Put('edit')
    @UseGuards(JwtAuthGuard)
    public async edit(@Request() req, @Body() userDto: UserCreateDto): Promise<UserDto> {

        return await this.userService.modifyUser(req.user.email, userDto);
    }

    @Delete('delete')
    @UseGuards(JwtAuthGuard)
    public async delete(@Request() req): Promise<UserDto> {

        return await this.userService.deleteUser(req.user.email);
    }
}
