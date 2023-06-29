import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "balanceToken" })
export class BalanceTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyId: string;

  @Column()
  token: number;

  // @Column()
  // status: string;

  @CreateDateColumn()
  createdAt: Date;
}
