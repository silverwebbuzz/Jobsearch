import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobPreferenceDto } from "src/dto/company/jobPreference.dto";
import { QueryOptions } from "src/dto/company/paginationDto";
import { CompanyJobPreferenceEntity } from "src/entities/company/company-jobpreference.entity";
import { JobApplyEntity } from "src/entities/company/jobApply.entity";
import { Repository } from "typeorm";

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(CompanyJobPreferenceEntity)
    private jobPreferenceRepository: Repository<CompanyJobPreferenceEntity>
  ) {}

  public async createJobPreference(jobPreferenceDto: JobPreferenceDto) {
    try {
      if (jobPreferenceDto.company_id) {
        const newJob = this.jobPreferenceRepository.create(jobPreferenceDto);
        // console.log(newJob);

        if (newJob) {
          await this.jobPreferenceRepository.save(newJob);
          if (jobPreferenceDto.postStatus === true) {
            return {
              data: newJob,
              message: "Create JobPreference Successfully",
            };
          } else {
            return {
              data: newJob,
              message: "In Progress",
            };
          }
        } else {
          return { data: [], message: "fail" };
        }
      } else {
        return { data: [], message: "Company Id require" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getAllJobPreference() {
    try {
      const newDegree = this.jobPreferenceRepository
        .createQueryBuilder("companyJobPreference")
        .orderBy("companyJobPreference.id", "ASC");
      if (newDegree) {
        return {
          data: await newDegree.getMany(),
          message: "Get All JobPreference",
        };
      } else {
        return { data: [], message: "JobPreference Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getJobPreferenceById(id: number) {
    try {
      const newAdmin = await this.jobPreferenceRepository.findOne({
        where: [{ id: id }],
      });

      if (newAdmin) {
        return { data: newAdmin, message: "Get Single jobPreference" };
      } else {
        return { message: "jobPreference Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getJobPreferenceByCompanyId(
    company_id,
    queryOptions: QueryOptions
  ) {
    try {
      let status = queryOptions.status || "";
      let sortBy = queryOptions.sortBy || "";

      const employee = await this.jobPreferenceRepository
        .createQueryBuilder("companyJobPreference")
        .where("companyJobPreference.company_id=:company_id", {
          company_id: company_id,
        });

      // console.log(employee);

      if ((await employee.getMany()).length > 0) {
        if (sortBy === "Creation Date (descending)") {
          employee.orderBy("companyJobPreference.createdAt", "DESC");
        }
        if (sortBy === "Creation Date (ascending)") {
          employee.orderBy("companyJobPreference.createdAt", "ASC");
        }
        if (sortBy === "Name ( A - Z )") {
          employee.orderBy("companyJobPreference.jobRole", "ASC");
        }
        if (sortBy === "Name ( A - Z )") {
          employee.orderBy("companyJobPreference.jobRole", "DESC");
        } else if (status) {
          employee.where("companyJobPreference.jobPostStatus ILIKE :q", {
            q: `%${status}%`,
          });
        }

        return {
          data: await employee.getMany(),
          message: "Get Single jobPreference",
        };
      } else {
        return { data: [], message: "jobPreference Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async jobPreferenceDelete(id: number) {
    try {
      const admin = await this.jobPreferenceRepository.findOne({
        where: [{ id: id }],
      });
      if (admin) {
        admin["isActive"] = false;
        // return { data: updatePreference, message: "Update Job-Preference" };
        await this.jobPreferenceRepository.save(admin);
        if (admin) {
          const admin = await this.jobPreferenceRepository.findOne({
            where: [{ id: id }],
          });
          return { data: admin, message: "Delete jobPreference" };
        } else {
          return { data: [], message: "jobPreference Not Delete" };
        }
      } else {
        return { data: [], message: "jobPreference Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async jobPreferenceUpdate(
    id: number,
    jobPreferenceDto: JobPreferenceDto
  ) {
    try {
      const admin = await this.jobPreferenceRepository.findOne({
        where: [{ id: id }],
      });

      if (admin) {
        const updatePreference = await this.jobPreferenceRepository.update(
          id,
          jobPreferenceDto
        );
        // return { data: updatePreference, message: "Update Job-Preference" };

        if (updatePreference) {
          const newPreference = await this.jobPreferenceRepository.findOne({
            where: [{ id: id }],
          });
          if (jobPreferenceDto.postStatus === true) {
            return { data: newPreference, message: "Update Job-Preference" };
          } else {
            return { data: newPreference, message: "In Progress" };
          }
        } else {
          return { data: [], message: "Job-Preference Not Update" };
        }
      } else {
        return { data: [], message: "Job-Preference Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
