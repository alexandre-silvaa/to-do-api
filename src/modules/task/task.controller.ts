import { Controller, Get } from '@nestjs/common';
import { FindAllUseCase } from './use-cases/find-all.use-case';

@Controller('task')
export class TaskController {
  constructor(private readonly findAllUseCase: FindAllUseCase) {}

  // @Post()
  // acreate(@Body() createTaskDto: CreateTaskDto) {
  //   return this.taskService.create(createTaskDto);
  // }

  @Get()
  async findAll() {
    return await this.findAllUseCase.execute();
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
