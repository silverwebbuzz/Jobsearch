import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MasterRoleDto } from "src/dto/master/masterRole.dto";
import { QueryOptions } from "src/dto/paginationDto";
import { MasterRole } from "src/entities/master/masterRole.entity";
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
        where: [{ roleName: masterRoleDto.roleName }],
      });
      if (!role) {
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
    }
  }
  public async getAllRole(queryOptions: QueryOptions) {
    try {
      let page: number = queryOptions.page || 1;
      let limit: number = queryOptions.limit || 20;
      let keyword: string = queryOptions.search || "";
      const data = this.roleRepository
        .createQueryBuilder("masterRoll")
        .orderBy("masterRoll.createdAt", "DESC")
        .where("masterRoll.roleName ILIKE :q", { q: `%${keyword}%` });

      let total = await data.getCount();
      data.offset((page - 1) * limit).limit(limit);
      if (data) {
        return {
          data: await data.getMany(),
          total: total,
          message: "Get All Role",
        };
      } else {
        return { data: [], message: "Role Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getRoleById(id: number) {
    try {
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
    } catch (err) {
      console.log(err);
      return err;
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
          const newRole = await this.roleRepository.findOne({
            where: [{ id: id }],
          });
          return { data: newRole, message: "Update Role" };
        } else {
          return { data: [], message: "Role Not Update" };
        }
      } else {
        return { data: [], message: "Role Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
