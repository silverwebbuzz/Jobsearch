import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

// export class ProjectDescription {
//   @ApiPropertyOptional()
//   name: string;
//   @ApiPropertyOptional()
//   description: string;
// }
export class JobApplyDto {
  @ApiPropertyOptional()
  @IsOptional()
  companyId: string;

  @ApiPropertyOptional()
  @IsOptional()
  employeeId: string;

  @ApiPropertyOptional()
  @IsOptional()
  jobPostId: string;

  // @ApiPropertyOptional({ type: [ProjectDescription] })
  // @IsOptional()
  // des: ProjectDescription[];
}
