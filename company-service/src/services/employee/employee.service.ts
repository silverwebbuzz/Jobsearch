import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeDto } from "src/dto/employee/employee.dto";
import { QueryOptions } from "src/dto/paginationDto";
import { JobApplyEntity } from "src/entities/company/jobApply.entity";
import { EmployeeEntity } from "src/entities/employee/employee.entity";
import { Repository, In } from "typeorm";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
    @InjectRepository(JobApplyEntity)
    private JobApplyRepository: Repository<JobApplyEntity>
  ) {}

  public async getAllEmployee(queryOptions: QueryOptions) {
    try {
      // let keyword = queryOptions.search || "";
      // let Location = queryOptions.workLocation || "";
      // let typeOfJob = queryOptions.typeOfJob || "";
      // let experiance = queryOptions.experiance || "";
      // let minSalary = queryOptions.minSalary || "";
      // let maxSalary = queryOptions.maxSalary || "";
      // let companyCity = queryOptions.companyCity || "";
      let keyword = queryOptions.search || "";
      let workLocation = queryOptions.workLocation || "";
      let experianceLevel = queryOptions.experianceLevel || "";
      let minSalary = queryOptions.minSalary || "";
      let maxSalary = queryOptions.maxSalary || "";
      let minAge = queryOptions.minAge || "";
      let maxAge = queryOptions.maxAge || "";
      let gender = queryOptions.gender || "";
      let resume = queryOptions.resume || "";
      // let englishRequirement = queryOptions.englishRequirement || "";

      let basicEnglish = queryOptions.basicEnglish || "";
      let conversationalEnglish = queryOptions.conversationalEnglish || "";
      let businessEnglish = queryOptions.businessEnglish || "";
      let technicalEnglish = queryOptions.technicalEnglish || "";
      let fluentEnglish = queryOptions.fluentEnglish || "";
      let entryLevel = queryOptions.entryLevel || "";
      let intermediate = queryOptions.intermediate || "";
      let expert = queryOptions.expert || "";

      // let educationQualification = queryOptions.educationQualification || "";

      let graduate = queryOptions.graduate || "";
      let postGraduate = queryOptions.postGraduate || "";
      let diploma = queryOptions.diploma || "";
      let anyGraduate = queryOptions.anyGraduate || "";
      let anyPostGraduate = queryOptions.anyPostGraduate || "";

      let candidateActive = queryOptions.candidateActive || "";
      let locationDistance = queryOptions.locationDistance || "";

      let onSite = queryOptions.onSite || "";
      let hybrid = queryOptions.hybrid || "";
      let remote = queryOptions.remote || "";
      let freelance = queryOptions.freelance || "";
      const employee = this.employeeRepository.createQueryBuilder("Employee");

      if (keyword) {
        employee
          .orderBy("Employee.createdAt", "ASC")
          .where("Employee.firstName ILIKE :q", {
            q: `%${keyword}%`,
          })
          .orWhere("Employee.lastName ILIKE :q", {
            q: `%${keyword}%`,
          })
          .orWhere("Employee.employeeEmail ILIKE :q", {
            q: `%${keyword}%`,
          })
          .orWhere("Employee.employeePhone ILIKE :q", {
            q: `%${keyword}%`,
          });
      }
      if (workLocation) {
        employee
          .orderBy("Employee.createdAt", "ASC")
          .orWhere("Employee.location ILIKE :q", {
            q: `%${workLocation}%`,
          });
      }
      if (experianceLevel) {
        employee
          // .orderBy("Employee.createdAt", "ASC")
          .orWhere("Employee.workExperience ILIKE :q", {
            q: `%${experianceLevel}%`,
          });
      }
      if (gender) {
        employee
          // .orderBy("Employee.createdAt", "ASC")
          .orWhere("Employee.gender ILIKE :q", {
            q: `%${gender}%`,
          });
      }
      if (minSalary) {
        employee
          // .orderBy("Employee.createdAt", "ASC")
          .orWhere("Employee.minSalary ILIKE :q", {
            q: `%${minSalary}%`,
          });
      }
      if (maxSalary) {
        employee.orWhere("Employee.maxSalary ILIKE :q", {
          q: `%${maxSalary}%`,
        });
      }

      if (graduate) {
        employee.orWhere("Employee.educationalDetails ILIKE :q", {
          q: `%${graduate}%`,
        });
      }

      if (postGraduate) {
        employee.orWhere("Employee.educationalDetails ILIKE :q", {
          q: `%${postGraduate}%`,
        });
      }

      if (diploma) {
        employee.orWhere("Employee.educationalDetails ILIKE :q", {
          q: `%${diploma}%`,
        });
      }

      if (anyGraduate) {
        employee.orWhere("Employee.educationalDetails ILIKE :q", {
          q: `%${anyGraduate}%`,
        });
      }

      if (anyPostGraduate) {
        employee.orWhere("Employee.educationalDetails ILIKE :q", {
          q: `%${anyPostGraduate}%`,
        });
      }

      if (onSite) {
        employee.orWhere("Employee.preferredLocation ILIKE :q", {
          q: `%${onSite}%`,
        });
      }

      if (hybrid) {
        employee.orWhere("Employee.preferredLocation ILIKE :q", {
          q: `%${hybrid}%`,
        });
      }

      if (remote) {
        employee.orWhere("Employee.preferredLocation ILIKE :q", {
          q: `%${remote}%`,
        });
      }

      if (freelance) {
        employee.orWhere("Employee.preferredLocation ILIKE :q", {
          q: `%${freelance}%`,
        });
      }

      return {
        data: await employee.getMany(),
        message: "Get All JobPreference",
        status: 200,
      };
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
        return {
          data: newEmployee,
          message: "Get Single Employee",
          status: 200,
        };
      } else {
        return { data: [], message: "Employee Not Get", status: 400 };
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
          return { data: newEmployee, message: "Update Employee", status: 200 };
        } else {
          return { data: [], message: "Employee Not Update", status: 400 };
        }
      } else {
        return { data: [], message: "Employee Not Exists", status: 401 };
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
          return { data: [], message: "Delete Employee", status: 200 };
        } else {
          return { data: [], message: "Employee Not Delete", status: 400 };
        }
      } else {
        return { data: [], message: "Employee Not Exists", status: 401 };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllEmployeeResponeses(companyId) {
    try {
      // let keyword = queryOptions.search || "";

      const getAllEmployee = await this.JobApplyRepository.find({
        where: [{ companyId: companyId }],
      });

      const data = getAllEmployee.map((i) => i.employeeId);

      console.log(data, "000");

      const roleData = await this.employeeRepository.find({
        where: { id: In(data) },
      });
      // var newObj = roleData.reduce((roleData) => Object.assign(roleData), {});
      // const newObj = Object.assign({}, [roleData]);
      // const dta = array_remove(roleData);
      // console.log(dta, "-----------");

      // const dataa = {...[roleData]};

      // const dta = { ...dataa };
      // if (candidateStatus) {
      //   roleData.orWhere("companyJobPreference.location ILIKE :q", {
      //     q: `%${Location}%`,
      //   });
      // }

      // if (locationDistance) {
      //   roleData
      //     // .orderBy("companyJobPreference.createdAt", "ASC")
      //     .orWhere("companyJobPreference.companyCity ILIKE :q", {
      //       q: `%${companyCity}%`,
      //     });
      // }
      // if (missedCall) {
      //   roleData
      //     // .orderBy("companyJobPreference.createdAt", "ASC")
      //     .orWhere("companyJobPreference.typeOfJob ILIKE :q", {
      //       q: `%${typeOfJob}%`,
      //     });
      // }

      if (roleData) {
        return { data: roleData, message: "Get All Job", status: 200 };
      } else {
        return { message: "JOb Not Get", status: 400 };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
