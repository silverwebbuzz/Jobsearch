import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class ImageDto {
  @ApiPropertyOptional()
  file: string;

  @ApiPropertyOptional()
  fileName: string;
  @ApiPropertyOptional()
  logoUploded: boolean;
}
