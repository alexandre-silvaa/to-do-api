import { PageOptionsDto } from '../../../shared/dtos/page-options.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskGatewayInterface } from './task-gateway.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from 'src/database/entities/task.entity';
import { Repository } from 'typeorm';
import { PageMetaDto } from 'src/shared/dtos/page-meta.dto';
import { PageDto } from 'src/shared/dtos/page.dto';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskDto } from '../dto/task.dto';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class TaskGatewayAdapter implements TaskGatewayInterface {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto) {
    const response = await this.taskRepository.findAndCount({
      order: { createdAt: pageOptionsDto?.order },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    });

    const pageMetaDto = new PageMetaDto({
      itemCount: response[1],
      pageOptionsDto,
    });

    return new PageDto(response[0], pageMetaDto);
  }

  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const { title, description, due_date, userId, remember_date } =
      createTaskDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const task = this.taskRepository.create({
      title,
      description,
      due_date,
      user,
      remember_date,
    });
    return await this.taskRepository.save(task);
  }
}
