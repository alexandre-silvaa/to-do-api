import { CreateOrGetUserDto } from '../dto/createOrGet-user.dto';
import { UserDto } from '../dto/user.dto';

export interface UserGatewayInterface {
  findByEmail(email: string): Promise<UserDto>;
  create(createOrGetUserDto: CreateOrGetUserDto): Promise<UserDto>;
}
