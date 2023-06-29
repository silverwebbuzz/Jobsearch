import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeDto } from "src/dto/employee/employee.dto";
import { QueryOptions } from "src/dto/paginationDto";
import { EmployeeEntity } from "src/entities/employee/employee.entity";
import { Repository } from "typeorm";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>
  ) {}

  public async getAllEmployee(queryOptions: QueryOptions) {
    try {
      let page: number = queryOptions.page || 1;
      let limit: number = queryOptions.limit || 20;
      let keyword: string = queryOptions.search || "";
      const newEmployee = await this.employeeRepository
        .createQueryBuilder("employee")
        // .orderBy("employee.createdAt", "DESC")
        .orWhere("employee.firstName ILIKE :q", { q: `%${keyword}%` })
        .orWhere("employee.lastName ILIKE :q", { q: `%${keyword}%` })
        .orWhere("employee.employeeEmail ILIKE :q", { q: `%${keyword}%` });
      let total = await newEmployee.getCount();
      newEmployee.offset((page - 1) * limit).limit(limit);
      if (newEmployee) {
        return {
          data: await newEmployee.getMany(),
          total,
          message: "Get All Employee",
        };
      } else {
        return { data: [], message: "Employee Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getEmployeeById(id: number) {
    try {
      const newEmployee = await this.employeeRepository.findOne({
        where: [{ id: id }],
      });
      if (newEmployee) {
        return { data: newEmployee, message: "Get Single Employee" };
      } else {
        return { data: [], message: "Employee Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async employeeUpdate(id: number, employeeDto: EmployeeDto) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: [{ id: id }],
      });
      if (employee) {
        const updateEmployee = await this.employeeRepository.update(
          id,
          employeeDto
        );

        if (updateEmployee) {
          const newEmployee = await this.employeeRepository.findOne({
            where: [{ id: id }],
          });
          return { data: newEmployee, message: "Update Employee" };
        } else {
          return { data: [], message: "Employee Not Update" };
        }
      } else {
        return { data: [], message: "Employee Not Exists" };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async employeeDelete(id: number) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: [{ id: id }],
      });
      if (employee) {
        const newEmployee = await this.employeeRepository.delete(id);
        if (newEmployee) {
          return { data: [], message: "Delete Employee" };
        } else {
          return { data: [], message: "Employee Not Delete" };
        }
      } else {
        return { data: [], message: "Employee Not Exists" };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
