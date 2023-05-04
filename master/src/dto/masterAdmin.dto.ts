import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty } from 'class-validator';
export class MasterAdminDto {
  @ApiProperty()
  Email: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  password: string;
}
