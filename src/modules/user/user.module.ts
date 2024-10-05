import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/database';
import { CreateOrGetUseCase } from './use-cases/createOrGet.use-case';
import { UserGatewayAdapter } from './gateways/user-gateway.adapter';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [UserController],
  providers: [
    CreateOrGetUseCase,
    UserGatewayAdapter,
    {
      provide: 'UserGatewayInterface',
      useExisting: UserGatewayAdapter,
    },
  ],
})
export class UserModule {}
