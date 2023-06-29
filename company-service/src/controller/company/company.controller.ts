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
import { CompanyEntity } from "src/entities/company/company.entity";
import { CompanyDto } from "src/dto/company/company.dto";
import { LoginDto } from "src/dto/auth/login.dto";
import { OtpDto } from "src/dto/auth/resendOtp.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CompanyEditDto } from "src/dto/company/companyEdit.dto";
import { QueryOptions } from "src/dto/paginationDto";
import { StateDto } from "src/dto/state.dto";
import { ChangePasswordDto } from "src/dto/auth/changePassword.dto";
import { SearchDto } from "src/dto/searchDto";
import { ImageDto } from "src/dto/company/image.dto";

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

  @ApiTags("Company")
  @Get("/getCompanyById/:id")
  public async getAdminById(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.companyService.getCompanyById(id);
  }

  @ApiTags("Company")
  @Post("/companyUpdate/:id")
  public async DegreeUpdate(
    @Param("id") id: number,
    @Body() companyEditDto: CompanyEditDto
    // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.companyService.companyUpdate(id, companyEditDto);
  }

  @ApiTags("logoUpload")
  @Post("/logoUpload/:id")
  public async resumeUpload(
    @Param("id") id: number,
    @Body() imageDto: ImageDto
  ) {
    return await this.companyService.logoUpload(id, imageDto);
  }
  @ApiTags("logoUpload")
  @Get("uploads/company/:filename")
  public async getProfileImage(@Param("filename") filename: any, @Res() res) {
    return res.sendFile(filename, { root: "uploads/company" });
  }
  @ApiTags("Company")
  @Post("/updatePassword")
  public async updatePassword(
    @Body() changePasswordDto: ChangePasswordDto
    // @Res() res
  ) {
    return await this.companyService.updatePassword(changePasswordDto);
  }

  @ApiTags("Company")
  @Post("/forgotPassword")
  public async forgotPassword(
    @Body() changePasswordDto: ChangePasswordDto
    // @Res() res
  ) {
    return await this.companyService.forgotPassword(changePasswordDto);
  }

  @ApiTags("Company")
  @Post("/changePassword")
  public async changePassword(
    @Body() changePasswordDto: ChangePasswordDto
    // @Res() res
  ) {
    return await this.companyService.changePassword(changePasswordDto);
  }

  @ApiTags("Create Order For Payment")
  @Post("/payment")
  public async payment(@Res() res) {
    return await this.companyService.payment(res);
  }

  @ApiTags("Get All Skill")
  @Get("/getAllSkill")
  public async getAllSkill(@Query() searchDto: SearchDto) {
    // @Body() MasterSkillDto: masterSkillDto
    return await this.companyService.getAllSkill(searchDto);
  }

  @ApiTags("Get All Role")
  @Get("/getAllRole")
  public async getAllRole(@Query() searchDto: SearchDto) {
    // @Body() MasterSkillDto: masterSkillDto
    return await this.companyService.getAllRole(searchDto);
  }

  @ApiTags("Get All Category")
  @Get("/getAllCategoryRole")
  public async getAllCategory(@Query() searchDto: SearchDto) {
    // @Body() MasterSkillDto: masterSkillDto
    return await this.companyService.getAllCategory(searchDto);
  }

  @ApiTags("Get All State")
  @Get("/getState")
  public async getState() {
    return await this.companyService.getState();
  }

  @ApiTags("Get All City")
  @Get("/getCity")
  public async getCity(@Query() stateDto: StateDto) {
    return await this.companyService.getCity(stateDto);
  }

  @ApiTags("Company")
  @Get("/getAllJobCompany")
  public async getAllCompany() {
    return await this.companyService.getAllCompany();
  }
}
