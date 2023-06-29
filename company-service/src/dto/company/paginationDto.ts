// export class QueryOptions {
//   page?: number;
//   limit?: number;
//   search?: string;
//   sortBy?: string;
//   state?: string;
//   price?: any;
// }

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";
export class QueryOptions {

  @ApiPropertyOptional()
  status: string;

  @ApiPropertyOptional()
  sortBy: string;

}
