import { PageOptionsDto } from './../../../shared/dtos/page-options.dto';
import { TaskGatewayInterface } from './../gateways/task-gateway.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUseCase {
  constructor(
    @Inject('TaskGatewayInterface')
    private taskGatewayInterface: TaskGatewayInterface,
  ) {}

  async execute(pageOptionsDto: PageOptionsDto) {
    return await this.taskGatewayInterface.findAll(pageOptionsDto);
  }
}
