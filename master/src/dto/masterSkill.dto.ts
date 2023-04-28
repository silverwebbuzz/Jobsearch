import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class MasterSkillDto {
  @ApiProperty()
  c_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  cratedAt: string;

  // @ApiPropertyOptional()
  // created_by: string;

  // @ApiProperty()
  // updated_at: Date;

  // @ApiPropertyOptional()
  // updated_by: string;
}
