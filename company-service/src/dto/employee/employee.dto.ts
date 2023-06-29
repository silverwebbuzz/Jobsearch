import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
export class socialProfiles {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  link: string;
}
export class workSample {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  link: string;
  @ApiPropertyOptional()
  from: Date;
  @ApiPropertyOptional()
  to: Date;
}

export class educationalDetails {
  @ApiPropertyOptional()
  courseName: string;
  @ApiPropertyOptional()
  universityName: string;
  @ApiPropertyOptional()
  year: number;
  @ApiPropertyOptional()
  type: string;
}

export class languagesKnown {
  @ApiPropertyOptional()
  languages: string;
  @ApiPropertyOptional()
  proficiency: string;
  @ApiPropertyOptional()
  read: string;
  @ApiPropertyOptional()
  write: string;
  @ApiPropertyOptional()
  speak: string;
}

export class itSkills {
  @ApiPropertyOptional()
  skill: string;
  @ApiPropertyOptional()
  version: string;
  @ApiPropertyOptional()
  lastUsed: Date;
  @ApiPropertyOptional()
  experience: number;
}

export class workExperience {
  @ApiPropertyOptional()
  workName: string;
  @ApiPropertyOptional()
  companyName: string;
  @ApiPropertyOptional()
  from: Date;
  @ApiPropertyOptional()
  to: Date;
  @ApiPropertyOptional()
  noticePeriod: number;
  @ApiPropertyOptional()
  monthlySalary: number;

  @ApiPropertyOptional()
  description: string;
}
export class projects {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  description: string;
}

export class EmployeeDto {
  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional()
  employee_id: string;

  @ApiPropertyOptional()
  employeePhone: string;

  @ApiPropertyOptional()
  employeeEmail: string;

  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional({ type: [socialProfiles] })
  @IsOptional()
  socialProfile: socialProfiles[];

  @ApiPropertyOptional({ type: [workSample] })
  @IsOptional()
  workSample: workSample[];

  @ApiPropertyOptional({ type: [languagesKnown] })
  @IsOptional()
  languagesKnown: languagesKnown[];

  @ApiPropertyOptional({ type: [educationalDetails] })
  @IsOptional()
  educationalDetails: educationalDetails[];

  @ApiPropertyOptional({ type: [itSkills] })
  @IsOptional()
  itSkills: itSkills[];

  @ApiPropertyOptional({ type: [workExperience] })
  @IsOptional()
  workExperience: workExperience[];

  @ApiPropertyOptional({ type: [projects] })
  @IsOptional()
  projects: projects[];

  @ApiPropertyOptional()
  otp: number;
  @ApiPropertyOptional()
  emailVerify: number;
  @ApiPropertyOptional()
  createdAt: Date;
  @ApiPropertyOptional()
  profilePicture: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  location: string;
  @ApiPropertyOptional()
  role: string;
  @ApiPropertyOptional()
  roleDescription: string;
  @ApiPropertyOptional()
  mobileNo: number;
  @ApiPropertyOptional()
  homeTown: string;
  @ApiPropertyOptional()
  gender: string;
  @ApiPropertyOptional()
  martialStatus: string;
  @ApiPropertyOptional()
  workPermitForOther: string;
  @ApiPropertyOptional()
  speciallyAbled: string;
  @ApiPropertyOptional()
  category: string;
  @ApiPropertyOptional()
  permanantAddress: string;
  @ApiPropertyOptional()
  pinCode: number;
  @ApiPropertyOptional()
  dateOfBirth: Date;
  @ApiPropertyOptional()
  workPermitForOtherExceptUsa: string;
  @ApiPropertyOptional()
  nationality: string;
  @ApiPropertyOptional()
  employeeCountry: string;
  @ApiPropertyOptional()
  industry: string;
  @ApiPropertyOptional()
  function: string;
  @ApiPropertyOptional()
  employmentType: string;
  @ApiPropertyOptional()
  preferredLocation: string;
  @ApiPropertyOptional()
  sixDaysInWeek: string;
  @ApiPropertyOptional()
  joinEarlyStageStartUps: string;
  @ApiPropertyOptional()
  jobType: string;
  @ApiPropertyOptional()
  preferredShift: string;
  @ApiPropertyOptional()
  expectedSalary: number;
}
