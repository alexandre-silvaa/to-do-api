import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskGatewayInterface } from '../gateways/task-gateway.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUseCase {
  constructor(
    @Inject('TaskGatewayInterface')
    private readonly taskGatewayInterface: TaskGatewayInterface,
  ) {}

  async execute(createTaskDto: CreateTaskDto) {
    return await this.taskGatewayInterface.create(createTaskDto);
  }
}
