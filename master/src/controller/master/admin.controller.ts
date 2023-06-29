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

import { MasterAdminService } from "src/services/master/master-Admin.service";
import { MasterAdmin } from "src/entities/master/masterAdmin.entity";
import { MasterAdminDto } from "src/dto/master/masterAdmin.dto";
import { LoginDto } from "src/dto/master/login.dto";
import { ChangePasswordDto } from "src/dto/changePassword.dto";

// @ApiTags("User Role")
@Controller()
export class adminController {
  constructor(
    //User Role Service
    private masterAdminService: MasterAdminService
  ) {}
  @ApiTags("Master Admin")
  // User Role APIs start
  @Post("/createMasterAdmin")
  public async create(
    @Body() masterAdminDto: MasterAdminDto
  ): Promise<MasterAdmin> {
    return await this.masterAdminService.createAdmin(masterAdminDto);
  }

  @ApiTags("Master Admin")
  @Post("/adminLogin")
  public async adminLogin(@Body() loginDto: LoginDto) {
    return await this.masterAdminService.adminLogin(loginDto);
  }
  @ApiTags("Master Admin")
  @Get("/getAllAdmin")
  public async getAllAdmin(): Promise<MasterAdmin> {
    return await this.masterAdminService.getAllAdmin();
  }
  @ApiTags("Master Admin")
  @Get("/getAdminById/:id")
  public async getAdminById(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterAdminService.getAdminById(id);
  }
  @ApiTags("Master Admin")
  @Post("/adminDeleteById/:id")
  public async AdminDelete(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterAdminService.AdminDelete(id);
  }

  @ApiTags("Master Admin")
  @Post("/adminUpdate/:id")
  public async adminUpdate(
    @Param("id") id: number,
    @Body() masterAdminDto: MasterAdminDto
    // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterAdminService.adminUpdate(id, masterAdminDto);
  }

  @ApiTags("Master Admin")
  @Post("/updatePassword")
  public async updatePassword(
    @Body() changePasswordDto: ChangePasswordDto
    // @Res() res
  ) {
    return await this.masterAdminService.changePassword(changePasswordDto);
  }

  @ApiTags("Master Admin")
  @Post("/forgotPassword")
  public async forgotPassword(
    @Body() changePasswordDto: ChangePasswordDto
    // @Res() res
  ) {
    return await this.masterAdminService.forgotPassword(changePasswordDto);
  }

  @ApiTags("Master Admin")
  @Post("/changePassword")
  public async changePassword(
    @Body() changePasswordDto: ChangePasswordDto
    // @Res() res
  ) {
    return await this.masterAdminService.changePassword(changePasswordDto);
  }
}
