import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'task' })
export class TaskEntity extends AbstractEntity {
  @Column({ name: 'title', length: 200 })
  title: string;

  @Column({ name: 'email', length: 100 })
  email: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'due_date', type: 'datetime' })
  due_date: Date;
}
