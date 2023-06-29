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

import { MasterDegreeService } from "src/services/master/master-Degree.service";
import { MasterDegree } from "src/entities/master/masterDegree.entity";
import { MasterDegreeDto } from "src/dto/master/masterDegree.dto";
import { QueryOptions } from "src/dto/paginationDto";

// @ApiTags("User Role")
@Controller()
export class degreeController {
  constructor(
    //User Role Service
    private masterDegreeService: MasterDegreeService
  ) {}
  @ApiTags("Master Degree")
  // User Role APIs start
  @Post("/createMasterDegree")
  public async create(
    @Body() masterDegreeDto: MasterDegreeDto
  ): Promise<MasterDegree> {
    return await this.masterDegreeService.create(masterDegreeDto);
  }
  @ApiTags("Master Degree")
  @Get("/getAllDegree")
  public async getAllDegree(
    @Query() paginationDto: QueryOptions
  ): Promise<MasterDegree> {
    return await this.masterDegreeService.getAllDegree(paginationDto);
  }
  @ApiTags("Master Degree")
  @Get("/getDegreeById/:id")
  public async getDegreeById(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterDegreeService.getDegreeById(id);
  }
  @ApiTags("Master Degree")
  @Post("/degreeDeleteById/:id")
  public async DegreeDelete(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterDegreeService.DegreeDelete(id);
  }

  @ApiTags("Master Degree")
  @Post("/degreeUpdate/:id")
  public async DegreeUpdate(
    @Param("id") id: number,
    @Body() masterDegreeDto: MasterDegreeDto
    // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterDegreeService.DegreeUpdate(id, masterDegreeDto);
  }
}
