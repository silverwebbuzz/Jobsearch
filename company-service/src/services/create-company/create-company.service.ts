import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyDto } from "src/dto/company.dto";
import { CompanyEntity } from "src/entities/company.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "src/dto/login.dto";
import { JwtPayload } from "src/interface/company.interface";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { OtpDto } from "src/dto/resendOtp.dto";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  public async create(companyDto: CompanyDto) {
    try {
      const newCompany = await this.companyRepository.create(companyDto);
      const salt = await bcrypt.genSalt();
      const encryptPassword = await bcrypt.hash(companyDto.password, salt);
      companyDto.password = encryptPassword;
      newCompany.password = companyDto.password;
      const otp = Math.floor(1000 + Math.random() * 9000);

      await this.mailerService.sendMail({
        to: companyDto.companyEmail, // list of receivers
        from: "ashish.swb1234@gmail.com", // sender address
        subject: "otp", // Subject line
        html: `${otp}`,

        // html: ', // HTML body content
      });
      newCompany.otp = otp;
      const randomId = Date.now().toString();
      const id = randomId + Math.floor(Math.random() * 10);
      newCompany.company_id = id;
      await this.companyRepository.save(newCompany);
      return { data: newCompany, message: "Register Successfully" };
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
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
        const isValidPassword = await bcrypt.compare(
          password,
          company.password
        );

        if (isValidPassword === false) {
          return { data: [], message: "Invalid credential" };
          // throw new UnauthorizedException('Invalid credential')
        } else {
          if (company.emailVerify === 1) {
            return {
              data: {
                token: await this.signUser({
                  companyName: company.companyName,
                  companyEmail: company.companyEmail,
                  companyPhone: company.companyPhone,
                }),
                company,
              },
              message: "Login Successfully",
            };
          } else {
            return { data: [], message: "Email Not Verified" };
          }
        }
      } else {
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
          return { data: company, message: "Otp Send Successfully" };
        } else {
          return { data: [], message: "Otp Not Send" };
        }
      } else {
        return { data: [], message: "Email Not Exits" };
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
          return { data: company, message: "Otp Verified" };
        } else {
          return { data: [], message: "Otp Not Send" };
        }
      } else {
        return { data: [], message: "Please Enter Correct Otp" };
      }
    } catch (err) {
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
