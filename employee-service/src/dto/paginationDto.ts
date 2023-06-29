// export class QueryOptions {
//   page?: number;
//   limit?: number;
//   search?: string;
//   sortBy?: string;
//   state?: string;
//   price?: any;
// }

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class QueryOptions {
  // @ApiPropertyOptional()
  // page: number;

  // @ApiPropertyOptional()
  // limit: number;

  @ApiPropertyOptional()
  search: string;

  @ApiPropertyOptional()
  workLocation: string;

  @ApiPropertyOptional()
  fullTime: string;

  @ApiPropertyOptional()
  Internship: string;

  @ApiPropertyOptional()
  Freelance: string;

  @ApiPropertyOptional()
  Volunteer: string;

  @ApiPropertyOptional()
  onSite: string;

  @ApiPropertyOptional()
  Hybrid: string;

  @ApiPropertyOptional()
  Remote: string;

  @ApiPropertyOptional()
  entryLevel: string;

  @ApiPropertyOptional()
  Intermediate: string;

  @ApiPropertyOptional()
  Expert: string;

  // @ApiPropertyOptional()
  // Expert: string;

  // @ApiPropertyOptional()
  // Expert: string;

  // @ApiPropertyOptional()
  // Expert: string;

  // @ApiPropertyOptional()
  // Expert: string;

  // @ApiPropertyOptional()
  // Expert: string;

  // @ApiPropertyOptional()
  // Expert: string;

  // @ApiPropertyOptional()
  // Expert: string;

  // @ApiPropertyOptional()
  // Expert: string;

  @ApiPropertyOptional()
  minSalary: string;

  @ApiPropertyOptional()
  maxSalary: string;

  @ApiPropertyOptional()
  companyCity: string;
  // @ApiProperty()
  // updated_at: Date;

  // @ApiPropertyOptional()
  // updated_by: string;
}
