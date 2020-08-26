import { UserCreateDto } from './user-create.dto';

describe('UserCreateDto', () => {
  it('should be defined', () => {
    expect(new UserCreateDto()).toBeDefined();
  });
});
