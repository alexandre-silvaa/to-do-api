import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserGatewayInterface } from '../gateways/user-gateway.interface';
import { CreateOrGetUserDto } from '../dto/createOrGet-user.dto';

@Injectable()
export class CreateOrGetUseCase {
  constructor(
    @Inject('UserGatewayInterface')
    private readonly userGatewayInterface: UserGatewayInterface,
  ) {}

  async execute(createOrGetUserDto: CreateOrGetUserDto) {
    const user = await this.findByEmailAndValidateName(
      createOrGetUserDto.name,
      createOrGetUserDto.email,
    );
    if (!user) {
      return await this.userGatewayInterface.create(createOrGetUserDto);
    }
    return user;
  }

  async findByEmailAndValidateName(name: string, email: string) {
    const user = await this.userGatewayInterface.findByEmail(email);
    console.log(user, name, email);
    if (user && user.name !== name) {
      throw new ConflictException('Email já está em uso por outro usuário!');
    }
    return user;
  }
}
