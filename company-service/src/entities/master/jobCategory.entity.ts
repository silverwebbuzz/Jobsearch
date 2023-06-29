import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "jobCategory" })
export class JobCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ nullable: true })
  // i_id: string;

  @Column({ nullable: true })
  categoryName: string;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
