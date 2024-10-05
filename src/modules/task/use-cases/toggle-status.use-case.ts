import { TaskDto } from '../dto/task.dto';
import { TaskGatewayInterface } from './../gateways/task-gateway.interface';
import { Inject, Injectable } from '@nestjs/common';
import * as schedule from 'node-schedule';

@Injectable()
export class ToggleStatusUseCase {
  constructor(
    @Inject('TaskGatewayInterface')
    private readonly taskGatewayInterface: TaskGatewayInterface,
  ) {}

  async execute(idTask: string) {
    const task = await this.taskGatewayInterface.toggleStatus(idTask);
    if (task.done && task.remember_date > new Date()) {
      this.cancelScheduleEmail(task);
    }
  }

  cancelScheduleEmail(taskDto: TaskDto) {
    const job = schedule.scheduledJobs[taskDto.id];
    if (job) job.cancel();
  }
}
