import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  // ApiTags,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { CompanyService } from "src/services/create-company/create-company.service";
import { CompanyEntity } from "src/entities/company.entity";
import { CompanyDto } from "src/dto/company.dto";
import { LoginDto } from "src/dto/login.dto";
import { OtpDto } from "src/dto/resendOtp.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

// @ApiTags("User Role")
@Controller()
export class CompanyController {
  constructor(
    //User Role Service
    private companyService: CompanyService
  ) {}

  // User Role APIs start
  @ApiTags("Company")
  @Post("/create-company")
  public async createCompany(
    @Body() companyDto: CompanyDto
  ): Promise<CompanyEntity> {
    return await this.companyService.create(companyDto);
  }

  @ApiTags("Company")
  @Post("/companyLogin")
  public async companyLogin(@Body() loginDto: LoginDto) {
    return await this.companyService.companyLogin(loginDto);
  }

  @ApiTags("Company")
  @Post("/resendOtp")
  public async resendOtp(@Body() otpDto: OtpDto) {
    return await this.companyService.resendOTP(otpDto);
  }

  @ApiTags("Company")
  @Post("/verifydOtp")
  public async verifydOtp(@Body() otpDto: OtpDto) {
    return await this.companyService.verifyOTP(otpDto);
  }
}
