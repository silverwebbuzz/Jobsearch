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

import { MasterIndustriesService } from "src/services/master/masterIndustries.service";
import { MasterIndustries } from "src/entities/master/masterIndustries.entity";
import { MasterIndustriesDto } from "src/dto/master/masterIndustries.dto";
import { QueryOptions } from "src/dto/paginationDto";

@Controller("masterIndustries")
export class MasterIndustriesController {
  constructor(
    //User Role Service
    private masterIndustriesService: MasterIndustriesService
  ) {}

  // User Role APIs start
  @ApiTags("MasterIndustries")
  @Post("/createMasterIndustries")
  public async create(
    @Body() masterIndustriesDto: MasterIndustriesDto
  ): Promise<MasterIndustries> {
    return await this.masterIndustriesService.create(masterIndustriesDto);
  }

  @ApiTags("MasterIndustries")
  @Get("/getAllMasterIndustries")
  public async getAllMasterIndustries(@Query() paginationDto: QueryOptions) {
    return await this.masterIndustriesService.getAllMasterIndustries(
      paginationDto
    );
  }

  @ApiTags("MasterIndustries")
  @Get("/getMasterIndustriesById/:id")
  public async getMasterIndustriesById(@Param("id") id: number) {
    return await this.masterIndustriesService.getMasterIndustriesById(id);
  }

  @ApiTags("MasterIndustries")
  @Post("/masterIndustriesDeleteById/:id")
  public async masterIndustriesDelete(@Param("id") id: number) {
    return await this.masterIndustriesService.masterIndustriesDelete(id);
  }

  @ApiTags("MasterIndustries")
  @Post("/masterIndustriesUpdate/:id")
  public async DegreeUpdate(
    @Param("id") id: number,
    @Body() masterIndustriesDto: MasterIndustriesDto
  ) {
    return await this.masterIndustriesService.masterIndustriesUpdate(
      id,
      masterIndustriesDto
    );
  }
}
