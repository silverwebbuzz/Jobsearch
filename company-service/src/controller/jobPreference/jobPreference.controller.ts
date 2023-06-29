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

import { JobService } from "src/services/company-jobpreference/company-jobpreference.service";
import { JobPreferenceDto } from "src/dto/company/jobPreference.dto";
import { CompanyJobPreferenceEntity } from "src/entities/company/company-jobpreference.entity";
import { QueryOptions } from "src/dto/company/paginationDto";

// @ApiTags("User Role")
@Controller()
export class JobPreferenceController {
  constructor(
    //User Role Service
    private jobService: JobService
  ) {}
  @ApiTags("Job Post")
  // User Role APIs start
  @Post("/createJobPreference")
  public async create(
    @Body() jobPreferenceDto: JobPreferenceDto
  ): Promise<CompanyJobPreferenceEntity> {
    return await this.jobService.createJobPreference(jobPreferenceDto);
  }
  @ApiTags("Job Post")
  @Get("/getAllJobPreference")
  public async getAllAdmin(): Promise<CompanyJobPreferenceEntity> {
    return await this.jobService.getAllJobPreference();
  }
  @ApiTags("Job Post")
  @Get("/getJobPreferenceById/:id")
  public async getJobPreferenceById(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.jobService.getJobPreferenceById(id);
  }

  @ApiTags("Job Post")
  @Get("/getJobPreferenceByCompanyId/:company_id")
  public async getJobPreferenceByCompanyId(
    @Param("company_id") company_id: number, // @Body() MasterSkillDto: masterSkillDto
    @Query() paginationDto: QueryOptions
  ) {
    return await this.jobService.getJobPreferenceByCompanyId(
      company_id,
      paginationDto
    );
  }
  @ApiTags("Job Post")
  @Post("/jobPreferenceDelete/:id")
  public async jobPreferenceDelete(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.jobService.jobPreferenceDelete(id);
  }

  @ApiTags("Job Post")
  @Post("/jobPreferenceUpdate/:id")
  public async jobPreferenceUpdate(
    @Param("id") id: number,
    @Body() jobPreferenceDto: JobPreferenceDto
    // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.jobService.jobPreferenceUpdate(id, jobPreferenceDto);
  }
}
