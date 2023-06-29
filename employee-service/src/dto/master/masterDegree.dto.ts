import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class MasterDegreeDto {
  @ApiPropertyOptional()
  degree: string;

  // @ApiProperty()
  // status: string;

  // @ApiProperty()
  // cratedAt: string;
}
