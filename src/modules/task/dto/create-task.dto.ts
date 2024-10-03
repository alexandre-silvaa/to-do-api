import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString({ message: 'O título deve ser uma string.' })
  @IsNotEmpty({ message: 'O título não pode estar vazio.' })
  public title: string;

  @ApiProperty()
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  public email: string;

  @ApiProperty()
  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  public description: string;

  @ApiProperty()
  @IsDate({ message: 'A data de vencimento deve ser uma data válida.' })
  @IsNotEmpty({ message: 'A data de vencimento não pode estar vazia.' })
  @Type(() => Date)
  public due_date: Date;
}
