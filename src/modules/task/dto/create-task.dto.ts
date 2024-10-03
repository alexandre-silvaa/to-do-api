import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString({ message: 'O título deve ser uma string.' })
  @IsNotEmpty({ message: 'O título não pode estar vazio.' })
  public title: string;

  @ApiProperty()
  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  public description: string;

  @ApiProperty()
  @IsDate({ message: 'A data de vencimento deve ser uma data válida.' })
  @IsNotEmpty({ message: 'A data de vencimento não pode estar vazia.' })
  @Type(() => Date)
  public due_date: Date;

  @ApiProperty()
  @IsDate({ message: 'A data de vencimento deve ser uma data válida.' })
  @Type(() => Date)
  public remember_date?: Date;

  @ApiProperty({ description: 'ID do usuário associado a esta tarefa' })
  @IsString({ message: 'O ID do usuário deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O ID do usuário não pode estar vazio.' })
  public userId: string;
}
