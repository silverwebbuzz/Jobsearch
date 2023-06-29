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
import { CompanyService } from "src/services/company/create-company/create-company.service";
import { CompanyEntity } from "src/entities/company/company.entity";
import { CompanyDto } from "src/dto/company/company.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CompanyEditDto } from "src/dto/company/companyEdit.dto";
import { QueryOptions } from "src/dto/paginationDto";
import { StateDto } from "src/dto/state.dto";

// @ApiTags("User Role")
@Controller()
export class CompanyController {
  constructor(
    //User Role Service
    private companyService: CompanyService
  ) {}

  // User Role APIs start

  @ApiTags("Company")
  @Get("/getAllJobCompany")
  public async getAllCompany(@Query() paginationDto: QueryOptions) {
    return await this.companyService.getAllCompany(paginationDto);
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
  public async companyUpdate(
    @Param("id") id: number,
    @Body() companyEditDto: CompanyEditDto
    // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.companyService.companyUpdate(id, companyEditDto);
  }

  @ApiTags("Company")
  @Post("/companyDelete/:id")
  public async jobCompanyDelete(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.companyService.companyDelete(id);
  }

  // @ApiTags("Get All Skill")
  // @Get("/getAllSkill")
  // public async getAllSkill(@Query() paginationDto: QueryOptions) {
  //   // @Body() MasterSkillDto: masterSkillDto
  //   return await this.companyService.getAllSkill(paginationDto);
  // }

  // @ApiTags("Get All Role")
  // @Get("/getAllRole")
  // public async getAllRole(@Query() paginationDto: QueryOptions) {
  //   // @Body() MasterSkillDto: masterSkillDto
  //   return await this.companyService.getAllRole(paginationDto);
  // }
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
}
