import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MasterAdmin } from "src/entities/master/masterAdmin.entity";
import { MasterAdminDto } from "src/dto/master/masterAdmin.dto";
import { Repository } from "typeorm";
import { JwtPayload } from "src/interface/admin.interface";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/dto/master/login.dto";
import * as bcrypt from "bcryptjs";
import { MailerService } from "@nestjs-modules/mailer";
import { ChangePasswordDto } from "src/dto/changePassword.dto";

@Injectable()
export class MasterAdminService {
  constructor(
    @InjectRepository(MasterAdmin)
    private adminRepository: Repository<MasterAdmin>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  public async createAdmin(masterAdminDto: MasterAdminDto) {
    try {
      const admin = await this.adminRepository.findOne({
        where: [{ Email: masterAdminDto.Email }],
      });
      if (!admin) {
        const newAdmin = await this.adminRepository.create(masterAdminDto);
        const salt = await bcrypt.genSalt();
        const encryptPassword = await bcrypt.hash(
          masterAdminDto.password,
          salt
        );
        masterAdminDto.password = encryptPassword;
        newAdmin.password = masterAdminDto.password;
        if (newAdmin) {
          await this.adminRepository.save(newAdmin);
          return {
            data: newAdmin,
            message: "Create Master-Admin Successfully",
          };
        } else {
          return { data: [], message: "fail" };
        }
      } else {
        return { data: [], message: "Email Already Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async adminLogin(loginDto: LoginDto) {
    const password = loginDto.password;
    // const supplier = await this.companyRepository.findOne({
    //   where: [{ companyEmail: loginDto.companyEmail }],
    // });

    const admin = await this.adminRepository.findOne({
      where: [{ Email: loginDto.Email }],
    });
    if (admin) {
      //  check password
      const isValidPassword = await bcrypt.compare(password, admin.password);

      if (isValidPassword === false) {
        return { data: [], message: "Invalid credential" };
        // throw new UnauthorizedException('Invalid credential')
      } else {
        return {
          data: {
            token: await this.signUser({
              name: admin.name,
              Email: admin.Email,
            }),
            admin,
          },
          message: "Login Successfully",
        };
      }
    } else {
      return { data: [], message: "Email Not Exists" };
      // throw new UnauthorizedException('incorrect credentials');
    }
  }

  async signUser(company: JwtPayload): Promise<string> {
    return await this.jwtService.sign(company);
  }
  public async getAllAdmin() {
    try {
      const newDegree = await this.adminRepository.find();
      if (newDegree) {
        return { data: newDegree, message: "Get All Master-Admin" };
      } else {
        return { data: [], message: "Admin Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAdminById(id: number) {
    try {
      // const newSkill = await skillRepository.findOne(id);
      const newAdmin = await this.adminRepository.findOne({
        where: [{ id: id }],
      });
      if (newAdmin) {
        return { data: { admin: newAdmin }, message: "Get Single Admin" };
      } else {
        return { data: [], message: "Admin Not Get" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async AdminDelete(id: number) {
    try {
      const admin = await this.adminRepository.findOne({
        where: [{ id: id }],
      });
      if (admin) {
        const newAdmin = await this.adminRepository.delete(id);
        if (newAdmin) {
          return { data: [], message: "Delete Admin" };
        } else {
          return { data: [], message: "Admin Not Delete" };
        }
      } else {
        return { data: [], message: "Admin Not Exists" };
      }
      // const newSkill = await skillRepository.findOne(id);
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async adminUpdate(id: number, masterAdminDto: MasterAdminDto) {
    try {
      const admin = await this.adminRepository.findOne({
        where: [{ id: id }],
      });
      if (admin) {
        const updateAdmin = await this.adminRepository.update(
          id,
          masterAdminDto
        );

        if (updateAdmin) {
          const newAdmin = await this.adminRepository.findOne({
            where: [{ id: id }],
          });
          return { data: newAdmin, message: "Update Admin" };
        } else {
          return { data: [], message: "Admin Not Update" };
        }
      } else {
        return { data: [], message: "Admin Not Exists" };
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
      const admin = await this.adminRepository.findOne({
        where: [{ Email: changePasswordDto.Email }],
      });
      if (admin) {
        const salt = await bcrypt.genSalt();
        const encryptPassword = await bcrypt.hash(
          changePasswordDto.password,
          salt
        );
        changePasswordDto.password = encryptPassword;

        admin["password"] = encryptPassword;
        await this.adminRepository.save(admin);

        return {
          data: admin,
          message: "Password Change Successfully",
        };
      } else {
        return { data: [], message: "Email Not Exists" };
      }
    } catch (err) {
      console.log(err);
      return err;
      // throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async forgotPassword(changePasswordDto: ChangePasswordDto) {
    try {
      const admin = await this.adminRepository.findOne({
        where: [{ Email: changePasswordDto.Email }],
      });
      // if (employee) {
      const data = await this.mailerService.sendMail({
        to: changePasswordDto.Email, // list of receivers
        from: "ashish.swb1234@gmail.com", // sender address
        subject: "Forgot Password", // Subject line
        html: `http://localhost:3000/create-password?emailId=${changePasswordDto.Email}`,
        // html: ', // HTML body content
      });
      if (data) {
        return { data: [], message: "Mail Send Successfully" };
      } else {
        return { data: [], message: "Mail Not Send" };
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
    const admin = await this.adminRepository.findOne({
      where: [{ Email: changePasswordDto.Email }],
    });
    if (admin) {
      //  check password
      const isValidPassword = await bcrypt.compare(password, admin.password);

      if (isValidPassword === false) {
        return { data: [], message: "Invalid credential" };
        // throw new UnauthorizedException('Invalid credential')
      } else {
        const salt = await bcrypt.genSalt();
        const encryptPassword = await bcrypt.hash(
          changePasswordDto.newPassword,
          salt
        );
        changePasswordDto.newPassword = encryptPassword;

        admin["password"] = encryptPassword;

        // const updateEmployee = await this.employeeRepository.update(
        //   changePasswordDto.employeeEmail,
        //   (changePasswordDto.password = encryptPassword)
        // );

        await this.adminRepository.save(admin);

        return {
          data: admin,
          status: 200,
          message: "Password Change Successfully",
        };
      }
    } else {
      return { data: [], message: "Email Not Exits" };
    }
  }
}
