import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNCHRONIZE,
  DB_USERNAME,
} from '../shared/constants/constants';
import { entities } from '.';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow(DB_HOST),
        port: Number(configService.getOrThrow(DB_PORT)),
        database: configService.getOrThrow(DB_DATABASE),
        username: configService.getOrThrow(DB_USERNAME),
        password: configService.getOrThrow(DB_PASSWORD),
        autoLoadEntities: true,
        synchronize: Boolean(configService.getOrThrow(DB_SYNCHRONIZE)),
        entities: [...entities],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
