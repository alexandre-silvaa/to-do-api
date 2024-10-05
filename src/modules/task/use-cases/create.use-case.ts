import { MailerSendService } from 'src/mailer/mailer.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskGatewayInterface } from '../gateways/task-gateway.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as schedule from 'node-schedule';
import { TaskDto } from '../dto/task.dto';
import { addThreeHours } from 'src/shared/utils/functions';

@Injectable()
export class CreateUseCase {
  constructor(
    @Inject('TaskGatewayInterface')
    private readonly taskGatewayInterface: TaskGatewayInterface,
    private readonly mailerSendService: MailerSendService,
  ) {}

  async execute(createTaskDto: CreateTaskDto) {
    createTaskDto.due_date = addThreeHours(createTaskDto.due_date);
    if (createTaskDto.remember_date) {
      createTaskDto.remember_date = addThreeHours(createTaskDto.remember_date);
    }

    if (
      createTaskDto.due_date < new Date() ||
      (createTaskDto.remember_date && createTaskDto.remember_date < new Date())
    ) {
      throw new BadRequestException(
        'As datas de finalização e de relembrar devem ser futuras em relação à data atual!',
      );
    }

    if (
      createTaskDto.remember_date &&
      createTaskDto.remember_date > createTaskDto.due_date
    ) {
      throw new BadRequestException(
        'A data de relembrar deve ser anterior à data de finalização. Por favor, ajuste a data de relembrar.',
      );
    }

    const task = await this.taskGatewayInterface.create(createTaskDto);

    await this.mailerSendService.sendMailCreateTask({
      message: task.title,
      subject: 'Tarefa criada com sucesso!',
      to: task.user.email,
    });

    if (task.remember_date) this.scheduleEmail(task);
    return task;
  }

  scheduleEmail(taskDto: TaskDto) {
    const job = schedule.scheduleJob(
      taskDto.id,
      taskDto.remember_date,
      async () => {
        await this.mailerSendService.sendMailCreateTask({
          message: taskDto.title,
          subject: 'Você tem uma tarefa a ser realizada!',
          to: taskDto.user.email,
        });
      },
    );

    return job;
  }
}
