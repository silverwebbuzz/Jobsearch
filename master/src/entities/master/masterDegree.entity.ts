import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "masterDegree" })
export class MasterDegree extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  degree: string;

  // @Column()
  // status: string;

  @CreateDateColumn()
  createdAt: Date;
}
