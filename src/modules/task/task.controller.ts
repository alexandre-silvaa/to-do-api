import { PageOptionsDto } from '../../shared/dtos/page-options.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FindAllUseCase } from './use-cases/find-all.use-case';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';
import { ApiPaginatedResponse } from 'src/shared/decorators/api-paginated-response.decorator';
import { CreateUseCase } from './use-cases/create.use-case';
import { CreateTaskDto } from './dto/create-task.dto';
import { ToggleStatusUseCase } from './use-cases/toggle-status.use-case';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor(
    private readonly findAllUseCase: FindAllUseCase,
    private readonly createUseCase: CreateUseCase,
    private readonly toggleStatusUseCase: ToggleStatusUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cria uma nova tarefa' })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso.',
    type: TaskDto,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.createUseCase.execute(createTaskDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Busca todas as tarefas' })
  @ApiPaginatedResponse(TaskDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.findAllUseCase.execute(pageOptionsDto);
  }

  @Patch(':idTask')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Atualiza o status de uma tarefa para feito ou não',
  })
  @ApiResponse({
    status: 204,
    description: 'Tarefa atualizada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.' })
  async toggleTaskStatus(@Param('idTask', ParseUUIDPipe) idTask: string) {
    await this.toggleStatusUseCase.execute(idTask);
  }
}
