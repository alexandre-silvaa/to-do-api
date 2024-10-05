import { InjectRepository } from '@nestjs/typeorm';
import { UserGatewayInterface } from './user-gateway.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/database/entities/user.entity';
import { CreateOrGetUserDto } from '../dto/createOrGet-user.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserGatewayAdapter implements UserGatewayInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserDto> {
    return await this.userRepository.findOne({
      relations: { tasks: true },
      where: { email },
    });
  }

  async create(createOrGetUserDto: CreateOrGetUserDto): Promise<UserDto> {
    const user = this.userRepository.create(createOrGetUserDto);
    return await this.userRepository.save(user);
  }
}
