import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class MasterSkillDto {
  @ApiPropertyOptional()
  c_id: string;

  @ApiPropertyOptional()
  name: string;

  // @ApiProperty()
  // status: string;

  // @ApiProperty()
  // cratedAt: string;

  // @ApiPropertyOptional()
  // created_by: string;

  // @ApiProperty()
  // updated_at: Date;

  // @ApiPropertyOptional()
  // updated_by: string;
}
