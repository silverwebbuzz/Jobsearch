import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeDto } from "src/dto/employee.dto";
import { EmployeeEntity } from "src/entities/employee.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "src/dto/login.dto";
import { JwtPayload } from "src/interface/employee.interface";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { CommonMethods } from "src/utilities/common-methods";
import { OtpDto } from "src/dto/resendOtp.dto";
import { emitWarning } from "process";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  public async create(employeeDto: EmployeeDto) {
    try {
      const newEmployee = await this.employeeRepository.create(employeeDto);
      const salt = await bcrypt.genSalt();
      const encryptPassword = await bcrypt.hash(employeeDto.password, salt);
      employeeDto.password = encryptPassword;
      newEmployee.password = employeeDto.password;
      const otp = Math.floor(1000 + Math.random() * 9000);

      await this.mailerService.sendMail({
        to: employeeDto.employeeEmail, // list of receivers
        from: "ashish.swb1234@gmail.com", // sender address
        subject: "otp", // Subject line
        html: `${otp}`,

        // html: ', // HTML body content
      });
      newEmployee.otp = otp;
      const randomId = Date.now().toString();
      const id = randomId + Math.floor(Math.random() * 10);
      newEmployee.employee_id = id;
      await this.employeeRepository.save(newEmployee);
      return { data: newEmployee, message: "Register Successfully" };
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async employeeLogin(loginDto: LoginDto) {
    const password = loginDto.password;
    // const supplier = await this.companyRepository.findOne({
    //   where: [{ companyEmail: loginDto.companyEmail }],
    // });
    if (await this.isValidateUser(loginDto)) {
      const employee = await this.employeeRepository.findOne({
        where: [{ employeeEmail: loginDto.employeeEmail }],
      });
      if (employee) {
        //  check password
        const isValidPassword = await bcrypt.compare(
          password,
          employee.password
        );

        if (isValidPassword === false) {
          return { data: [], message: "Invalid credential" };
          // throw new UnauthorizedException('Invalid credential')
        } else {
          if (employee.emailVerify === 1) {
            return {
              data: {
                token: await this.signUser({
                  firstName: employee.firstName,
                  lastName: employee.lastName,
                  employeeEmail: employee.employeeEmail,
                  employeePhone: employee.employeePhone,
                }),
                employee,
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
  async signUser(employee: JwtPayload): Promise<string> {
    return await this.jwtService.sign(employee);
  }

  public async resendOTP(otpDto: OtpDto) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: [{ employeeEmail: otpDto.employeeEmail }],
      });

      const data = await this.mailerService.sendMail({
        to: otpDto.employeeEmail, // list of receivers
        from: "ashish.swb1234@gmail.com", // sender address
        subject: "otp", // Subject line
        html: `${employee.otp}`,
        // html: ', // HTML body content
      });
      if (data) {
        return { data: employee, message: "Otp Send Successfully" };
      } else {
        return { data: [], message: "Otp Not Send" };
      }
    } catch (err) {
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async verifyOTP(otpDto: OtpDto) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: [{ employeeEmail: otpDto.employeeEmail, otp: otpDto.otp }],
      });
      if (employee) {
        const data = await this.mailerService.sendMail({
          to: otpDto.employeeEmail, // list of receivers
          from: "ashish.swb1234@gmail.com", // sender address
          subject: "otp", // Subject line
          html: `${employee.otp}`,

          // html: ', // HTML body content
        });
        employee.emailVerify = 1;
        employee.save();
        if (data) {
          return { data: employee, message: "Otp Verified" };
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
