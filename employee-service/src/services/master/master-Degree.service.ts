import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MasterDegreeDto } from "src/dto/master/masterDegree.dto";
import { QueryOptions } from "src/dto/paginationDto";
import { MasterDegree } from "src/entities/master/masterDegree.entity";
import { Repository } from "typeorm";

@Injectable()
export class MasterDegreeService {
  constructor(
    @InjectRepository(MasterDegree)
    private degreeRepository: Repository<MasterDegree>
  ) {}

  public async create(masterDegreeDto: MasterDegreeDto) {
    try {
      const degree = await this.degreeRepository.findOne({
        where: [{ degree: masterDegreeDto.degree }],
      });
      if (!degree) {
        const newDegree = await this.degreeRepository.create(masterDegreeDto);
        if (newDegree) {
          await this.degreeRepository.save(newDegree);
          return {
            data: newDegree,
            message: "Create Master-Degree Successfully",
          };
        } else {
          return { data: [], message: "fail" };
        }
      } else {
        return { data: [], message: "Degree Already Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  public async getAllDegree() {
    try {
      // let page: number = queryOptions.page || 1;
      // let limit: number = queryOptions.limit || 20;
      // let keyword: string = queryOptions.search || "";
      // // const page = options.page || 1;
      // // const limit = options.limit || 20;
      // // const newSkill = await this.skillRepository.find();
      // const data = this.degreeRepository
      //   .createQueryBuilder("masterDegree")
      //   .orderBy("masterDegree.createdAt", "DESC")
      //   .where("masterDegree.degree ILIKE :q", { q: `%${keyword}%` });

      // let total = await data.getCount();
      // data.offset((page - 1) * limit).limit(limit);
      // console.log(qb);
      const data = await this.degreeRepository.find();
      if (data) {
        return {
          data: data,
          message: "Get All Degree",
        };
      } else {
        return { data: [], message: "Degree Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDegreeById(id: number) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const newDegree = await this.degreeRepository.findOne({
        where: [{ id: id }],
      });
      if (newDegree) {
        return { data: newDegree, message: "Get Single Degree" };
      } else {
        return { data: [], message: "Degree Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async DegreeDelete(id: number) {
    try {
      const degree = await this.degreeRepository.findOne({
        where: [{ id: id }],
      });
      if (degree) {
        const newDegree = await this.degreeRepository.delete(id);
        if (newDegree) {
          return { data: [], message: "Delete Degree" };
        } else {
          return { data: [], message: "Degree Not Delete" };
        }
      } else {
        return { data: [], message: "Degree Not Exists" };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async DegreeUpdate(id: number, masterDegreeDto: MasterDegreeDto) {
    try {
      const degree = await this.degreeRepository.findOne({
        where: [{ id: id }],
      });
      if (degree) {
        const updateDegree = await this.degreeRepository.update(
          id,
          masterDegreeDto
        );

        if (updateDegree) {
          const newDegree = await this.degreeRepository.findOne({
            where: [{ id: id }],
          });
          return { data: newDegree, message: "Update Degree" };
        } else {
          return { data: [], message: "Degree Not Update" };
        }
      } else {
        return { data: [], message: "Degree Not Exists" };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
