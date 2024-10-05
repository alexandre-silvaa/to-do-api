import { PageOptionsDto } from 'src/shared/dtos/page-options.dto';
import { PageDto } from 'src/shared/dtos/page.dto';
import { TaskDto } from '../dto/task.dto';
import { CreateTaskDto } from '../dto/create-task.dto';

export interface TaskGatewayInterface {
  findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<TaskDto>>;
  toggleStatus(idTask: string): Promise<void>;
  create(createTaskDto: CreateTaskDto): Promise<TaskDto>;
}
