import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class TokenDto {
  @ApiPropertyOptional()
  tokenName: string;

  @ApiPropertyOptional()
  tokens: string;
}
