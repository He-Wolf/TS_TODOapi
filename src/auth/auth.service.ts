import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from './interfaces/payload.interface';
import { UserEntity } from '../user/entities/user.entity';
import { UserLoginDto } from '../user/models/user-login.dto';
import { UserCreateDto } from '../user/models/user-create.dto';
import { Token } from './models/token.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  
  async register(userDto: UserCreateDto): Promise<string> {
    // create user
    const user: UserEntity = await this.userService.createUser(userDto);
    
    if(!user) {
      throw new HttpException(`Registration failed`, HttpStatus.BAD_REQUEST);
    }
    
    const token : string = this._createToken({email: userDto.email});

    return token;
  }

  async login(userDto: UserLoginDto): Promise<string> {
    // check credentials
    const status: boolean = await this.userService.checkCredentials(userDto);

    if(!status) {
    throw new HttpException(`Login failed`, HttpStatus.BAD_REQUEST);
    }
    
    const token : string = this._createToken({email: userDto.email});

    return token;
  }
  
  private _createToken(payload: JwtPayload): string {

    const accessToken : string = this.jwtService.sign(payload);

    return accessToken;
  }
}