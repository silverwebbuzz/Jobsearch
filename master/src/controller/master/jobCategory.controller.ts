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

import { JobCategory } from "src/entities/master/jobCategory.entity";
import { JobCategoryDto } from "src/dto/master/jobCategory.dto";
import { QueryOptions } from "src/dto/paginationDto";
import { CategoryService } from "src/services/master/jobCategory.service";

// @ApiTags("User Role")
@Controller("JobCategory")
export class CategoryController {
  constructor(
    //User Role Service
    private categoryService: CategoryService
  ) {}

  // User Role APIs start
  @ApiTags("JobCategory")
  @Post("/createCategory")
  public async create(
    @Body() jobCategoryDto: JobCategoryDto
  ): Promise<JobCategory> {
    return await this.categoryService.create(jobCategoryDto);
  }

  @ApiTags("JobCategory")
  @Get("/getAllCategory")
  public async getAllCategory(@Query() paginationDto: QueryOptions) {
    return await this.categoryService.getAllCategory(paginationDto);
  }

  @ApiTags("JobCategory")
  @Get("/getCategoryById/:id")
  public async getCategoryById(@Param("id") id: number) {
    return await this.categoryService.getCategoryById(id);
  }

  @ApiTags("JobCategory")
  @Post("/categoryDeleteById/:id")
  public async categoryDelete(@Param("id") id: number) {
    return await this.categoryService.categoryDelete(id);
  }

  @ApiTags("JobCategory")
  @Post("/categoryUpdate/:id")
  public async categoryUpdate(
    @Param("id") id: number,
    @Body() jobCategoryDto: JobCategoryDto
  ) {
    return await this.categoryService.categoryUpdate(id, jobCategoryDto);
  }
}
