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
import { masterSkill } from "src/entities/masterSkill.entity";
import { MasterSkillDto } from "src/dto/masterSkill.dto";

// @ApiTags("User Role")
@Controller()
export class skillController {
  constructor(
    //User Role Service
    private MasterSkillService: masterSkillService
  ) {}

  // User Role APIs start
  @Post("/createMasterSkill")
  public async create(
    @Body() masterSkillDto: MasterSkillDto
  ): Promise<masterSkill> {
    return await this.MasterSkillService.create(masterSkillDto);
  }

  @Get("/getAllSkill")
  public async getAllSkill() {
    // @Body() MasterSkillDto: masterSkillDto
    return await this.MasterSkillService.getAllSkill();
  }

  @Get("/getSkillById/:id")
  public async getSkillById(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.MasterSkillService.getSkillById(id);
  }

  @Post("/skillDeleteById/:id")
  public async skillDelete(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.MasterSkillService.skillDelete(id);
  }

  @Post("/skillUpdate/:id")
  public async DegreeUpdate(
    @Param("id") id: number,
    @Body() masterSkillDto: MasterSkillDto
    // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.MasterSkillService.skillUpdate(id, masterSkillDto);
  }

  @Post("/payment")
  public async payment(@Res() res) {
    return await this.MasterSkillService.payment(res);
  }
}
