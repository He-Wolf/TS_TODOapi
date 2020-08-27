import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/payload.interface';
import { Token } from './interfaces/token.interface';
import { Message } from './interfaces/message.interface';
import { UserEntity } from '../user/entities/user.entity';
import { UserLoginDto } from '../user/models/user-login.dto';
import { UserCreateDto } from '../user/models/user-create.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthConfig } from './configs/auth.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: UserCreateDto): Promise<Message> {
    // create user
    const user: UserEntity = await this.userService.createUser(userDto);
    
    if(!user) {
      return {success: false, data: "Registration failed"}
    }

    const token : Token = this._createToken({email: userDto.email});
    return {success: true, data: token};
  }

  async login(userDto: UserLoginDto): Promise<Message> {
    // check credentials
    const status: boolean = await this.userService.checkCredentials(userDto);

    if(!status) {
    return {success: false, data: "Login failed"}
    }
    
    const token : Token = this._createToken({email: userDto.email});
    return {success: true, data: token};
  }
  
  private _createToken(payload: JwtPayload): Token {
    const expiresIn : string = AuthConfig.JwtModule.signOptions.expiresIn;

    const accessToken : string = this.jwtService.sign(payload);
    return { expiresIn, accessToken };
  }
}