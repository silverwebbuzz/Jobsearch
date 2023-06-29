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

import { EmployeeService } from "src/services/employee/employee.service";
import { EmployeeEntity } from "src/entities/employee/employee.entity";
import { EmployeeDto } from "src/dto/employee/employee.dto";
import { QueryOptions } from "src/dto/paginationDto";

@Controller("Employee")
export class EmployeeController {
  constructor(
    //User Role Service
    private employeeService: EmployeeService
  ) {}

  // User Role APIs start

  @ApiTags("Employee")
  @Get("/getAllJobEmployee")
  public async getAllEmployee(@Query() paginationDto: QueryOptions) {
    return await this.employeeService.getAllEmployee(paginationDto);
  }

  @ApiTags("Employee")
  @Get("/getEmployeeById/:id")
  public async getAdminById(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.employeeService.getEmployeeById(id);
  }

  @ApiTags("Employee")
  @Post("/employeeUpdate/:id")
  public async DegreeUpdate(
    @Param("id") id: number,
    @Body() employeeDto: EmployeeDto
    // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.employeeService.employeeUpdate(id, employeeDto);
  }

  @ApiTags("Employee")
  @Post("/employeeDelete/:id")
  public async jobEmployeeDelete(
    @Param("id") id: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.employeeService.employeeDelete(id);
  }

  @ApiTags("Get All Employee Responeses")
  @Get("/getAllEmployeeResponeses/:companyId")
  public async getAllEmployeeResponeses(
    @Param("companyId") companyId: number // @Body() MasterSkillDto: masterSkillDto
  ) {
    return await this.employeeService.getAllEmployeeResponeses(companyId);
  }
}
