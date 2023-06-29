import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class MasterIndustriesDto {
  @ApiPropertyOptional()
  industryName: string;

  @ApiPropertyOptional()
  status: string;
}
