import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'task' })
export class TaskEntity extends AbstractEntity {
  @Column({ name: 'title', length: 200 })
  title: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'due_date', type: 'datetime' })
  due_date: Date;

  @Column({ name: 'remember_date', type: 'datetime', nullable: true })
  remember_date: Date;

  @Column({ name: 'done', type: 'boolean', default: false })
  done: boolean;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
