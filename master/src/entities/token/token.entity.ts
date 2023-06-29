import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "token" })
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  tokenName: string;

  @Column({ nullable: true })
  tokens: string;

  @CreateDateColumn()
  createdAt: Date;
}
