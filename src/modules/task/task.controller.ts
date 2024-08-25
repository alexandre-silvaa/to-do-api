import { PageOptionsDto } from './../../shared/dtos/page-options.dto';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FindAllUseCase } from './use-cases/find-all.use-case';
import { ApiTags } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';
import { ApiPaginatedResponse } from 'src/shared/decorators/api-paginated-response.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly findAllUseCase: FindAllUseCase) {}

  // @Post()
  // create(@Body() createTaskDto: CreateTaskDto) {
  //   return this.taskService.create(createTaskDto);
  // }

  @Get()
  @HttpCode(HttpStatus.OK)
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
