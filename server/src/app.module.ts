import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { AutomapperModule } from 'nestjsx-automapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AutomapperModule.withMapper(),
    TypeOrmModule.forRoot(),
    TodoModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
