import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dto/user.dto';

export class TaskDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public due_date: Date;

  @ApiProperty()
  public remember_date?: Date;

  @ApiProperty()
  public user: UserDto;
}
