import { PageOptionsDto } from 'src/shared/dtos/page-options.dto';
import { PageDto } from 'src/shared/dtos/page.dto';
import { TaskDto } from '../dto/task.dto';

export interface TaskGatewayInterface {
  findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<TaskDto>>;
}
