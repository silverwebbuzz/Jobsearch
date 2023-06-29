import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class JobCategoryDto {
  // @ApiPropertyOptional()
  // i_id: string;

  @ApiPropertyOptional()
  categoryName: string;

  @ApiPropertyOptional()
  status: string;
}
