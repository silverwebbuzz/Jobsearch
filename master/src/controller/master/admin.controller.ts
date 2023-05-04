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
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

import { MasterAdminService } from 'src/services/master/master-Admin.service';
import { MasterAdmin } from 'src/entities/masterAdmin.entity';
import { MasterAdminDto } from 'src/dto/masterAdmin.dto';

// @ApiTags("User Role")
@Controller()
export class adminController {
  constructor(
    //User Role Service
    private masterAdminService: MasterAdminService,
  ) {}
  @ApiTags('Master Admin')
  // User Role APIs start
  @Post('/createMasterAdmin')
  public async create(
    @Body() masterAdminDto: MasterAdminDto,
  ): Promise<MasterAdmin> {
    return await this.masterAdminService.createAdmin(masterAdminDto);
  }
  @ApiTags('Master Admin')
  @Get('/getAllAdmin')
  public async getAllAdmin(): Promise<MasterAdmin> {
    return await this.masterAdminService.getAllAdmin();
  }
  @ApiTags('Master Admin')
  @Get('/getDegreeById/:id')
  public async getAdminById(
    @Param('id') id: number, // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterAdminService.getAdminById(id);
  }
  @ApiTags('Master Admin')
  @Post('/DeleteById/:id')
  public async AdminDelete(
    @Param('id') id: number, // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterAdminService.AdminDelete(id);
  }

  @ApiTags('Master Admin')
  @Post('/adminUpdate/:id')
  public async adminUpdate(
    @Param('id') id: number,
    @Body() masterAdminDto: MasterAdminDto,
    // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.masterAdminService.adminUpdate(id, masterAdminDto);
  }
}
