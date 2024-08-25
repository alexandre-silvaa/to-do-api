import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;
}
