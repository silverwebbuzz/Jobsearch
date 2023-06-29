import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class MasterAdminDto {
  @ApiPropertyOptional()
  Email: string;

  // @ApiProperty()
  // status: string;

  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional()
  name: string;
}
