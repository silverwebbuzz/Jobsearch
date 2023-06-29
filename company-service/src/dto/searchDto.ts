import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class SearchDto {
  @ApiPropertyOptional()
  search: string;
}
