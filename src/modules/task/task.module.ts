import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { FindAllUseCase } from './use-cases/find-all.use-case';
import { TaskGatewayAdapter } from './gateways/task-gateway.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/database';
import { CreateUseCase } from './use-cases/create.use-case';
import { MailerSendService } from 'src/mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [TaskController],
  providers: [
    FindAllUseCase,
    CreateUseCase,
    TaskGatewayAdapter,
    MailerSendService,
    {
      provide: 'TaskGatewayInterface',
      useExisting: TaskGatewayAdapter,
    },
  ],
})
export class TaskModule {}
