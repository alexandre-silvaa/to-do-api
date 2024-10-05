import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrGetUseCase } from './use-cases/createOrGet.use-case';
import { UserDto } from './dto/user.dto';
import { CreateOrGetUserDto } from './dto/createOrGet-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly createOrGetUseCase: CreateOrGetUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cria um usuário ou busca através de nome e email' })
  @ApiResponse({
    status: 201,
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.' })
  createOrGetUser(@Body() createOrGetUserDto: CreateOrGetUserDto) {
    console.log(createOrGetUserDto);
    return this.createOrGetUseCase.execute(createOrGetUserDto);
  }
}
