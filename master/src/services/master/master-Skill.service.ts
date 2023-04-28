import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MasterSkillDto } from "src/dto/masterSkill.dto";
import { masterSkill } from "src/entities/masterSkill.entity";
import { Repository } from "typeorm";

@Injectable()
export class masterSkillService {
  constructor(
    @InjectRepository(masterSkill)
    private skillRepository: Repository<masterSkill>
  ) {}

  public async create(masterSkillDTO: MasterSkillDto) {
    try {
      const newSkill = await this.skillRepository.create(masterSkillDTO);
      await this.skillRepository.save(newSkill);
      return newSkill;
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllSkill() {
    try {
      const newSkill = await this.skillRepository.find();
      if (newSkill) {
        return { data: newSkill, message: "Get All Skill" };
      } else {
        return { data: [], message: "Skill Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getSkillById(id: number) {
    try {
      // const newSkill = await skillRepository.findOne(id);
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
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async skillDelete(id: number) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const newSkill = await this.skillRepository.delete(id);
      if (newSkill) {
        return { data: [], message: "Delete Skill" };
      } else {
        return { data: [], message: "Skill Not Delete" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async skillUpdate(id: number, masterSkillDTO: MasterSkillDto) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const updateSkill = await this.skillRepository.update(id, masterSkillDTO);

      if (updateSkill) {
        const newSkill = await this.skillRepository.findOne({
          where: [{ id: id }],
        });
        return { data: newSkill, message: "Update Skill" };
      } else {
        return { data: [], message: "Skill Not Update" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
