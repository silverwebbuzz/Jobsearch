import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export class EmployeeDto {
  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional()
  employee_id: string;

  @ApiPropertyOptional()
  employeePhone: string;

  @ApiPropertyOptional()
  employeeEmail: string;

  @ApiPropertyOptional()
  password: string;
}
