import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

import { EmployeeService } from "src/services/create-employee/create-employee.service";
import { EmployeeEntity } from "src/entities/employee.entity";
import { EmployeeDto } from "src/dto/employee.dto";
import { LoginDto } from "src/dto/login.dto";
import { OtpDto } from "src/dto/resendOtp.dto";

// @ApiTags("User Role")
@Controller()
export class EmployeeController {
  constructor(
    //User Role Service
    private employeeService: EmployeeService
  ) {}

  // User Role APIs start
  @ApiTags("Employee")
  @Post("/create-employee")
  public async createEmployee(
    @Body() employeeDto: EmployeeDto
    // @Res() res
  ): Promise<EmployeeEntity> {
    return await this.employeeService.create(employeeDto);
  }

  @ApiTags("Employee")
  @Post("/employeeLogin")
  public async employeeLogin(@Body() loginDto: LoginDto) {
    return await this.employeeService.employeeLogin(loginDto);
  }

  @ApiTags("Employee")
  @Post("/resendOtp")
  public async resendOtp(@Body() otpDto: OtpDto) {
    return await this.employeeService.resendOTP(otpDto);
  }

  @ApiTags("Employee")
  @Post("/verifydOtp")
  public async verifydOtp(@Body() otpDto: OtpDto) {
    return await this.employeeService.verifyOTP(otpDto);
  }
}
