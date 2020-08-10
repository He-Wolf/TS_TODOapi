import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { AutomapperModule } from 'nestjsx-automapper'

@Module({
  imports: [
    TodoModule,
    AutomapperModule.withMapper(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
