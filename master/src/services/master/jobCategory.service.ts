import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { JobCategoryDto } from "src/dto/master/jobCategory.dto";
import { JobCategory } from "src/entities/master/jobCategory.entity";
import { Repository } from "typeorm";
import { QueryOptions } from "src/dto/paginationDto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(JobCategory)
    private jobCategoryRepository: Repository<JobCategory>
  ) {}

  public async create(jobCategoryDto: JobCategoryDto) {
    try {
      const Category = await this.jobCategoryRepository.findOne({
        where: [{ categoryName: jobCategoryDto.categoryName }],
      });

      if (!Category) {
        const newCategory = this.jobCategoryRepository.create(jobCategoryDto);
        await this.jobCategoryRepository.save(newCategory);
        return { data: newCategory, message: "Category Add Successfully" };
      } else {
        return { data: [], message: "Category Already Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllCategory(queryOptions: QueryOptions) {
    try {
      let page: number = queryOptions.page || 1;
      let limit: number = queryOptions.limit || 20;
      let keyword: string = queryOptions.search || "";

      const data = this.jobCategoryRepository
        .createQueryBuilder("jobCategory")
        .orderBy("jobCategory.createdAt", "DESC")
        .where("jobCategory.categoryName ILIKE :q", { q: `%${keyword}%` });

      let total = await data.getCount();
      data.offset((page - 1) * limit).limit(limit);
      // console.log(qb);

      if (data) {
        return {
          data: await data.getMany(),
          total: total,
          message: "Get All Category",
        };
      } else {
        return { data: [], message: "Category Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getCategoryById(id: number) {
    try {
      const newCategory = await this.jobCategoryRepository.findOne({
        where: [{ id: id }],
      });
      if (newCategory) {
        return { data: newCategory, message: "Get Single Category" };
      } else {
        return { data: [], message: "Category Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async categoryDelete(id: number) {
    try {
      const Category = await this.jobCategoryRepository.findOne({
        where: [{ id: id }],
      });
      if (Category) {
        const newCategory = await this.jobCategoryRepository.delete(id);
        if (newCategory) {
          return { data: [], message: "Delete Category" };
        } else {
          return { data: [], message: "Category Not Delete" };
        }
      } else {
        return { data: [], message: "Category Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async categoryUpdate(id: number, jobCategoryDto: JobCategoryDto) {
    try {
      const Category = await this.jobCategoryRepository.findOne({
        where: [{ id: id }],
      });
      if (Category) {
        const updateCategory = await this.jobCategoryRepository.update(
          id,
          jobCategoryDto
        );

        if (updateCategory) {
          const newCategory = await this.jobCategoryRepository.findOne({
            where: [{ id: id }],
          });
          return { data: newCategory, message: "Update Category" };
        } else {
          return { data: [], message: "Category Not Update" };
        }
      } else {
        return { data: [], message: "Category Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
