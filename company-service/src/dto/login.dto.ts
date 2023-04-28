import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class LoginDto {
//   @ApiProperty()
//   companyName: string;

//   @ApiProperty()
//   companyPhone: string;

  @ApiProperty()
  companyEmail: string;

  @ApiProperty()
  password: string;

  // @ApiProperty()
  // created_at: Date;

  // @ApiPropertyOptional()
  // created_by: string;

  // @ApiProperty()
  // updated_at: Date;

  // @ApiPropertyOptional()
  // updated_by: string;
}
