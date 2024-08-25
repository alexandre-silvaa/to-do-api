import { PageOptionsDto } from './../../../shared/dtos/page-options.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskGatewayInterface } from './task-gateway.interface';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/database/entities/task.entity';
import { Repository } from 'typeorm';
import { PageMetaDto } from 'src/shared/dtos/page-meta.dto';
import { PageDto } from 'src/shared/dtos/page.dto';

@Injectable()
export class TaskGatewayAdapter implements TaskGatewayInterface {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
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
}
