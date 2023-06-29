import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

// export class ProjectDescription {
//   @ApiPropertyOptional()
//   name: string;
//   @ApiPropertyOptional()
//   description: string;
// }
export class ChangePasswordDto {
  @ApiPropertyOptional()
  @IsOptional()
  companyEmail: string;

  @ApiPropertyOptional()
  @IsOptional()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  newPassword: string;

  // @ApiPropertyOptional({ type: [ProjectDescription] })
  // @IsOptional()
  // des: ProjectDescription[];
}
