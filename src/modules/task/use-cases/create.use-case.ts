import { MailerSendService } from 'src/mailer/mailer.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskGatewayInterface } from '../gateways/task-gateway.interface';
import { Inject, Injectable } from '@nestjs/common';
import * as schedule from 'node-schedule';

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
      subject: 'Tarefa criada com sucesso!',
      to: task.user.email,
    });

    this.scheduleEmail(task.user.email, task.title, task.remember_date);

    return task;
  }

  scheduleEmail(email: string, message: string, sendDate: Date) {
    const job = schedule.scheduleJob(sendDate, async () => {
      await this.mailerSendService.sendMailCreateTask({
        message: message,
        subject: 'Você tem uma tarefa a ser realizada!',
        to: email,
      });
    });

    return job;
  }
}
