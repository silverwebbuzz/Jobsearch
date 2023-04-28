import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from "typeorm";

@Entity({ name: "Company" })
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  companyName: string;

  @Column({ type: "varchar", nullable: true })
  companyEmail: string;

  @Column({ type: "varchar", nullable: true })
  companyPhone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  otp: number;

  @Column({ nullable: true })
  emailVerify: number;
}