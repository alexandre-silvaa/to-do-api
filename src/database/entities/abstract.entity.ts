import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;
}
