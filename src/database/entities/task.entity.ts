import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'task' })
export class TaskEntity extends AbstractEntity<TaskEntity> {
  @Column({ name: 'title', length: 200 })
  title: string;

  @Column({ name: 'description', length: 255, nullable: true })
  description: string;
}
