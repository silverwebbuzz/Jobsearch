import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MasterSkillDto } from "src/dto/master/masterSkill.dto";
import { masterSkill } from "src/entities/master/masterSkill.entity";
import { Repository } from "typeorm";
import { QueryOptions } from "src/dto/paginationDto";

@Injectable()
export class masterSkillService {
  constructor(
    @InjectRepository(masterSkill)
    private skillRepository: Repository<masterSkill>
  ) {}

  public async create(masterSkillDTO: MasterSkillDto) {
    try {
      const skill = await this.skillRepository.findOne({
        where: [{ skillName: masterSkillDTO.skillName }],
      });
      console.log(skill);

      if (!skill) {
        const newSkill = this.skillRepository.create(masterSkillDTO);
        await this.skillRepository.save(newSkill);
        return { data: newSkill, message: "Skill Add Successfully" };
      } else {
        return { data: [], message: "Skill Already Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getAllSkill(queryOptions: QueryOptions) {
    try {
      let page: number = queryOptions.page || 1;
      let limit: number = queryOptions.limit || 20;
      let keyword: string = queryOptions.search || "";
  
      const data = this.skillRepository
        .createQueryBuilder("masterSkill")
        .orderBy("masterSkill.createdAt", "DESC")
        .where("masterSkill.skillName ILIKE :q", { q: `%${keyword}%` });

      let total = await data.getCount();
      data.offset((page - 1) * limit).limit(limit);

      if (data) {
        return {
          data: await data.getMany(),
          total: total,
          message: "Get All Skill",
        };
      } else {
        return { data: [], message: "Skill Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getSkillById(id: number) {
    try {
      const newSkill = await this.skillRepository.findOne({
        where: [{ id: id }],
      });
      if (newSkill) {
        return { data: newSkill, message: "Get Single Skill" };
      } else {
        return { data: [], message: "Skill Not Get" };
      }

    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async skillDelete(id: number) {
    try {
      const skill = await this.skillRepository.findOne({
        where: [{ id: id }],
      });
      if (skill) {
        const newSkill = await this.skillRepository.delete(id);
        if (newSkill) {
          return { data: [], message: "Delete Skill" };
        } else {
          return { data: [], message: "Skill Not Delete" };
        }
      } else {
        return { data: [], message: "Skill Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async skillUpdate(id: number, masterSkillDTO: MasterSkillDto) {
    try {
      const skill = await this.skillRepository.findOne({
        where: [{ id: id }],
      });
      if (skill) {
        const updateSkill = await this.skillRepository.update(
          id,
          masterSkillDTO
        );

        if (updateSkill) {
          const newSkill = await this.skillRepository.findOne({
            where: [{ id: id }],
          });
          return { data: newSkill, message: "Update Skill" };
        } else {
          return { data: [], message: "Skill Not Update" };
        }
      } else {
        return { data: [], message: "Skill Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async payment(res) {
    const request = require("request");

    const options = {
      url: "https://sandbox.cashfree.com/pg/orders",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": "TEST377598107ac66ee0a5f1faae0f895773",
        "x-client-secret": "TEST1cd93ad8a2cd10329d44017a731a5fbc629124c4",
        "x-api-version": "2022-09-01",
      },
      json: true,
      body: {
        orderId: "Order0001",
        order_amount: "1",
        order_currency: "INR",
        customer_details: {
          customer_id: "123",
          customer_name: "customer_name",
          customer_email: "customer@gmail.com",
          customer_phone: "8128888814",
        },
      },
    };

    request(options, function (error, response, body) {
      if (error) {
        console.error(error);
      } else {
        res.json({ data: body, message: "Order Created" });
      }
    });
  }
}
