import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterDegreeDto } from 'src/dto/masterDegree.dto';
import { MasterDegree } from 'src/entities/masterDegree.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MasterDegreeService {
  constructor(
    @InjectRepository(MasterDegree)
    private degreeRepository: Repository<MasterDegree>,
  ) {}

  public async create(masterDegreeDto: MasterDegreeDto) {
    try {
      const newDegree = await this.degreeRepository.create(masterDegreeDto);
      if (newDegree) {
        await this.degreeRepository.save(newDegree);
        return {
          data: newDegree,
          message: 'Create Master-Degree Successfully',
        };
      } else {
        return { data: [], message: 'fail' };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  public async getAllDegree() {
    try {
      const newDegree = await this.degreeRepository.find();
      if (newDegree) {
        return { data: newDegree, message: 'Get All Degree' };
      } else {
        return { data: [], message: 'Degree Not Get' };
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
        return { data: newDegree, message: 'Get Single Degree' };
      } else {
        return { data: [], message: 'Degree Not Get' };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async DegreeDelete(id: number) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const newDegree = await this.degreeRepository.delete(id);
      if (newDegree) {
        return { data: [], message: 'Delete Degree' };
      } else {
        return { data: [], message: 'Degree Not Delete' };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async DegreeUpdate(id: number, masterDegreeDto: MasterDegreeDto) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const updateDegree = await this.degreeRepository.update(
        id,
        masterDegreeDto,
      );

      if (updateDegree) {
        return { data: updateDegree, message: 'Update Degree' };
      } else {
        return { data: [], message: 'Degree Not Update' };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
