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

import { CompanyService } from "src/services/create-company/create-company.service";
import { CompanyEntity } from "src/entities/company.entity";
import { CompanyDto } from "src/dto/company.dto";
import { LoginDto } from "src/dto/login.dto";
import { OtpDto } from "src/dto/resendOtp.dto";

// @ApiTags("User Role")
@Controller()
export class CompanyController {
  constructor(
    //User Role Service
    private companyService: CompanyService
  ) {}

  // User Role APIs start
  @Post("/create-company")
  public async createCompany(
    @Body() companyDto: CompanyDto
  ): Promise<CompanyEntity> {
    return await this.companyService.create(companyDto);
  }

  @Post("/companyLogin")
  public async companyLogin(@Body() loginDto: LoginDto) {
    return await this.companyService.companyLogin(loginDto);
  }

  @Post("/resendOtp")
  public async resendOtp(@Body() otpDto: OtpDto) {
    return await this.companyService.resendOTP(otpDto);
  }

  @Post("/verifydOtp")
  public async verifydOtp(@Body() otpDto: OtpDto) {
    return await this.companyService.verifyOTP(otpDto);
  }
}
