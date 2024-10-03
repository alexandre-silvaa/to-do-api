import { Inject, Injectable } from '@nestjs/common';
import { UserGatewayInterface } from '../gateways/user-gateway.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUseCase {
  constructor(
    @Inject('UserGatewayInterface')
    private readonly userGatewayInterface: UserGatewayInterface,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    return await this.userGatewayInterface.create(createUserDto);
  }
}
