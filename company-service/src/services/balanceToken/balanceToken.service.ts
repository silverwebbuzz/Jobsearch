import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BalanceTokenDto } from "src/dto/balanceToken.dto";
import { BalanceTokenEntity } from "src/entities/balanceToken.entity";
import { Repository } from "typeorm";

@Injectable()
export class BalanceTokenService {
  constructor(
    @InjectRepository(BalanceTokenEntity)
    private balanceTokenRepository: Repository<BalanceTokenEntity>
  ) {}

  public async createBalanceToken(balanceTokenDto: BalanceTokenDto) {
    try {
      const newBalanceToken =
        this.balanceTokenRepository.create(balanceTokenDto);

      if (newBalanceToken) {
        await this.balanceTokenRepository.save(newBalanceToken);

        return {
          data: newBalanceToken,
          message: "Create BalanceToken Successfully",
        };
      } else {
        return { data: [], message: "fail" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getAllBalanceToken() {
    try {
      const getAllToken = this.balanceTokenRepository.find();
      if (getAllToken) {
        return {
          data: getAllToken,
          message: "Get All Balance",
        };
      } else {
        return { data: [], message: "Balance Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getBalanceTokenById(id: number) {
    try {
      const balanceToken = await this.balanceTokenRepository.findOne({
        where: [{ id: id }],
      });

      if (balanceToken) {
        return { data: balanceToken, message: "Get Single BalanceToken" };
      } else {
        return { message: "BalanceToken Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getBalanceTokenByCompanyId(company_id) {
    try {
      const balanceToken = await this.balanceTokenRepository.find({
        where: [{ company_id: company_id }],
      });
      // console.log(newAdmin);

      if (balanceToken) {
        return { data: balanceToken, message: "Get BalanceToken" };
      } else {
        return { data: [], message: "BalanceToken Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async balanceTokenDelete(id: number) {
    try {
      const balanceToken = await this.balanceTokenRepository.findOne({
        where: [{ id: id }],
      });
      if (balanceToken) {
        const newBalance = await this.balanceTokenRepository.delete(id);
        if (newBalance) {
          return { data: [], message: "Delete BalanceToken" };
        } else {
          return { data: [], message: "BalanceToken Not Delete" };
        }
      } else {
        return { data: [], message: "BalanceToken Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async balanceTokenUpdate(
    id: number,
    balanceTokenDto: BalanceTokenDto
  ) {
    try {
      const balanceToken = await this.balanceTokenRepository.findOne({
        where: [{ id: id }],
      });

      if (balanceToken) {
        const updateToken = await this.balanceTokenRepository.update(
          id,
          balanceTokenDto
        );

        if (updateToken) {
          const newBalance = await this.balanceTokenRepository.findOne({
            where: [{ id: id }],
          });

          return { data: newBalance, message: "Update BalanceToken" };
        } else {
          return { data: [], message: "BalanceToken Not Update" };
        }
      } else {
        return { data: [], message: "BalanceToken Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
