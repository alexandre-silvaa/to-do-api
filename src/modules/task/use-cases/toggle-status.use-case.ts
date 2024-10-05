import { TaskGatewayInterface } from './../gateways/task-gateway.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ToggleStatusUseCase {
  constructor(
    @Inject('TaskGatewayInterface')
    private readonly taskGatewayInterface: TaskGatewayInterface,
  ) {}

  async execute(idTask: string) {
    await this.taskGatewayInterface.toggleStatus(idTask);
  }
}
