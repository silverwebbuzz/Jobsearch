import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeEditDto } from "src/dto/employee/employeeEdit.dto";
import { EmployeeDto } from "src/dto/employee/employee.dto";
import { EmployeeEntity } from "src/entities/employee/employee.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "src/dto/employee/login.dto";
import { JwtPayload } from "src/interface/employee.interface";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { CommonMethods } from "src/utilities/common-methods";
import { OtpDto } from "src/dto/employee/resendOtp.dto";

import { ChangePasswordDto } from "src/dto/employee/changePassword.dto";
import { emitWarning } from "process";
import { ResumeDto } from "src/dto/employee/resume.dto";
import { ProfileDto } from "src/dto/employee/profile.dto";
const base64ToImage = require("base64-to-image");

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
      const employee = await this.employeeRepository.findOne({
        where: [{ employeeEmail: employeeDto.employeeEmail }],
      });
      if (!employee) {
        const newEmployee = this.employeeRepository.create(employeeDto);
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
        return {
          data: newEmployee,
          status: 200,
          message: "Register Successfully",
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
          return { data: [], message: "Invalid credential", status: 402 };
        } else {
          if (employee.emailVerify === 1) {
            employee["lastLogin"] = new Date();
            employee.save();
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
              status: 200,
            };
          } else {
            return { data: [], message: "Email Not Verified", status: 400 };
          }
        }
      } else {
        return { data: [], message: "Email Not Exits", status: 401 };
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
      if (employee) {
        const data = await this.mailerService.sendMail({
          to: otpDto.employeeEmail, // list of receivers
          from: "ashish.swb1234@gmail.com", // sender address
          subject: "otp", // Subject line
          html: `${employee.otp}`,
          // html: ', // HTML body content
        });
        if (data) {
          return {
            data: employee,
            message: "Otp Send Successfully",
            status: 200,
          };
        } else {
          return { data: [], message: "Otp Not Send", status: 400 };
        }
      } else {
        return { data: [], message: "Email Not Exists", status: 400 };
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
          return { data: employee, message: "Otp Verified", status: 200 };
        } else {
          return { data: [], message: "Otp Not Send", status: 400 };
        }
      } else {
        return { data: [], message: "Please Enter Correct Otp", status: 400 };
      }
    } catch (err) {
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getEmployeeById(id: number) {
    try {
      const newEmployee = await this.employeeRepository.findOne({
        where: [{ id: id }],
      });
      if (newEmployee) {
        return {
          data: newEmployee,
          message: "Get Single Employee",
          status: 200,
        };
      } else {
        return { data: [], message: "Employee Not Get", status: 400 };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async ProfileUpload(id: number, profileDto: ProfileDto) {
    try {
      const base64Str = profileDto.file;
      const company = await this.employeeRepository.findOne({
        where: [{ id: id }],
      });
      if (company) {
        // if (!imageDto.file === null) {
        const path = "./uploads/employee/";
        const optionalObj = {
          fileName: profileDto.fileName || "",
          type: base64Str.split(";")[0].split("/")[1],
        };

        const imageInfo = base64ToImage(base64Str, path, optionalObj);

        const filePath = `http://192.168.1.113:5002/employee/uploads/employee/${imageInfo.fileName}`;

        company["profilePicture"] = filePath;

        await this.employeeRepository.save(company);
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

  public async employeeUpdate(id: number, employeeEditDto: EmployeeEditDto) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: [{ id: id }],
      });
      if (employee) {
        const updateEmployee = await this.employeeRepository.update(
          id,
          employeeEditDto
        );

        if (updateEmployee) {
          const newEmployee = await this.employeeRepository.findOne({
            where: [{ id: id }],
          });
          return { data: newEmployee, message: "Update Employee", status: 200 };
        } else {
          return { data: [], message: "Employee Not Update", status: 401 };
        }
      } else {
        return { data: [], message: "Employee Not Exists", status: 400 };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updatePassword(changePasswordDto: ChangePasswordDto) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: [{ employeeEmail: changePasswordDto.employeeEmail }],
      });
      if (employee) {
        const salt = await bcrypt.genSalt();
        const encryptPassword = await bcrypt.hash(
          changePasswordDto.password,
          salt
        );
        changePasswordDto.password = encryptPassword;

        employee["password"] = encryptPassword;

        // const updateEmployee = await this.employeeRepository.update(
        //   changePasswordDto.employeeEmail,
        //   (changePasswordDto.password = encryptPassword)
        // );
        await this.employeeRepository.save(employee);

        return {
          data: employee,
          status: 200,
          message: "Password Change Successfully",
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
      const employee = await this.employeeRepository.findOne({
        where: [{ employeeEmail: changePasswordDto.employeeEmail }],
      });
      // if (employee) {
      const data = await this.mailerService.sendMail({
        to: changePasswordDto.employeeEmail, // list of receivers
        from: "ashish.swb1234@gmail.com", // sender address
        subject: "Forgot Password", // Subject line
        html: `http://localhost:3000/create-password?emailId=${changePasswordDto.employeeEmail}`,
        // html: ', // HTML body content
      });
      if (data) {
        return { data: [], status: 200, message: "Mail Send Successfully" };
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
    const employee = await this.employeeRepository.findOne({
      where: [{ employeeEmail: changePasswordDto.employeeEmail }],
    });
    if (employee) {
      //  check password
      const isValidPassword = await bcrypt.compare(password, employee.password);
      if (isValidPassword === false) {
        return { data: [], message: "Old Password Is Wrong", status: 400 };
      } else {
        const salt = await bcrypt.genSalt();
        const encryptPassword = await bcrypt.hash(
          changePasswordDto.newPassword,
          salt
        );
        changePasswordDto.newPassword = encryptPassword;
        employee["password"] = encryptPassword;

        // const updateEmployee = await this.employeeRepository.update(
        //   changePasswordDto.employeeEmail,
        //   (changePasswordDto.password = encryptPassword)
        // );
        await this.employeeRepository.save(employee);
        return {
          data: employee,
          status: 200,
          message: "Password Change Successfully",
        };
      }
    } else {
      return { data: [], message: "Email Not Exits", status: 401 };
    }
  }

  public async resumeUpload(id: number, resumeDto: ResumeDto) {
    try {
      const base64Str = resumeDto.file;
      const employee = await this.employeeRepository.findOne({
        where: [{ id: id }],
      });

      if (resumeDto.file === null) {
        employee["resume"] = null;
        employee["resumeUploded"] = false;

        await this.employeeRepository.save(employee);

        return {
          data: employee,
          message: "Resume Delete Successfully",
          status: 400,
        };
      } else {
        if (employee) {
          // if (!resumeDto.file === null) {
          const path = "./uploads/resume/";
          const optionalObj = {
            fileName: resumeDto.fileName || "",
            type: base64Str.split(";")[0].split("/")[1],
          };

          const imageInfo = base64ToImage(base64Str, path, optionalObj);

          const filePath = `http://192.168.1.113:5002/employee/uploads/resume/${imageInfo.fileName}`;

          employee["resume"] = filePath;
          employee["resumeUploded"] = resumeDto.resumeUploded;

          await this.employeeRepository.save(employee);
          // const staticSkill = { staticSkillName: staticSkillName, logo: filePath };
          // this.staticSkillRepository.save(staticSkill);
          return {
            data: employee,
            message: "Resume Upload Successfully",
            status: 200,
          };
          // } else {
          //   employee["resumeUploded"] = resumeDto.resumeUploded;

          //   await this.employeeRepository.save(employee);
          //   // const staticSkill = { staticSkillName: staticSkillName, logo: filePath };
          //   // this.staticSkillRepository.save(staticSkill);
          //   return {
          //     data: employee,
          //     message: "Resume Upload Successfully",
          //     status: 200,
          //   };
          // }
        } else {
          return { data: [], message: "User Not Exits", status: 400 };
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
