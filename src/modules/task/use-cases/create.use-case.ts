import { MailerSendService } from 'src/mailer/mailer.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskGatewayInterface } from '../gateways/task-gateway.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUseCase {
  constructor(
    @Inject('TaskGatewayInterface')
    private readonly taskGatewayInterface: TaskGatewayInterface,
    private readonly mailerSendService: MailerSendService,
  ) {}

  async execute(createTaskDto: CreateTaskDto) {
    const task = await this.taskGatewayInterface.create(createTaskDto);

    await this.mailerSendService.sendMailCreateTask({
      message: task.title,
      subject: 'Tarefa Criada com Sucesso!',
      to: task.user.email,
    });

    return task;
  }
}
