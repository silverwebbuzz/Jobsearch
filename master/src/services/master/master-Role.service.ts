import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterRoleDto } from 'src/dto/masterRole.dto';
import { MasterRole } from 'src/entities/masterRole.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MasterRoleService {
  constructor(
    @InjectRepository(MasterRole)
    private roleRepository: Repository<MasterRole>,
  ) {}

  public async create(masterRoleDto: MasterRoleDto) {
    try {
      const newRole = await this.roleRepository.create(masterRoleDto);
      if (newRole) {
        await this.roleRepository.save(newRole);
        return { data: newRole, message: 'Create Master-Role Successfully' };
      } else {
        return { data: [], message: 'fail' };
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
        return { data: newRole, message: 'Get All Role' };
      } else {
        return { data: [], message: 'Role Not Get' };
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
        return { data: newRole, message: 'Get Single Role' };
      } else {
        return { data: [], message: 'Role Not Get' };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async RoleDelete(id: number) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const newRole = await this.roleRepository.delete(id);
      if (newRole) {
        return { data: [], message: 'Delete Role' };
      } else {
        return { data: [], message: 'Role Not Delete' };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async RoleUpdate(id: number, masterRoleDto: MasterRoleDto) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const updateRole = await this.roleRepository.update(id, masterRoleDto);

      if (updateRole) {
        return { data: updateRole, message: 'Update Role' };
      } else {
        return { data: [], message: 'Role Not Update' };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
