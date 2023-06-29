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

  // @Column()
  // c_id: string;

  @Column()
  skillName: string;

  // @Column()
  // status: string;

  @CreateDateColumn()
  createdAt: Date;
}
