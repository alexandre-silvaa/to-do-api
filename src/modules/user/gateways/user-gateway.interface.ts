import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';

export interface UserGatewayInterface {
  create(createUserTask: CreateUserDto): Promise<UserDto>;
}
