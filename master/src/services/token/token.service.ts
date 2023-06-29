import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { TokenDto } from "src/dto/token/token.dto";
import { Token } from "src/entities/token/token.entity";
import { Repository } from "typeorm";
import { QueryOptions } from "src/dto/paginationDto";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>
  ) {}

  public async create(tokenDto: TokenDto) {
    try {
      const token = await this.tokenRepository.findOne({
        where: [{ tokenName: tokenDto.tokenName }],
      });

      if (!token) {
        const newToken = await this.tokenRepository.create(tokenDto);
        await this.tokenRepository.save(newToken);
        return { data: newToken, message: "Token Add Successfully" };
      } else {
        return { data: [], message: "Token Already Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getAllToken(queryOptions: QueryOptions) {
    try {
      let page: number = queryOptions.page || 1;
      let limit: number = queryOptions.limit || 20;
      let keyword: string = queryOptions.search || "";

      const data = this.tokenRepository
        .createQueryBuilder("token")
        .orderBy("token.createdAt", "DESC")
        .where("token.tokenName ILIKE :q", { q: `%${keyword}%` });

      let total = await data.getCount();
      data.offset((page - 1) * limit).limit(limit);

      if (data) {
        return {
          data: await data.getMany(),
          total: total,
          message: "Get All Token",
        };
      } else {
        return { data: [], message: "Token Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getTokenById(id: number) {
    try {
      const newToken = await this.tokenRepository.findOne({
        where: [{ id: id }],
      });
      if (newToken) {
        return { data: newToken, message: "Get Single Token" };
      } else {
        return { data: [], message: "Token Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async tokenDelete(id: number) {
    try {
      const token = await this.tokenRepository.findOne({
        where: [{ id: id }],
      });
      if (token) {
        const newToken = await this.tokenRepository.delete(id);
        if (newToken) {
          return { data: [], message: "Delete Token" };
        } else {
          return { data: [], message: "Token Not Delete" };
        }
      } else {
        return { data: [], message: "Token Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async tokenUpdate(id: number, tokenDTO: TokenDto) {
    try {
      const token = await this.tokenRepository.findOne({
        where: [{ id: id }],
      });
      if (token) {
        const updateToken = await this.tokenRepository.update(id, tokenDTO);

        if (updateToken) {
          const newToken = await this.tokenRepository.findOne({
            where: [{ id: id }],
          });
          return { data: newToken, message: "Update Token" };
        } else {
          return { data: [], message: "Token Not Update" };
        }
      } else {
        return { data: [], message: "Token Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
