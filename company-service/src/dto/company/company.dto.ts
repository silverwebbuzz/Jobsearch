import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class CompanyDto {
  @ApiPropertyOptional()
  companyName: string;

  @ApiPropertyOptional()
  companyPhone: string;

  @ApiPropertyOptional()
  companyEmail: string;

  @ApiPropertyOptional()
  password: string;

  // @ApiProperty()
  // createdAt: Date;

  // @ApiPropertyOptional()
  // created_by: string;

  // @ApiProperty()
  // updated_at: Date;

  // @ApiPropertyOptional()
  // updated_by: string;
}
