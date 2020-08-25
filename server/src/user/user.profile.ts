import { AutoMapper, ProfileBase, Profile } from 'nestjsx-automapper';
import { UserDto } from './models/user.dto';
import { UserCreateDto } from './models/user-create.dto';
import { UserEntity } from './entities/user.entity';

@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(UserEntity, UserDto).reverseMap();
    mapper.createMap(UserEntity, UserCreateDto).reverseMap();
  }
}