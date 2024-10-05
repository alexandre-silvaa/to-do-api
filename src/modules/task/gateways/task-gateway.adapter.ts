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
import { subtractThreeHours } from 'src/shared/utils/functions';

@Injectable()
export class TaskGatewayAdapter implements TaskGatewayInterface {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async toggleStatus(idTask: string): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({ where: { id: idTask } });
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada!');
    }
    await this.taskRepository.update(idTask, {
      done: !task.done,
    });

    return await this.taskRepository.findOne({
      where: { id: idTask },
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const tasks = await this.taskRepository.findAndCount({
      order: { createdAt: pageOptionsDto?.order },
      select: {
        id: true,
        description: true,
        title: true,
        done: true,
        due_date: true,
        remember_date: true,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    });

    const adjustedTasks = tasks[0].map((task) => ({
      ...task,
      due_date: subtractThreeHours(task.due_date),
      remember_date: task.remember_date
        ? subtractThreeHours(task.remember_date)
        : undefined,
    }));

    const pageMetaDto = new PageMetaDto({
      itemCount: tasks[1],
      pageOptionsDto,
    });

    return new PageDto(adjustedTasks, pageMetaDto);
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
