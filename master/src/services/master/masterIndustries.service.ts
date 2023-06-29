import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { QueryOptions } from "src/dto/paginationDto";
import { MasterIndustries } from "src/entities/master/masterIndustries.entity";
import { MasterIndustriesDto } from "src/dto/master/masterIndustries.dto";

@Injectable()
export class MasterIndustriesService {
  constructor(
    @InjectRepository(MasterIndustries)
    private masterIndustriesRepository: Repository<MasterIndustries>
  ) {}

  public async create(masterIndustriesDto: MasterIndustriesDto) {
    try {
      const masterIndustries = await this.masterIndustriesRepository.findOne({
        where: [{ industryName: masterIndustriesDto.industryName }],
      });

      if (!masterIndustries) {
        const newMasterIndustries =
          this.masterIndustriesRepository.create(masterIndustriesDto);
        await this.masterIndustriesRepository.save(newMasterIndustries);
        return {
          data: newMasterIndustries,
          message: "MasterIndustries Add Successfully",
        };
      } else {
        return { data: [], message: "MasterIndustries Already Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getAllMasterIndustries(queryOptions: QueryOptions) {
    try {
      let page: number = queryOptions.page || 1;
      let limit: number = queryOptions.limit || 20;
      let keyword: string = queryOptions.search || "";

      const data = this.masterIndustriesRepository
        .createQueryBuilder("masterIndustries")
        .orderBy("masterIndustries.createdAt", "DESC")
        .where("masterIndustries.industryName ILIKE :q", { q: `%${keyword}%` });

      let total = await data.getCount();
      data.offset((page - 1) * limit).limit(limit);

      if (data) {
        return {
          data: await data.getMany(),
          total: total,
          message: "Get All MasterIndustries",
        };
      } else {
        return { data: [], message: "MasterIndustries Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getMasterIndustriesById(id: number) {
    try {
      const newMasterIndustries = await this.masterIndustriesRepository.findOne(
        {
          where: [{ id: id }],
        }
      );
      if (newMasterIndustries) {
        return {
          data: newMasterIndustries,
          message: "Get Single MasterIndustries",
        };
      } else {
        return { data: [], message: "MasterIndustries Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async masterIndustriesDelete(id: number) {
    try {
      const masterIndustries = await this.masterIndustriesRepository.findOne({
        where: [{ id: id }],
      });
      if (masterIndustries) {
        const newMasterIndustries =
          await this.masterIndustriesRepository.delete(id);
        if (newMasterIndustries) {
          return { data: [], message: "Delete MasterIndustries" };
        } else {
          return { data: [], message: "MasterIndustries Not Delete" };
        }
      } else {
        return { data: [], message: "MasterIndustries Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async masterIndustriesUpdate(
    id: number,
    masterIndustriesDto: MasterIndustriesDto
  ) {
    try {
      const masterIndustries = await this.masterIndustriesRepository.findOne({
        where: [{ id: id }],
      });
      if (masterIndustries) {
        const updateMasterIndustries =
          await this.masterIndustriesRepository.update(id, masterIndustriesDto);

        if (updateMasterIndustries) {
          const newMasterIndustries =
            await this.masterIndustriesRepository.findOne({
              where: [{ id: id }],
            });
          return {
            data: newMasterIndustries,
            message: "Update MasterIndustries",
          };
        } else {
          return { data: [], message: "MasterIndustries Not Update" };
        }
      } else {
        return { data: [], message: "MasterIndustries Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
