import { Controller, Body, Post } from '@nestjs/common';
import { UserCreateDto } from '../user/models/user-create.dto';
import { UserLoginDto } from '../user/models/user-login.dto';
import { Token } from './models/token.dto';
import { UnauthorizedResponse, BadRequestResponse } from "../shared/exception-responses.dto";
import { AuthService } from './auth.service';
import { 
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiProduces,
  ApiConsumes,
  ApiTags
} from '@nestjs/swagger';


@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    description: "Register a new user account",
    summary: "At this endpoint you can register a new user account."
  })
  @ApiProduces('application/json')
  @ApiConsumes('application/json')
  @ApiCreatedResponse({
    description: 'The token if the user account has been successfully created.',
    type: Token,
  })
  @ApiBadRequestResponse({
    description: 'Error message and status.',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Error message and status.',
    type: UnauthorizedResponse,
  })
  public async register(@Body() createUserDto: UserCreateDto): Promise<Token> {

    const token: string = await this.authService.register(createUserDto);
    
    return {token};
  }

  @Post('login')
  @ApiOperation({
    description: "Log in with your user account",
    summary: "At this endpoint you can log in with your user account."
  })
  @ApiProduces('application/json')
  @ApiConsumes('application/json')
  @ApiCreatedResponse({
    description: 'Access token.',
    type: Token,
  })
  @ApiBadRequestResponse({
    description: 'Error message and status.',
    type: BadRequestResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Error message and status.',
    type: UnauthorizedResponse,
  })
  public async login(@Body() loginUserDto: UserLoginDto): Promise<Token> {
    const token: string = await this.authService.login(loginUserDto);

    return {token};
  }
}
