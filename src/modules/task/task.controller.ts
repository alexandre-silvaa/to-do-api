import { PageOptionsDto } from '../../shared/dtos/page-options.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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

@UseInterceptors(ClassSerializerInterceptor)
@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor(
    private readonly findAllUseCase: FindAllUseCase,
    private readonly createUseCase: CreateUseCase,
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.taskService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.taskService.update(+id, updateTaskDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.taskService.remove(+id);
  // }
}
