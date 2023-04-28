import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "masterRole" })
export class MasterRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;
}