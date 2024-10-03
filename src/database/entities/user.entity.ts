import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { TaskEntity } from './task.entity';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
  @Column({ name: 'name', length: 200 })
  name: string;

  @Column({ name: 'email', length: 200 })
  email: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
