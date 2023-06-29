import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class ResumeDto {
  @ApiPropertyOptional()
  file: string;
  @ApiPropertyOptional()
  fileName: string;
  @ApiPropertyOptional()
  resumeUploded: boolean;
}
