import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MasterAdmin } from "src/entities/masterAdmin.entity";
import { MasterAdminDto } from "src/dto/masterAdmin.dto";
import { Repository } from "typeorm";

@Injectable()
export class MasterAdminService {
  constructor(
    @InjectRepository(MasterAdmin)
    private adminRepository: Repository<MasterAdmin>
  ) {}

  public async createAdmin(masterAdminDto: MasterAdminDto) {
    try {
      const admin = await this.adminRepository.findOne({
        where: [{ Email: masterAdminDto.Email }],
      });
      if (admin) {
        const newAdmin = await this.adminRepository.create(masterAdminDto);
        if (newAdmin) {
          await this.adminRepository.save(newAdmin);
          return {
            data: newAdmin,
            message: "Create Master-Admin Successfully",
          };
        } else {
          return { data: [], message: "fail" };
        }
      } else {
        return { data: [], message: "Email Already Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  public async getAllAdmin() {
    try {
      const newDegree = await this.adminRepository.find();
      if (newDegree) {
        return { data: newDegree, message: "Get All Master-Admin" };
      } else {
        return { data: [], message: "Admin Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAdminById(id: number) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const newAdmin = await this.adminRepository.findOne({
        where: [{ id: id }],
      });
      if (newAdmin) {
        return { data: newAdmin, message: "Get Single Admin" };
      } else {
        return { data: [], message: "Admin Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async AdminDelete(id: number) {
    try {
      const admin = await this.adminRepository.findOne({
        where: [{ id: id }],
      });
      if (admin) {
        const newAdmin = await this.adminRepository.delete(id);
        if (newAdmin) {
          return { data: [], message: "Delete Admin" };
        } else {
          return { data: [], message: "Admin Not Delete" };
        }
      } else {
        return { data: [], message: "Admin Not Exists" };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async adminUpdate(id: number, masterAdminDto: MasterAdminDto) {
    try {
      const admin = await this.adminRepository.findOne({
        where: [{ id: id }],
      });
      if (admin) {
        const updateAdmin = await this.adminRepository.update(
          id,
          masterAdminDto
        );

        if (updateAdmin) {
          const newAdmin = await this.adminRepository.findOne({
            where: [{ id: id }],
          });
          return { data: newAdmin, message: "Update Admin" };
        } else {
          return { data: [], message: "Admin Not Update" };
        }
      } else {
        return { data: [], message: "Admin Not Exists" };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
