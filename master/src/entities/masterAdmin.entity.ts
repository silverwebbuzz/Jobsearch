import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'masterAdmin' })
export class MasterAdmin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ type: 'varchar', nullable: true })
  Email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;
}
