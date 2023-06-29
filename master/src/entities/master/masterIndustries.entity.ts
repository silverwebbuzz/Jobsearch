import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "masterIndustries" })
export class MasterIndustries extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  industryName: string;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
