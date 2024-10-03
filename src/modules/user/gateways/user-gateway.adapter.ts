import { InjectRepository } from '@nestjs/typeorm';
import { UserGatewayInterface } from './user-gateway.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/database/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserGatewayAdapter implements UserGatewayInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }
}
