import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/database';
import { CreateUseCase } from './use-cases/create.use-case';
import { UserGatewayAdapter } from './gateways/user-gateway.adapter';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [UserController],
  providers: [
    CreateUseCase,
    UserGatewayAdapter,
    {
      provide: 'UserGatewayInterface',
      useExisting: UserGatewayAdapter,
    },
  ],
})
export class UserModule {}
