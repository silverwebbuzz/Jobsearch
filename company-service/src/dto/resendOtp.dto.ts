import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class OtpDto {
  //   @ApiProperty()
  //   companyName: string;

  //   @ApiProperty()
  //   companyPhone: string;

  @ApiProperty()
  companyEmail: string;

  @ApiProperty()
  otp: number;

  // @ApiProperty()
  // created_at: Date;

  // @ApiPropertyOptional()
  // created_by: string;

  // @ApiProperty()
  // updated_at: Date;

  // @ApiPropertyOptional()
  // updated_by: string;
}
