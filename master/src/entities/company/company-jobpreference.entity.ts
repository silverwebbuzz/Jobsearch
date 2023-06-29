import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  Column,
  Entity,
} from "typeorm";

@Entity({ name: "companyJobPreference" })
export class CompanyJobPreferenceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  company_id: string;

  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  jobPostStatus: string;

  @Column({ nullable: true })
  jobRole: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  categories: string;

  @Column({ nullable: true })
  typeOfJob: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  minSalary: string;

  @Column({ nullable: true })
  maxSalary: string;

  @Column({ type: "simple-array", nullable: true })
  additionalperks: string[];

  @Column({ nullable: true })
  bond: string;

  @Column({ nullable: true })
  bondType: string;

  @Column({ nullable: true })
  periodsOfBond: string;

  //candidate requirements
  @Column({ nullable: true })
  minEducation: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  ageCriteria: string;

  @Column({ nullable: true })
  minAge: string;

  @Column({ nullable: true })
  maxAge: string;

  @Column({ nullable: true })
  experianceRequired: string;

  @Column({ nullable: true })
  candidateFromDept: string;

  @Column({ nullable: true })
  experienced: string;

  @Column({ nullable: true })
  onlyDepartmentForApply: string;

  @Column({ type: "simple-array", nullable: true })
  multipleDepartmentForApply: string[];

  @Column({ type: "simple-array", nullable: true })
  candidatesIndustryExperianced: string[];
  //max 10 industry
  @Column({ nullable: true })
  englishLevel: string;

  @Column({ type: "simple-array", nullable: true })
  skillPreferance: string[];

  @Column({ nullable: true })
  jobDescription: string;

  @Column({ nullable: true })
  jobLocationCity: string;

  @Column({ nullable: true })
  jobLocationState: string;

  @Column({ nullable: true })
  recieveApplicationFrom: string;

  //interview information
  @Column({ nullable: true })
  connectingWithCandidates: string;

  //if connectingWithCandidates === my self
  @Column({ nullable: true })
  typeOfInterview: string;

  // if typeOfInterview === in-person
  @Column({ nullable: true })
  interviewCity: string;

  @Column({ nullable: true })
  interviewState: string;

  @Column({ nullable: true })
  interviewCompleteAddress: string;

  @Column({ nullable: true })
  companyAddressSameAsinterviewAddress: boolean;

  //if companyAddressSameAsinterviewAddress === false then
  @Column({ nullable: true })
  companyCity: string;

  @Column({ nullable: true })
  jobLocationAddress: string;

  @Column({ nullable: true })
  companyState: string;

  @Column({ nullable: true })
  compensation: string;

  @Column({ nullable: true })
  companyCompleteAddress: string;

  //select plan
  @Column({ nullable: true })
  plan: string;

  @Column({ nullable: true })
  stateCompany: string;

  @Column({ nullable: true })
  saveStatus: string;

  @Column({ nullable: true })
  RecruiterName: string;

  @Column({ nullable: true })
  HRNum: string;

  @Column({ nullable: true })
  RecruitercontactEmail: string;

  @Column({ default: false })
  flag: boolean;

  @Column({ default: false })
  postStatus: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
//job details
// basic,standard,corporate
