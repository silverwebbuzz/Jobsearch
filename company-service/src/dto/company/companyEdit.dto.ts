import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class CompanyEditDto {
  @ApiPropertyOptional()
  companyName: string;

  @ApiPropertyOptional()
  companyPhone: string;

  @ApiPropertyOptional()
  companyEmail: string;

  @ApiPropertyOptional()
  gstNo: string;

  @ApiPropertyOptional()
  website: string;

  @ApiPropertyOptional()
  pan: string;

  @ApiPropertyOptional()
  caffilateCode: string;

  @ApiPropertyOptional()
  fromCaff: string;

  @ApiPropertyOptional()
  fromEaff: string;

  @ApiPropertyOptional()
  linkedin: string;

  @ApiPropertyOptional()
  twitter: string;

  @ApiPropertyOptional()
  facebook: string;

  @ApiPropertyOptional()
  address: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  state: string;

  @ApiPropertyOptional()
  zipCode: string;

  @ApiPropertyOptional()
  isApproval: boolean;

  @ApiPropertyOptional()
  stayConnectedDetailsFilled: boolean;

  @ApiPropertyOptional()
  companyMobile: string;

  @ApiPropertyOptional()
  dateOfEstablishment: Date;

  @ApiPropertyOptional()
  city: string;

  @ApiPropertyOptional()
  country: string;

  @ApiPropertyOptional()
  isoBadges: string;

  @ApiPropertyOptional()
  companyRegistrationState: string;

  @ApiPropertyOptional()
  staffSize: number;

  //   @ApiProperty()
  //   password: string;

  // @ApiProperty()
  // createdAt: Date;

  // @ApiPropertyOptional()
  // created_by: string;

  // @ApiProperty()
  // updated_at: Date;

  // @ApiPropertyOptional()
  // updated_by: string;
}
