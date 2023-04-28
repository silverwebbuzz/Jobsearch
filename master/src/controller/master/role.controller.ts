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

import { MasterRoleService } from "src/services/master/master-Role.service";
import { MasterRole } from "src/entities/masterRole.entity";
import { MasterRoleDto } from "src/dto/masterRole.dto";

// @ApiTags("User Role")
@Controller()
export class roleController {
  constructor(
    //User Role Service
    private masterRoleService: MasterRoleService
  ) {}
  @ApiTags("Master Role")
  // User Role APIs start
  @Post("/createMasterRole")
  public async create(
    @Body() masterRoleDto: MasterRoleDto
  ): Promise<MasterRole> {
    return await this.masterRoleService.create(masterRoleDto);
  }
  @ApiTags("Master Role")
  @Get("/getAllRole")
  public async getAllRole(): Promise<MasterRole> {
    return await this.masterRoleService.getAllRole();
  }
  @ApiTags("Master Role")
  @Get("/getRoleById/:id")
  public async getRoleById(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterRoleService.getRoleById(id);
  }
  @ApiTags("Master Role")
  @Post("/DeleteById/:id")
  public async RoleDelete(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterRoleService.RoleDelete(id);
  }
  @ApiTags("Master Role")
  @Post("/roleUpdate/:id")
  public async RoleUpdate(
    @Param("id") id: number,
    @Body() masterRoleDto: MasterRoleDto
    // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterRoleService.RoleUpdate(id, masterRoleDto);
  }
}
