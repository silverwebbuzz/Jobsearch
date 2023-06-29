import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobPreferenceDto } from "src/dto/company/jobPreference.dto";
import { QueryOptions } from "src/dto/paginationDto";
import { CompanyJobPreferenceEntity } from "src/entities/company/company-jobpreference.entity";
import { Repository, In } from "typeorm";
import { JobApplyEntity } from "src/entities/employee/jobApply.entity";
import { JobApplyDto } from "src/dto/employee/jobApply.dto";
import { CompanyEntity } from "src/entities/company/company.entity";
import { TrackingDto } from "src/dto/tracking.dto";

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(CompanyJobPreferenceEntity)
    private jobPreferenceRepository: Repository<CompanyJobPreferenceEntity>,
    @InjectRepository(JobApplyEntity)
    private JobApplyRepository: Repository<JobApplyEntity>,
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>
  ) {}

  public async getAllJobPreference(queryOptions: QueryOptions) {
    try {
      let keyword = queryOptions.search || "";
      let Location = queryOptions.workLocation || "";

      let fullTime = queryOptions.fullTime || "";
      let Internship = queryOptions.Internship || "";
      let Freelance = queryOptions.Freelance || "";
      let Volunteer = queryOptions.Volunteer || "";
      let onSite = queryOptions.onSite || "";
      let Hybrid = queryOptions.Hybrid || "";
      let Remote = queryOptions.Remote || "";
      let entryLevel = queryOptions.entryLevel || "";
      let Intermediate = queryOptions.Intermediate || "";
      let Expert = queryOptions.Expert || "";
      // let typeOfJob = queryOptions.typeOfJob || "";
      // let experiance = queryOptions.experiance || "";
      let minSalary = queryOptions.minSalary || "";
      let maxSalary = queryOptions.maxSalary || "";
      let companyCity = queryOptions.companyCity || "";

      const newDegree = this.jobPreferenceRepository.createQueryBuilder(
        "companyJobPreference"
      );

      // return {
      //   data: await newDegree.getMany(),
      //   message: "Get All JobPreference",
      // };
      if (keyword) {
        newDegree
          .orderBy("companyJobPreference.createdAt", "ASC")
          .where("companyJobPreference.companyName ILIKE :q", {
            q: `%${keyword}%`,
          })
          .orWhere("companyJobPreference.jobRole ILIKE :q", {
            q: `%${keyword}%`,
          })
          .orWhere("companyJobPreference.stateCompany ILIKE :q", {
            q: `%${keyword}%`,
          })
          .orWhere("companyJobPreference.companyCity ILIKE :q", {
            q: `%${keyword}%`,
          })
          .orWhere("companyJobPreference.skillPreferance ILIKE :q", {
            q: `%${keyword}%`,
          });
      }
      if (Location) {
        newDegree
          .orderBy("companyJobPreference.createdAt", "ASC")
          .orWhere("companyJobPreference.location ILIKE :q", {
            q: `%${Location}%`,
          });
      }

      if (companyCity) {
        newDegree
          // .orderBy("companyJobPreference.createdAt", "ASC")
          .orWhere("companyJobPreference.companyCity ILIKE :q", {
            q: `%${companyCity}%`,
          });
      }
      if (fullTime) {
        newDegree
          // .orderBy("companyJobPreference.createdAt", "ASC")
          .orWhere("companyJobPreference.typeOfJob ILIKE :q", {
            q: `%${fullTime}%`,
          });
      } else if (Internship) {
        newDegree
          // .orderBy("companyJobPreference.createdAt", "ASC")
          .orWhere("companyJobPreference.typeOfJob ILIKE :q", {
            q: `%${Internship}%`,
          });
      } else if (Freelance) {
        newDegree
          // .orderBy("companyJobPreference.createdAt", "ASC")
          .orWhere("companyJobPreference.typeOfJob ILIKE :q", {
            q: `%${Freelance}%`,
          });
      } else if (Volunteer) {
        newDegree
          // .orderBy("companyJobPreference.createdAt", "ASC")
          .orWhere("companyJobPreference.typeOfJob ILIKE :q", {
            q: `%${Volunteer}%`,
          });
      }
      if (entryLevel) {
        newDegree
          // .orderBy("companyJobPreference.createdAt", "ASC")
          .orWhere("companyJobPreference.experianceRequired ILIKE :q", {
            q: `%${entryLevel}%`,
          });
      }
      if (Intermediate) {
        newDegree
          // .orderBy("companyJobPreference.createdAt", "ASC")
          .orWhere("companyJobPreference.experianceRequired ILIKE :q", {
            q: `%${Intermediate}%`,
          });
      }
      if (Expert) {
        newDegree
          // .orderBy("companyJobPreference.createdAt", "ASC")
          .orWhere("companyJobPreference.experianceRequired ILIKE :q", {
            q: `%${Expert}%`,
          });
      }
      if (minSalary) {
        newDegree
          // .orderBy("companyJobPreference.createdAt", "ASC")
          .orWhere("companyJobPreference.minSalary ILIKE :q", {
            q: `%${minSalary}%`,
          });
      }
      if (maxSalary) {
        newDegree.orWhere("companyJobPreference.maxSalary ILIKE :q", {
          q: `%${maxSalary}%`,
        });
      }
      if ((await newDegree.getMany()).length > 0) {
        return {
          data: await newDegree.getMany(),
          message: "Get All JobPreference",
          status: 200,
        };
      } else {
        return {
          data: [],
          message: "JobPreference Not Get",
          status: 400,
        };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  public async createJobApply(jobApplyDto: JobApplyDto) {
    try {
      const newJob = this.JobApplyRepository.create(jobApplyDto);

      if (newJob) {
        await this.JobApplyRepository.save(newJob);
        return {
          data: newJob,
          message: "JobApply Successfully",
          status: 200,
        };
      } else {
        return { data: [], message: "fail", status: 400 };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getAllJobApply(employeeId, trackingDto: TrackingDto) {
    try {
      // let keyword = queryOptions.search || "";
      let candidateStatus = trackingDto.candidateStatus || "";
      let locationDistance = trackingDto.locationDistance || "";
      let missedCall = trackingDto.missedCall || "";
      const getAllJob = await this.JobApplyRepository.find({
        where: [{ employeeId: employeeId }],
      });
      const data = getAllJob.map((i) => i.jobPostId);
      const roleData = await this.jobPreferenceRepository.find({
        where: { id: In(data) },
      });

      // const data = getAllJob.map((i) => i.companyId);
      // const roleData = await this.companyRepository.find({
      //   where: { id: In(data) },
      // });
      // var newObj = Object.assign({}, ...roleData);

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
