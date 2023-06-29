import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class MasterRoleDto {
  @ApiPropertyOptional()
  name: string;

  // @ApiProperty()
  // status: string;

  // @ApiProperty()
  // cratedAt: string;
}
