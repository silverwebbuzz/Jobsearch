import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobPreferenceDto } from "src/dto/company/jobPreference.dto";
import { CompanyJobPreferenceEntity } from "src/entities//company/company-jobpreference.entity";
import { Repository } from "typeorm";
import { QueryOptions } from "src/dto/paginationDto";

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(CompanyJobPreferenceEntity)
    private jobPreferenceRepository: Repository<CompanyJobPreferenceEntity>
  ) {}

  public async getAllJobPreference(queryOptions: QueryOptions) {
    try {
      let page: number = queryOptions.page || 1;
      let limit: number = queryOptions.limit || 20;
      let keyword: string = queryOptions.search || "";
      const data = this.jobPreferenceRepository
        .createQueryBuilder("companyJobPreference")
        .orderBy("companyJobPreference.id", "ASC")
        .orWhere("companyJobPreference.companyName ILIKE :q", {
          q: `%${keyword}%`,
        })
        .orWhere("companyJobPreference.jobRole ILIKE :q", {
          q: `%${keyword}%`,
        })
        .orWhere("companyJobPreference.department ILIKE :q", {
          q: `%${keyword}%`,
        })
        .orWhere("companyJobPreference.categories ILIKE :q", {
          q: `%${keyword}%`,
        });
      let total = await data.getCount();
      data.offset((page - 1) * limit).limit(limit);
      if (data) {
        return {
          data: await data.getMany(),
          total: total,
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
        return { data: [], message: "jobPreference Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getJobPreferenceByCompanyId(company_id) {
    try {
      const newAdmin = await this.jobPreferenceRepository.find({
        where: [{ company_id: company_id }],
      });
      // console.log(newAdmin);

      if (newAdmin) {
        return { data: newAdmin, message: "Get Single jobPreference" };
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
        const newAdmin = await this.jobPreferenceRepository.delete(id);
        if (newAdmin) {
          return { data: [], message: "Delete jobPreference" };
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

        if (updatePreference) {
          const newPreference = await this.jobPreferenceRepository.findOne({
            where: [{ id: id }],
          });
          return { data: newPreference, message: "Update Job-Preference" };
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
