import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/payload.interface';
import { AuthConfig } from './configs/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: AuthConfig.JwtModule.secret,
        });  
    }
    
    async validate(payload: JwtPayload): Promise<JwtPayload> {
        return payload;  
    }
}
