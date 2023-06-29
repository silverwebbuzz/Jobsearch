import { ArrayObjectTransformer } from "src/helper/demo";
import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "Employee" })
export class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  currentCompany: string;

  @Column({ nullable: true })
  employeeEmail: string;

  @Column({ nullable: true })
  employee_id: string;

  @Column({ nullable: true })
  employeePhone: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ nullable: true })
  otp: number;

  @Column({ nullable: true })
  emailVerify: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  expectedMinSalary: string;
  @Column({ nullable: true })
  expectedMaxSalary: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  roleDescription: string;

  @Column({ nullable: true })
  mobileNo: number;

  @Column({ nullable: true })
  homeTown: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  martialStatus: string;

  @Column({ nullable: true })
  workPermitForOther: string;

  @Column({ nullable: true })
  speciallyAbled: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  permanantAddress: string;

  @Column({ nullable: true })
  pinCode: number;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  workPermitForOtherExceptUsa: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  employeeCountry: string;

  @Column({ nullable: true })
  resume: string;

  @Column({ nullable: true })
  employeeCity: string;

  @Column({ nullable: true })
  yearsOfRelevantExperience: number;

  @Column({ nullable: true })
  currentSalary: number;

  @Column({ nullable: true })
  noticePeriod: number;

  @Column({ default: false })
  stayConnectedDetailsFilled: boolean;

  @Column({ default: false })
  resumeUploded: boolean;

  @Column({
    type: "jsonb",
    transformer: new ArrayObjectTransformer(),
    nullable: true,
  })
  socialProfile: object[];

  @Column({
    type: "jsonb",
    transformer: new ArrayObjectTransformer(),
    nullable: true,
  })
  workSample: object[];

  @Column({
    type: "jsonb",
    transformer: new ArrayObjectTransformer(),
    nullable: true,
  })
  languagesKnown: object[];

  @Column({
    type: "jsonb",
    transformer: new ArrayObjectTransformer(),
    nullable: true,
  })
  educationalDetails: object[];

  @Column({
    type: "jsonb",
    transformer: new ArrayObjectTransformer(),
    nullable: true,
  })
  itSkills: object[];

  @Column({
    type: "jsonb",
    transformer: new ArrayObjectTransformer(),
    nullable: true,
  })
  workExperience: object[];

  @Column({
    type: "jsonb",
    transformer: new ArrayObjectTransformer(),
    nullable: true,
  })
  projects: object[];

  @Column({
    type: "jsonb",
    transformer: new ArrayObjectTransformer(),
    nullable: true,
  })
  interpersonalSkills: object[];

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  function: string;

  @Column({ nullable: true })
  employmentType: string;

  @Column({ nullable: true })
  preferredLocation: string;

  @Column({ nullable: true })
  sixDaysInWeek: string;

  @Column({ nullable: true })
  joinEarlyStageStartUps: string;

  @Column({ nullable: true })
  jobType: string;

  @Column({ nullable: true })
  employeeState: string;

  @Column({ nullable: true })
  preferredShift: string;

  @Column({ nullable: true })
  expectedSalary: number;
}
