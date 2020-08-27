import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { AutomapperModule } from 'nestjsx-automapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
//import { ServeStaticModule } from '@nestjs/serve-static';
//import { join } from 'path';

@Module({
  imports: [
    AutomapperModule.withMapper(),
    TypeOrmModule.forRoot(),
    TodoModule,
    AuthModule,
    UserModule,
    /*ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),*/
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
