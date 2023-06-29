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
import { EmployeeEntity } from "src/entities/employee/employee.entity";
import { EmployeeEditDto } from "src/dto/employee/employeeEdit.dto";
import { EmployeeDto } from "src/dto/employee/employee.dto";
import { LoginDto } from "src/dto/employee/login.dto";
import { OtpDto } from "src/dto/employee/resendOtp.dto";
import { ChangePasswordDto } from "src/dto/employee/changePassword.dto";
import { ResumeDto } from "src/dto/employee/resume.dto";
import { ProfileDto } from "src/dto/employee/profile.dto";

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
  ) {
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

  @ApiTags("Employee")
  @Get("/getEmployeeById/:id")
  public async getAdminById(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.employeeService.getEmployeeById(id);
  }

  @ApiTags("Employee")
  @Post("/employeeUpdate/:id")
  public async DegreeUpdate(
    @Param("id") id: number,
    @Body() employeeEditDto: EmployeeEditDto
  ) {
    return await this.employeeService.employeeUpdate(id, employeeEditDto);
  }

  @ApiTags("Employee")
  @Post("/updatePassword")
  public async updatePassword(
    @Body() changePasswordDto: ChangePasswordDto
    // @Res() res
  ) {
    return await this.employeeService.updatePassword(changePasswordDto);
  }

  @ApiTags("Employee")
  @Post("/forgotPassword")
  public async forgotPassword(
    @Body() changePasswordDto: ChangePasswordDto
    // @Res() res
  ) {
    return await this.employeeService.forgotPassword(changePasswordDto);
  }

  @ApiTags("Employee")
  @Post("/changePassword")
  public async changePassword(
    @Body() changePasswordDto: ChangePasswordDto
    // @Res() res
  ) {
    return await this.employeeService.changePassword(changePasswordDto);
  }

  @ApiTags("resumeUpload")
  @Post("/resumeUpload/:id")
  public async resumeUpload(
    @Param("id") id: number,
    @Body() resumeDto: ResumeDto
  ) {
    return await this.employeeService.resumeUpload(id, resumeDto);
  }
  @ApiTags("resumeUpload")
  @Get("uploads/resume/:filename")
  public async getProfileImage(@Param("filename") filename: any, @Res() res) {
    return res.sendFile(filename, { root: "uploads/resume" });
  }

  @ApiTags("ProfileUpload")
  @Post("/ProfileUpload/:id")
  public async ProfileUpload(
    @Param("id") id: number,
    @Body() profileDto: ProfileDto
  ) {
    return await this.employeeService.ProfileUpload(id, profileDto);
  }
  @ApiTags("ProfileUpload")
  @Get("uploads/employee/:filename")
  public async ProfileImage(@Param("filename") filename: any, @Res() res) {
    return res.sendFile(filename, { root: "uploads/employee" });
  }
}
