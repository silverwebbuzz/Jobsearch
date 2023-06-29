import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class BalanceTokenDto {
  @ApiPropertyOptional()
  companyId: string;

  @ApiPropertyOptional()
  token: number;

  // @ApiProperty()
  // status: string;

  // @ApiProperty()
  // cratedAt: string;
}
