import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class TrackingDto {
  //   @ApiPropertyOptional()
  //   search: string;

  @ApiPropertyOptional()
  candidateStatus: string;

  @ApiPropertyOptional()
  locationDistance: string;

  @ApiPropertyOptional()
  missedCall: string;

  @ApiPropertyOptional()
  interviewed: string;

  @ApiPropertyOptional()
  rejected: string;

  @ApiPropertyOptional()
  haveNotTalked: string;

  @ApiPropertyOptional()
  receivedOfferLetter: string;
}
