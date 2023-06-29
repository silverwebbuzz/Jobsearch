import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class QueryOptions {
  @ApiPropertyOptional()
  search: string;

  @ApiPropertyOptional()
  workLocation: string;

  @ApiPropertyOptional()
  experianceLevel: string;

  @ApiPropertyOptional()
  minSalary: string;

  @ApiPropertyOptional()
  maxSalary: string;

  @ApiPropertyOptional()
  minAge: string;

  @ApiPropertyOptional()
  maxAge: string;

  @ApiPropertyOptional()
  gender: string;

  @ApiPropertyOptional()
  resume: string;

  // @ApiPropertyOptional()
  // englishRequirement: string;

  @ApiPropertyOptional()
  basicEnglish: string;
  @ApiPropertyOptional()
  conversationalEnglish: string;
  @ApiPropertyOptional()
  businessEnglish: string;
  @ApiPropertyOptional()
  technicalEnglish: string;
  @ApiPropertyOptional()
  fluentEnglish: string;

  @ApiPropertyOptional()
  entryLevel: string;
  @ApiPropertyOptional()
  intermediate: string;
  @ApiPropertyOptional()
  expert: string;

  // @ApiPropertyOptional()
  // educationQualification: string;

  @ApiPropertyOptional()
  graduate: string;
  @ApiPropertyOptional()
  postGraduate: string;
  @ApiPropertyOptional()
  diploma: string;
  @ApiPropertyOptional()
  anyGraduate: string;
  @ApiPropertyOptional()
  anyPostGraduate: string;

  @ApiPropertyOptional()
  candidateActive: string;

  @ApiPropertyOptional()
  locationDistance: string;

  // @ApiPropertyOptional()
  // locationPreference: string;

  @ApiPropertyOptional()
  onSite: string;
  @ApiPropertyOptional()
  hybrid: string;
  @ApiPropertyOptional()
  remote: string;
  @ApiPropertyOptional()
  freelance: string;
}
