import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyDto } from "src/dto/company/company.dto";
import { CompanyEntity } from "src/entities/company/company.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "src/dto/auth/login.dto";
import { JwtPayload } from "src/interface/company.interface";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { OtpDto } from "src/dto/auth/resendOtp.dto";
import { CompanyEditDto } from "src/dto/company/companyEdit.dto";
import { HttpService } from "@nestjs/axios";
const request = require("request");
import { firstValueFrom } from "rxjs";
import { Environment } from "../../../env/environment";
import { MasterRole } from "src/entities/master/masterRole.entity";
import { masterSkill } from "../../entities/master/masterSkill.entity";
import { QueryOptions } from "src/dto/paginationDto";
import { StateDto } from "src/dto/state.dto";
import { JobCategory } from "src/entities/master/jobCategory.entity";
import { ChangePasswordDto } from "src/dto/auth/changePassword.dto";
import { SearchDto } from "src/dto/searchDto";
import { ImageDto } from "src/dto/company/image.dto";
var worldMapData = require("city-state-country");
const base64ToImage = require("base64-to-image");

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
    private httpService: HttpService,
    @InjectRepository(masterSkill)
    private skillRepository: Repository<masterSkill>,
    @InjectRepository(MasterRole)
    private roleRepository: Repository<MasterRole>,
    @InjectRepository(JobCategory)
    private jobCategoryRepository: Repository<JobCategory>
  ) {}

  public async create(companyDto: CompanyDto) {
    try {
      const company = await this.companyRepository.findOne({
        where: [{ companyEmail: companyDto.companyEmail }],
      });
      if (!company) {
        const newCompany = await this.companyRepository.create(companyDto);
        const salt = await bcrypt.genSalt();
        const encryptPassword = await bcrypt.hash(companyDto.password, salt);
        companyDto.password = encryptPassword;
        newCompany.password = companyDto.password;
        const otp = Math.floor(1000 + Math.random() * 9000);
        await this.mailerService.sendMail({
          to: companyDto.companyEmail, // list of receivers
          from: "ashish.swb1234@gmail.com", // sender address
          subject: "otp",
          html: `${otp}`,
        });
        newCompany.otp = otp;
        const randomId = Date.now().toString();
        const id = randomId + Math.floor(Math.random() * 10);
        newCompany.company_id = id;
        const data = await this.companyRepository.save(newCompany);
        newCompany.caffilateCode = `C-${data.companyName}-${data.id}`;
        await this.companyRepository.save(newCompany);
        return {
          data: newCompany,
          message: "Register Successfully",
          status: 200,
        };
      } else {
        return { data: [], message: "Email Already Exists", status: 400 };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async logoUpload(id: number, imageDto: ImageDto) {
    try {
      const base64Str = imageDto.file;
      const company = await this.companyRepository.findOne({
        where: [{ id: id }],
      });
      if (company) {
        // if (!imageDto.file === null) {
        const path = "./uploads/company/";
        const optionalObj = {
          fileName: imageDto.fileName || "",
          type: base64Str.split(";")[0].split("/")[1],
        };

        const imageInfo = base64ToImage(base64Str, path, optionalObj);

        const filePath = `http://192.168.1.109:5001/company/uploads/company/${imageInfo.fileName}`;

        company["logo"] = filePath;
        company["logoUploded"] = imageDto.logoUploded;

        await this.companyRepository.save(company);
        // const staticSkill = { staticSkillName: staticSkillName, logo: filePath };
        // this.staticSkillRepository.save(staticSkill);
        return {
          data: company,
          message: "Profile Upload Successfully",
          status: 200,
        };
        // } else {
        //   employee["resumeUploded"] = resumeDto.resumeUploded;

        //   await this.employeeRepository.save(employee);
        //   // const staticSkill = { staticSkillName: staticSkillName, logo: filePath };
        //   // this.staticSkillRepository.save(staticSkill);
        //   return {
        //     data: company,
        //     message: "Profile Upload Successfully",
        //     status: 200,
        //   };
        // }
      } else {
        return { data: [], message: "User Not Exits", status: 400 };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async companyLogin(loginDto: LoginDto) {
    const password = loginDto.password;

    // const supplier = await this.companyRepository.findOne({
    //   where: [{ companyEmail: loginDto.companyEmail }],
    // });
    if (await this.isValidateUser(loginDto)) {
      const company = await this.companyRepository.findOne({
        where: [{ companyEmail: loginDto.companyEmail }],
      });
      if (company) {
        //  check password
        if (company.isApproval === true) {
          const isValidPassword = await bcrypt.compare(
            password,
            company.password
          );

          if (isValidPassword === false) {
            return { data: [], message: "Invalid credential", status: 401 };
            // throw new UnauthorizedException('Invalid credential')
          } else {
            if (company.emailVerify === 1) {
              company["lastLogin"] = new Date();
              company.save();
              return {
                data: {
                  token: await this.signUser({
                    companyName: company.companyName,
                    companyEmail: company.companyEmail,
                    companyPhone: company.companyPhone,
                  }),
                  company,
                },
                status: 200,
                message: "Login Successfully",
              };
            } else {
              return { data: [], message: "Email Not Verified", status: 400 };
            }
          }
        } else {
          return {
            data: {
              token: await this.signUser({
                companyName: company.companyName,
                companyEmail: company.companyEmail,
                companyPhone: company.companyPhone,
              }),
              company,
            },
            message: "Company Not Approve",
            status: 400,
          };
        }
      } else {
        return { data: [], message: "Email Not Exists", status: 402 };
        // throw new UnauthorizedException('incorrect credentials');
      }
    }
  }

  async isValidateUser(loginDto: LoginDto) {
    return true;
  }
  async signUser(company: JwtPayload): Promise<string> {
    return await this.jwtService.sign(company);
  }

  public async resendOTP(otpDto: OtpDto) {
    try {
      const company = await this.companyRepository.findOne({
        where: [{ companyEmail: otpDto.companyEmail }],
      });
      if (company) {
        const data = await this.mailerService.sendMail({
          to: otpDto.companyEmail, // list of receivers
          from: "ashish.swb1234@gmail.com", // sender address
          subject: "otp", // Subject line
          html: `${company.otp}`,
          // html: ', // HTML body content
        });
        if (data) {
          return {
            data: company,
            message: "Otp Send Successfully",
            status: 200,
          };
        } else {
          return { data: [], message: "Otp Not Send", status: 400 };
        }
      } else {
        return { data: [], message: "Email Not Exists", status: 401 };
      }
    } catch (err) {
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async verifyOTP(otpDto: OtpDto) {
    try {
      const company = await this.companyRepository.findOne({
        where: [{ companyEmail: otpDto.companyEmail, otp: otpDto.otp }],
      });
      if (company) {
        const data = await this.mailerService.sendMail({
          to: otpDto.companyEmail, // list of receivers
          from: "ashish.swb1234@gmail.com", // sender address
          subject: "otp", // Subject line
          html: `${company.otp}`,
          // html: ', // HTML body content
        });
        company.emailVerify = 1;
        company.save();
        if (data) {
          return { data: company, message: "Otp Verified", status: 200 };
        } else {
          return { data: [], message: "Otp Not Send", status: 400 };
        }
      } else {
        return { data: [], message: "Please Enter Correct Otp", status: 401 };
      }
    } catch (err) {
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updatePassword(changePasswordDto: ChangePasswordDto) {
    try {
      const employee = await this.companyRepository.findOne({
        where: [{ companyEmail: changePasswordDto.companyEmail }],
      });
      if (employee) {
        const salt = await bcrypt.genSalt();
        const encryptPassword = await bcrypt.hash(
          changePasswordDto.password,
          salt
        );
        changePasswordDto.password = encryptPassword;
        employee["password"] = encryptPassword;
        // const updateEmployee = await this.companyRepository.update(
        //   changePasswordDto.companyEmail,
        //   (changePasswordDto.password = encryptPassword)
        // );
        await this.companyRepository.save(employee);

        return {
          data: employee,
          message: "Password Change Successfully",
          status: 200,
        };
      } else {
        return { data: [], message: "Email Not Exists", status: 400 };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async forgotPassword(changePasswordDto: ChangePasswordDto) {
    try {
      const employee = await this.companyRepository.findOne({
        where: [{ companyEmail: changePasswordDto.companyEmail }],
      });
      // if (employee) {
      const data = await this.mailerService.sendMail({
        to: changePasswordDto.companyEmail, // list of receivers
        from: "ashish.swb1234@gmail.com", // sender address
        subject: "Forgot Password", // Subject line
        html: `http://localhost:3000/create-password?emailId=${changePasswordDto.companyEmail}`,
        // html: ', // HTML body content
      });
      if (data) {
        return { data: [], message: "Mail Send Successfully", status: 200 };
      } else {
        return { data: [], message: "Mail Not Send", status: 400 };
      }
      // } else {
      //   return { data: [], message: "Email Not Exists" };
      // }
    } catch (err) {
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const password = changePasswordDto.password;
    // const supplier = await this.companyRepository.findOne({
    //   where: [{ companyEmail: changePasswordDto.companyEmail }],
    // });
    const company = await this.companyRepository.findOne({
      where: [{ companyEmail: changePasswordDto.companyEmail }],
    });
    if (company) {
      //  check password
      const isValidPassword = await bcrypt.compare(password, company.password);

      if (isValidPassword === false) {
        return { data: [], message: "Invalid credential", status: 401 };
        // throw new UnauthorizedException('Invalid credential')
      } else {
        const salt = await bcrypt.genSalt();
        const encryptPassword = await bcrypt.hash(
          changePasswordDto.newPassword,
          salt
        );
        changePasswordDto.newPassword = encryptPassword;

        company["password"] = encryptPassword;

        await this.companyRepository.save(company);

        // const updateEmployee = await this.employeeRepository.update(
        //   changePasswordDto.employeeEmail,
        //   (changePasswordDto.password = encryptPassword)
        // );

        return {
          data: company,
          status: 200,
          message: "Password Change Successfully",
        };
      }
    } else {
      return { data: [], message: "Email Not Exits", status: 400 };
    }
  }

  public async getCompanyById(id: number) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const newCompany = await this.companyRepository.findOne({
        where: [{ id: id }],
      });
      if (newCompany) {
        return { data: newCompany, message: "Get Single Company", status: 200 };
      } else {
        return { data: [], message: "Company Not Get", status: 400 };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  public async companyUpdate(id: number, companyEditDto: CompanyEditDto) {
    try {
      const company = await this.companyRepository.findOne({
        where: [{ id: id }],
      });
      if (company) {
        const updatecompany = await this.companyRepository.update(
          id,
          companyEditDto
        );
        if (updatecompany) {
          const newcompany = await this.companyRepository.findOne({
            where: [{ id: id }],
          });
          return {
            data: newcompany,
            message: "Update company-Profile Successfully",
            status: 200,
          };
        } else {
          return { data: [], message: "company Not Update", status: 400 };
        }
      } else {
        return { data: [], message: "Company Not Exists", status: 401 };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async payment(res) {
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
        res.json({ data: body, message: "Order Created" });
      }
    });
  }

  public async getAllSkill(searchDto: SearchDto) {
    try {
      let keyword: string = searchDto.search || "";
      // const page = options.page || 1;
      // const limit = options.limit || 20;
      // const newSkill = await this.skillRepository.find();
      const data = this.skillRepository
        .createQueryBuilder("masterSkill")

        .orderBy("masterSkill.createdAt", "DESC")
        .where("masterSkill.skillName ILIKE :q", { q: `%${keyword}%` });

      let total = await data.getCount();
      data.select(["masterSkill.skillName", "masterSkill.id"]);
      // data.offset((page - 1) * limit).limit(limit);
      // console.log(qb);
      if (searchDto.search) {
        if (total > 0) {
          return {
            data: await data.getMany(),
            total: total,
            //  status: 200,
            // message: "Get All Skill",
          };
        } else {
          return { data: [], message: "Skill Not Get" };
        }
      } else {
        return { data: [], message: "Skill Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getAllRole(searchDto: SearchDto) {
    try {
      let keyword: string = searchDto.search || "";
      // const page = options.page || 1;
      // const limit = options.limit || 20;
      // const newSkill = await this.skillRepository.find();
      const data = this.roleRepository
        .createQueryBuilder("masterRole")
        .orderBy("masterRole.createdAt", "DESC")
        .where("masterRole.roleName ILIKE :q", { q: `%${keyword}%` });

      let total = await data.getCount();
      // data.offset((page - 1) * limit).limit(limit);
      // console.log(qb);
      if (searchDto.search) {
        if (total > 0) {
          data.select(["masterRole.roleName", "masterRole.id"]);
          return {
            data: await data.getMany(),
            total: total,
            // message: "Get All Role",
          };
        } else {
          return { data: [], message: "Role Not Get" };
        }
      } else {
        return { data: [], message: "Role Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllCategory(searchDto: SearchDto) {
    try {
      let keyword: string = searchDto.search || "";
      // const page = options.page || 1;
      // const limit = options.limit || 20;
      // const newSkill = await this.skillRepository.find();
      const data = this.jobCategoryRepository
        .createQueryBuilder("jobCategory")
        .orderBy("jobCategory.createdAt", "DESC")
        .where("jobCategory.categoryName ILIKE :q", { q: `%${keyword}%` });

      let total = await data.getCount();
      // data.offset((page - 1) * limit).limit(limit);
      // console.log(qb);
      if (searchDto.search) {
        if (total > 0) {
          data.select(["jobCategory.categoryName", "jobCategory.id"]);
          return {
            data: await data.getMany(),
            total: total,
            // message: "Get All Role",
          };
        } else {
          return { data: [], message: "Category Not Get" };
        }
      } else {
        return { data: [], message: "Category Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getState() {
    try {
      // let city: string = statedto.city || "";

      const statesList = worldMapData.getAllStatesFromCountry("India");

      const data = statesList.map((item) => {
        delete item.country_name;
        delete item.country_id;
        delete item.country_code;
        delete item.state_code;
        delete item.id;
        delete item.type;
        delete item.latitude;
        delete item.longitude;
        return item;
      });

      if (statesList.length > 0) {
        return { data: data, message: "Get All States" };
      } else {
        return { data: [], message: "State Not Found" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getCity(statedto: StateDto) {
    try {
      let state: string = statedto.state || "";

      const citysList = worldMapData.getAllCitiesFromState(`${state}`);

      const data = citysList.map((item) => {
        delete item.id;
        delete item.state_id;
        delete item.state_code;
        delete item.state_name;
        delete item.country_id;
        delete item.country_code;
        delete item.country_name;
        delete item.wikiDataId;
        delete item.latitude;
        delete item.longitude;
        return item;
      });

      if (citysList.length > 0) {
        return { data: citysList, message: "Get All City" };
      } else {
        return { data: [], message: "City Not Found" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllCompany() {
    try {
      const newCompany = await this.companyRepository.find();

      if (newCompany) {
        return {
          data: newCompany,
          message: "Get All Company",
        };
      } else {
        return { data: [], message: "Company Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
