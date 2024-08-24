import { TaskEntity } from 'src/database/entities/task.entity';

export interface TaskGatewayInterface {
  findAll(): Promise<TaskEntity[]>;
}
