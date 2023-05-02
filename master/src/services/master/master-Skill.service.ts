import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  CFConfig,
  CFCustomerDetails,
  CFEnvironment,
  CFOrderRequest,
  CFPaymentGateway,
} from "cashfree-pg-sdk-nodejs";
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

  public async payment(res) {
    // const request = require("request");

    // const orderId = "Order001";
    // const orderAmount = "100.00";
    // const orderCurrency = "INR";
    // const customerName = "John Doe";
    // const customerEmail = "johndoe@example.com";
    // const customerPhone = "9999999999";
    // const returnUrl = "http://example.com/success";
    // const notifyUrl = "http://example.com/notify";

    // const options = {
    //   url: "https://test.cashfree.com/api/v2/cftoken/order",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-client-id": "TEST377598107ac66ee0a5f1faae0f895773",
    //     "x-client-secret": "TEST1cd93ad8a2cd10329d44017a731a5fbc629124c4",
    //   },
    //   json: true,
    //   body: {
    //     orderId,
    //     orderAmount,
    //     orderCurrency,
    //     customerName,
    //     customerEmail,
    //     customerPhone,
    //     returnUrl,
    //     notifyUrl,
    //   },
    // };

    // request(options, function (error, response, body) {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     console.log(response);

    //     return response;
    //   }
    // });
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
        console.log(body);
        return { data: body, message: "sucess" };
      }
    });
  }
}
