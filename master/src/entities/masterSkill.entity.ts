import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "masterSkill" })
export class masterSkill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  c_id: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
