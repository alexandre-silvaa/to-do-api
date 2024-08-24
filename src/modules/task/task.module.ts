import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { FindAllUseCase } from './use-cases/find-all.use-case';
import { TaskGatewayAdapter } from './gateways/task-gateway.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/database';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [TaskController],
  providers: [
    FindAllUseCase,
    TaskGatewayAdapter,
    {
      provide: 'TaskGatewayInterface',
      useExisting: TaskGatewayAdapter,
    },
  ],
})
export class TaskModule {}
