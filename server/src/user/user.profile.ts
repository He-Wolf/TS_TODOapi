import { AutoMapper, ProfileBase, Profile } from 'nestjsx-automapper';
import { UserDto } from './models/user.dto';
import { UserEntity } from './models/user.entity';

@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(UserEntity, UserDto).reverseMap();
  }
}