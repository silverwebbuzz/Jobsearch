import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyEntity } from "src/entities/company/company.entity";
import { Repository } from "typeorm";

import { CompanyEditDto } from "src/dto/company/companyEdit.dto";
import { HttpService } from "@nestjs/axios";
const request = require("request");

import { MasterRole } from "../../../entities/master/masterRole.entity";
import { masterSkill } from "../../../entities/master/masterSkill.entity";
import { QueryOptions } from "src/dto/paginationDto";
import { StateDto } from "src/dto/state.dto";
var worldMapData = require("city-state-country");

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity> // @InjectRepository(masterSkill) // private skillRepository: Repository<masterSkill>, // @InjectRepository(MasterRole) // private roleRepository: Repository<MasterRole>
  ) {}

  public async getAllCompany(queryOptions: QueryOptions) {
    try {
      let page: number = queryOptions.page || 1;
      let limit: number = queryOptions.limit || 20;
      let keyword: string = queryOptions.search || "";
      const newCompany = this.companyRepository
        .createQueryBuilder("company")
        .orderBy("company.createdAt", "DESC")
        .orWhere("company.companyName ILIKE :q", { q: `%${keyword}%` })
        .orWhere("company.companyEmail ILIKE :q", { q: `%${keyword}%` });

      let total = await newCompany.getCount();
      newCompany.offset((page - 1) * limit).limit(limit);
      if (newCompany) {
        return {
          data: await newCompany.getMany(),
          total,
          message: "Get All Company",
        };
      } else {
        return { data: [], message: "Company Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getCompanyById(id: number) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const newCompany = await this.companyRepository.findOne({
        where: [{ id: id }],
      });
      if (newCompany) {
        return { data: newCompany, message: "Get Single Company" };
      } else {
        return { data: [], message: "Company Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async companyUpdate(id: number, companyEditDto: CompanyEditDto) {
    try {
      const company = await this.companyRepository.findOne({
        where: [{ id: id }],
      });
      if (company) {
        const updatecompany = await this.companyRepository.update(
          id,
          companyEditDto
        );

        if (updatecompany) {
          const newcompany = await this.companyRepository.findOne({
            where: [{ id: id }],
          });
          return { data: newcompany, message: "Update company" };
        } else {
          return { data: [], message: "company Not Update" };
        }
      } else {
        return { data: [], message: "Company Not Exists" };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async companyDelete(id: number) {
    try {
      const admin = await this.companyRepository.findOne({
        where: [{ id: id }],
      });
      if (admin) {
        const newAdmin = await this.companyRepository.delete(id);
        if (newAdmin) {
          return { data: [], message: "Delete Company" };
        } else {
          return { data: [], message: "Company Not Delete" };
        }
      } else {
        return { data: [], message: "Company Not Exists" };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  // public async getAllSkill(queryOptions: QueryOptions) {
  //   try {
  //     let keyword: string = queryOptions.search || "";
  //     // const page = options.page || 1;
  //     // const limit = options.limit || 20;
  //     // const newSkill = await this.skillRepository.find();
  //     const data = this.skillRepository
  //       .createQueryBuilder("masterSkill")

  //       .orderBy("masterSkill.createdAt", "DESC")
  //       .where("masterSkill.skillName ILIKE :q", { q: `%${keyword}%` });

  //     let total = await data.getCount();
  //     data.select(["masterSkill.skillName", "masterSkill.id"]);
  //     // data.offset((page - 1) * limit).limit(limit);
  //     // console.log(qb);
  //     if (queryOptions.search) {
  //       if (data) {
  //         return {
  //           data: await data.getMany(),
  //           total: total,
  //           message: "Get All Skill",
  //         };
  //       } else {
  //         return { data: [], message: "Skill Not Get" };
  //       }
  //     } else {
  //       return { data: [], message: "Skill Not Get" };
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //   }
  // }

  // public async getAllRole(queryOptions: QueryOptions) {
  //   try {
  //     let keyword: string = queryOptions.search || "";
  //     // const page = options.page || 1;
  //     // const limit = options.limit || 20;
  //     // const newSkill = await this.skillRepository.find();
  //     const data = this.roleRepository
  //       .createQueryBuilder("masterRole")
  //       .orderBy("masterRole.createdAt", "DESC")
  //       .where("masterRole.roleName ILIKE :q", { q: `%${keyword}%` });

  //     let total = await data.getCount();
  //     // data.offset((page - 1) * limit).limit(limit);
  //     // console.log(qb);
  //     if (queryOptions.search) {
  //       if (data) {
  //         data.select(["masterRole.roleName", "masterRole.id"]);
  //         return {
  //           data: await data.getMany(),
  //           total: total,
  //           message: "Get All Role",
  //         };
  //       } else {
  //         return { data: [], message: "Role Not Get" };
  //       }
  //     } else {
  //       return { data: [], message: "Role Not Get" };
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //     // throw new HttpException(err, HttpStatus.BAD_REQUEST);
  //   }
  // }

  public async getState() {
    try {
      // let city: string = statedto.city || "";

      const statesList = worldMapData.getAllStatesFromCountry("India");

      if (statesList.length > 0) {
        return { data: statesList, message: "Get All States" };
      } else {
        return { data: [], message: "State Not Found" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getCity(statedto: StateDto) {
    try {
      let state: string = statedto.state || "";

      const citysList = worldMapData.getAllCitiesFromState(`${state}`);

      if (citysList.length > 0) {
        return { data: citysList, message: "Get All City" };
      } else {
        return { data: [], message: "City Not Found" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
