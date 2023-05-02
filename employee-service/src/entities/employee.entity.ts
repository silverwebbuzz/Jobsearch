import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from "typeorm";

@Entity({ name: "Employee" })
export class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  firstName: string;

  @Column({ type: "varchar", nullable: true })
  lastName: string;

  @Column({ type: "varchar", nullable: true })
  employeeEmail: string;

  
  @Column({ nullable: true })
  employee_id: string;

  @Column({ type: "varchar", nullable: true })
  employeePhone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  otp: number;

  @Column({ nullable: true })
  emailVerify: number;
}
