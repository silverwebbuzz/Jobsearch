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

import { masterSkillService } from "src/services/master/master-Skill.service";
import { masterSkill } from "src/entities/master/masterSkill.entity";
import { MasterSkillDto } from "src/dto/master/masterSkill.dto";
import { QueryOptions } from "src/dto/paginationDto";

// @ApiTags("User Role")
@Controller()
export class skillController {
  constructor(
    //User Role Service
    private MasterSkillService: masterSkillService
  ) {}

  // User Role APIs start
  @ApiTags("Master Skill")
  @Post("/createMasterSkill")
  public async create(
    @Body() masterSkillDto: MasterSkillDto
  ): Promise<masterSkill> {
    return await this.MasterSkillService.create(masterSkillDto);
  }

  @ApiTags("Master Skill")
  @Get("/getAllSkill")
  public async getAllSkill() {
    // @Body() MasterSkillDto: masterSkillDto
    return await this.MasterSkillService.getAllSkill();
  }

  @ApiTags("Master Skill")
  @Get("/getSkillById/:id")
  public async getSkillById(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.MasterSkillService.getSkillById(id);
  }

  @ApiTags("Master Skill")
  @Post("/skillDeleteById/:id")
  public async skillDelete(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.MasterSkillService.skillDelete(id);
  }

  @ApiTags("Master Skill")
  @Post("/skillUpdate/:id")
  public async DegreeUpdate(
    @Param("id") id: number,
    @Body() masterSkillDto: MasterSkillDto
    // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.MasterSkillService.skillUpdate(id, masterSkillDto);
  }

  @ApiTags("Create Order For Payment")
  @Post("/payment")
  public async payment(@Res() res) {
    return await this.MasterSkillService.payment(res);
  }
}
