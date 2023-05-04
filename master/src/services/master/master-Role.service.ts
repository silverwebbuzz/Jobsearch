import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MasterRoleDto } from "src/dto/masterRole.dto";
import { MasterRole } from "src/entities/masterRole.entity";
import { Repository } from "typeorm";

@Injectable()
export class MasterRoleService {
  constructor(
    @InjectRepository(MasterRole)
    private roleRepository: Repository<MasterRole>
  ) {}

  public async create(masterRoleDto: MasterRoleDto) {
    try {
      const role = await this.roleRepository.findOne({
        where: [{ name: masterRoleDto.name }],
      });
      if (role) {
        const newRole = this.roleRepository.create(masterRoleDto);
        if (newRole) {
          await this.roleRepository.save(newRole);
          return { data: newRole, message: "Create Master-Role Successfully" };
        } else {
          return { data: [], message: "fail" };
        }
      } else {
        return { data: [], message: "Role Already Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  public async getAllRole() {
    try {
      const newRole = await this.roleRepository.find();
      if (newRole) {
        return { data: newRole, message: "Get All Role" };
      } else {
        return { data: [], message: "Role Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getRoleById(id: number) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const newRole = await this.roleRepository.findOne({
        where: [{ id: id }],
      });
      if (newRole) {
        return { data: newRole, message: "Get Single Role" };
      } else {
        return { data: [], message: "Role Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async RoleDelete(id: number) {
    try {
      const role = await this.roleRepository.findOne({
        where: [{ id: id }],
      });
      if (role) {
        const newRole = await this.roleRepository.delete(id);
        if (newRole) {
          return { data: [], message: "Delete Role" };
        } else {
          return { data: [], message: "Role Not Delete" };
        }
      } else {
        return { data: [], message: "Role Not Exists" };
      }

      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async RoleUpdate(id: number, masterRoleDto: MasterRoleDto) {
    try {
      const role = await this.roleRepository.findOne({
        where: [{ id: id }],
      });
      if (role) {
        const updateRole = await this.roleRepository.update(id, masterRoleDto);

        if (updateRole) {
          return { data: updateRole, message: "Update Role" };
        } else {
          return { data: [], message: "Role Not Update" };
        }
      } else {
        return { data: [], message: "Role Not Exists" };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
