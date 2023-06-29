import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "Company" })
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  company_id: string;

  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  companyEmail: string;

  @Column({ nullable: true })
  companyPhone: string;

  @Column({ nullable: true })
  logo: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ nullable: true })
  otp: number;

  @Column({ nullable: true })
  emailVerify: number;

  @Column({ nullable: true })
  gstNo: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  pan: string;

  @Column({ nullable: true })
  caffilateCode: string;

  @Column({ nullable: true })
  fromCaff: string;

  @Column({ nullable: true })
  fromEaff: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zipCode: number;

  @Column({ default: false })
  isApproval: boolean;

  @Column({ default: false })
  stayConnectedDetailsFilled: boolean;

  @Column({ nullable: true })
  companyMobile: string;
  @Column({ nullable: true })
  dateOfEstablishment: Date;
  @Column({ nullable: true })
  city: string;
  @Column({ nullable: true })
  country: string;
  @Column({ nullable: true })
  isoBadges: string;
  @Column({ nullable: true })
  companyRegistrationState: string;
  @Column({ nullable: true })
  staffSize: number;

  @CreateDateColumn()
  createdAt: Date;
}
