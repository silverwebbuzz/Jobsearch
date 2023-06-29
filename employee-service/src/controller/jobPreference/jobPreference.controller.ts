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
import { QueryOptions } from "src/dto/paginationDto";
import { JobApplyDto } from "src/dto/employee/jobApply.dto";
import { TrackingDto } from "src/dto/tracking.dto";

// @ApiTags("User Role")
@Controller()
export class JobPreferenceController {
  constructor(
    //User Role Service
    private jobService: JobService
  ) {}

  // User Role APIs start
  @ApiTags("Job Post")
  @Get("/getAllJobPreference")
  public async getAllAdmin(
    @Query() paginationDto: QueryOptions
  ): Promise<CompanyJobPreferenceEntity> {
    return await this.jobService.getAllJobPreference(paginationDto);
  }

  @ApiTags("Job Post")
  @Post("/createJobApply")
  public async createJobApply(
    @Body() jobApplyDto: JobApplyDto
  ): Promise<JobService> {
    return await this.jobService.createJobApply(jobApplyDto);
  }

  @ApiTags("Job Post")
  @Get("/getAllJobApply/:employeeId")
  public async getAllJobApply(
    @Param("employeeId") employeeId: number,
    @Param() trackingDto: TrackingDto // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.jobService.getAllJobApply(employeeId, trackingDto);
  }
}
