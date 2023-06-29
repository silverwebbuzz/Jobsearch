import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "JobApply" })
export class JobApplyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  companyId: string;

  @Column({ nullable: true })
  employeeId: string;

  @Column({ nullable: true })
  jobPostId: string;

  // @Column({ type: "simple-array", nullable: true })
  // desc: string[];,

  @CreateDateColumn()
  createdAt: Date;
}
