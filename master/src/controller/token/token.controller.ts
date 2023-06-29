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

import { TokenService } from "src/services/token/token.service";
import { Token } from "src/entities/token/token.entity";
import { TokenDto } from "src/dto/token/token.dto";
import { QueryOptions } from "src/dto/paginationDto";

// @ApiTags("User Role")
@Controller("token")
export class TokenController {
  constructor(
    //User Role Service
    private tokenService: TokenService
  ) {}

  // User Role APIs start
  @ApiTags("Token")
  @Post("/createToken")
  public async create(@Body() tokenDto: TokenDto): Promise<Token> {
    return await this.tokenService.create(tokenDto);
  }

  @ApiTags("Token")
  @Get("/getAllToken")
  public async getAllToken(@Query() paginationDto: QueryOptions) {
    return await this.tokenService.getAllToken(paginationDto);
  }

  @ApiTags("Token")
  @Get("/getTokenById/:id")
  public async getTokenById(@Param("id") id: number) {
    return await this.tokenService.getTokenById(id);
  }

  @ApiTags("Token")
  @Post("/tokenDeleteById/:id")
  public async tokenDelete(@Param("id") id: number) {
    return await this.tokenService.tokenDelete(id);
  }

  @ApiTags("Token")
  @Post("/tokenUpdate/:id")
  public async DegreeUpdate(
    @Param("id") id: number,
    @Body() tokenDto: TokenDto
  ) {
    return await this.tokenService.tokenUpdate(id, tokenDto);
  }
}
