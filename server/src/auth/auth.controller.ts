import { Controller, Body, Post, Get, Request, UseGuards } from '@nestjs/common';
import { UserCreateDto } from '../user/models/user-create.dto';
import { UserLoginDto } from '../user/models/user-login.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { Message } from './interfaces/message.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard  } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() createUserDto: UserCreateDto): Promise<Message> {

    return await this.authService.register(createUserDto);
  }

  @Post('login')
  public async login(@Body() loginUserDto: UserLoginDto): Promise<Message> {

    return await this.authService.login(loginUserDto);
  }

  @Get('currentUser')
  @UseGuards(JwtAuthGuard)
  public async getCurrentUser(@Request() req): Promise<JwtPayload> {
    return req.user;
  }
}
