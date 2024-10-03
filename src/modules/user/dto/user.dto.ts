import { ApiProperty } from '@nestjs/swagger';
import { TaskDto } from 'src/modules/task/dto/task.dto';

export class UserDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public email: string;

  @ApiProperty({ type: [TaskDto] })
  public tasks: TaskDto[];
}
