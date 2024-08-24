import { InjectRepository } from '@nestjs/typeorm';
import { TaskGatewayInterface } from './task-gateway.interface';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/database/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskGatewayAdapter implements TaskGatewayInterface {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async findAll() {
    return await this.taskRepository.find();
  }
}
