import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class OtpDto {
  //   @ApiProperty()
  //   companyName: string;

  //   @ApiProperty()
  //   companyPhone: string;

  @ApiPropertyOptional()
  companyEmail: string;

  @ApiPropertyOptional()
  otp: number;

  // @ApiProperty()
  // createdAt: Date;

  // @ApiPropertyOptional()
  // created_by: string;

  // @ApiProperty()
  // updated_at: Date;

  // @ApiPropertyOptional()
  // updated_by: string;
}
