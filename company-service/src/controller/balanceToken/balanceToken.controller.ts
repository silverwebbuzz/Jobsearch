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

import { BalanceTokenService } from "src/services/balanceToken/balanceToken.service";
import { BalanceTokenEntity } from "src/entities/balanceToken.entity";
import { BalanceTokenDto } from "src/dto/balanceToken.dto";

// @ApiTags("User Role")
@Controller()
export class BalanceTokenController {
  constructor(
    //User Role Service
    private balanceTokenService: BalanceTokenService
  ) {}
  @ApiTags("Balance Token")
  // User Role APIs start
  @Post("/createBalanceToken")
  public async createBalanceToken(
    @Body() balanceTokenDto: BalanceTokenDto
  ): Promise<BalanceTokenEntity> {
    return await this.balanceTokenService.createBalanceToken(balanceTokenDto);
  }
  @ApiTags("Balance Token")
  @Get("/getAllBalanceToken")
  public async getAllBalanceToken(): Promise<BalanceTokenEntity> {
    return await this.balanceTokenService.getAllBalanceToken();
  }
  @ApiTags("Balance Token")
  @Get("/getBalanceTokenById/:id")
  public async getBalanceTokenById(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.balanceTokenService.getBalanceTokenById(id);
  }

  @ApiTags("Balance Token")
  @Get("/getBalanceTokenByCompanyId/:company_id")
  public async getBalanceTokenByCompanyId(
    @Param("company_id") company_id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.balanceTokenService.getBalanceTokenByCompanyId(
      company_id
    );
  }
  @ApiTags("Balance Token")
  @Post("/balanceTokenDelete/:id")
  public async balanceTokenDelete(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.balanceTokenService.balanceTokenDelete(id);
  }

  @ApiTags("Balance Token")
  @Post("/balanceTokenUpdate/:id")
  public async balanceTokenUpdate(
    @Param("id") id: number,
    @Body() balanceTokenDto: BalanceTokenDto
    // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.balanceTokenService.balanceTokenUpdate(
      id,
      balanceTokenDto
    );
  }
}
