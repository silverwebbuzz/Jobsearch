import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
export class JobPreferenceDto {
  //job details
  @ApiProperty()
  company_id: string;
  @ApiPropertyOptional()
  @IsOptional()
  companyName: string;
  @ApiPropertyOptional()
  @IsOptional()
  jobRole: string;
  @ApiPropertyOptional()
  @IsOptional()
  department: string;
  @ApiPropertyOptional()
  @IsOptional()
  categories: string;
  @ApiPropertyOptional()
  @IsOptional()
  typeOfJob: string;
  @ApiPropertyOptional()
  @IsOptional()
  location: string;
  @ApiPropertyOptional()
  @IsOptional()
  minSalary: string;
  @ApiPropertyOptional()
  @IsOptional()
  maxSalary: string;
  @ApiPropertyOptional()
  @IsOptional()
  additionalperks: string[];
  @ApiPropertyOptional()
  @IsOptional()
  bond: string;
  @ApiPropertyOptional()
  @IsOptional()
  bondType: string;
  @ApiPropertyOptional()
  @IsOptional()
  periodsOfBond: string;
  //candidate requirements
  @ApiPropertyOptional()
  @IsOptional()
  minEducation: string;
  @ApiPropertyOptional()
  @IsOptional()
  gender: string;
  @ApiPropertyOptional()
  @IsOptional()
  ageCriteria: string;
  @ApiPropertyOptional()
  @IsOptional()
  minAge: string;
  @ApiPropertyOptional()
  @IsOptional()
  maxAge: string;
  @ApiPropertyOptional()
  @IsOptional()
  experianceRequired: string;
  @ApiPropertyOptional()
  // @IsOptional()
  candidateFromDept: string;
  @ApiPropertyOptional()
  @IsOptional()
  experienced: string;
  @ApiPropertyOptional()
  @IsOptional()
  onlyDepartmentForApply: string;
  @ApiPropertyOptional()
  @IsOptional()
  multipleDepartmentForApply: string[];
  @ApiPropertyOptional()
  @IsOptional()
  candidatesIndustryExperianced: string[]; //max 10 industry
  @ApiPropertyOptional()
  @IsOptional()
  englishLevel: string;
  @ApiPropertyOptional()
  @IsOptional()
  skillPreferance: string[];
  @ApiPropertyOptional()
  @IsOptional()
  jobDescription: string;
  //interview information
  @ApiPropertyOptional()
  @IsOptional()
  connectingWithCandidates: string;
  //if connectingWithCandidates === my self
  @ApiPropertyOptional()
  @IsOptional()
  typeOfInterview: string;
  // if typeOfInterview === in-person
  @ApiPropertyOptional()
  @IsOptional()
  interviewCity: string;
  @ApiPropertyOptional()
  @IsOptional()
  interviewState: string;
  @ApiPropertyOptional()
  @IsOptional()
  interviewCompleteAddress: string;
  @ApiPropertyOptional()
  @IsOptional()
  companyAddressSameAsinterviewAddress: boolean;
  //if companyAddressSameAsinterviewAddress === false then
  @ApiPropertyOptional()
  @IsOptional()
  companyCity: string;
  @ApiPropertyOptional()
  @IsOptional()
  jobLocationAddress: string;

  @ApiPropertyOptional()
  @IsOptional()
  jobLocationCity: string;
  @ApiPropertyOptional()
  @IsOptional()
  jobLocationState: string;
  @ApiPropertyOptional()
  @IsOptional()
  compensation: string;
  @ApiPropertyOptional()
  @IsOptional()
  recieveApplicationFrom: string;
  @ApiPropertyOptional()
  @IsOptional()
  companyState: string;
  @ApiPropertyOptional()
  @IsOptional()
  companyCompleteAddress: string;

  @ApiPropertyOptional()
  @IsOptional()
  saveStatus: string;

  //select plan
  @ApiPropertyOptional()
  @IsOptional()
  plan: string; // basic,standard,corporate
  @ApiPropertyOptional()
  @IsOptional()
  stateCompany: string;
  @ApiPropertyOptional()
  @IsOptional()
  RecruiterName: string;
  @ApiPropertyOptional()
  @IsOptional()
  HRNum: string;
  @ApiPropertyOptional()
  @IsOptional()
  RecruitercontactEmail: string;
  @ApiPropertyOptional()
  @IsOptional()
  flag: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  postStatus: boolean;
}
