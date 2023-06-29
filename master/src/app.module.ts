import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { skillController } from "./controller/master/skill.controller";
import { masterSkill } from "./entities/master/masterSkill.entity";
import { masterSkillService } from "./services/master/master-Skill.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Environment } from "../env/environment";
import { roleController } from "./controller/master/role.controller";
import { degreeController } from "./controller/master/degree.controller";
import { MasterDegreeService } from "./services/master/master-Degree.service";
import { MasterRoleService } from "./services/master/master-Role.service";
import { MasterRole } from "./entities/master/masterRole.entity";
import { MasterDegree } from "./entities/master/masterDegree.entity";
import { MasterAdmin } from "./entities/master/masterAdmin.entity";
import { adminController } from "./controller/master/admin.controller";
import { MasterAdminService } from "./services/master/master-Admin.service";
import { Token } from "./entities/token/token.entity";
import { TokenController } from "./controller/token/token.controller";
import { TokenService } from "./services/token/token.service";
import { JobCategory } from "./entities/master/jobCategory.entity";
import { CategoryController } from "./controller/master/jobCategory.controller";
import { CategoryService } from "./services/master/jobCategory.service";
import { JwtModule } from "@nestjs/jwt";
import { JobPreferenceController } from "./controller/company/jobPreference/jobPreference.controller";
import { CompanyController } from "./controller/company/company/company.controller";
import { JobService } from "./services/company/company-jobpreference/company-jobpreference.service";
import { CompanyService } from "./services/company/create-company/create-company.service";
import { CompanyJobPreferenceEntity } from "./entities/company/company-jobpreference.entity";
import { CompanyEntity } from "./entities/company/company.entity";
import { EmployeeController } from "./controller/employee/employee.controller";
import { EmployeeService } from "./services/employee/employee.service";
import { EmployeeEntity } from "./entities/employee/employee.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: Environment.postgres.host,
      port: parseInt(Environment.postgres.port),
      username: Environment.postgres.username,
      password: Environment.postgres.password,
      database: Environment.postgres.database,
      // ssl: {
      //   ca: Environment.postgres.cert,
      // },
      autoLoadEntities: true,
      synchronize: true,
      entities: [],
      // logging: true,
    }),
    TypeOrmModule.forFeature([masterSkill]),
    TypeOrmModule.forFeature([MasterDegree]),
    TypeOrmModule.forFeature([MasterRole]),
    TypeOrmModule.forFeature([MasterAdmin]),
    TypeOrmModule.forFeature([Token]),
    TypeOrmModule.forFeature([JobCategory]),
    TypeOrmModule.forFeature([CompanyEntity]),
    TypeOrmModule.forFeature([CompanyJobPreferenceEntity]),
    TypeOrmModule.forFeature([EmployeeEntity]),
    HttpModule,
    JwtModule.register({
      secret: "my-super-secret",
    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          service: Environment.mail.service,
          auth: {
            user: Environment.mail.user,
            pass: Environment.mail.pass,
          },
          // defaults: {
          //   from: '<sendgrid_from_email_address>'
          // },

          // host: 'umwtw01.toyota.com.my',
          // port: 25,
          // secure: false,
          // auth: {
          //   user: 'gpd@toyota.com.my',
          //   pass: 'gpd87655',
          // },
          // tls: {
          //   rejectUnauthorized: false,
          // },
        },
        // defaults: {
        //   from: '<sendgrid_from_email_address>'
        // },
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [
    AppController,
    skillController,
    roleController,
    degreeController,
    adminController,
    TokenController,
    CategoryController,
    CompanyController,
    JobPreferenceController,
    EmployeeController,
  ],
  providers: [
    AppService,
    masterSkillService,
    MasterDegreeService,
    MasterRoleService,
    MasterAdminService,
    TokenService,
    CategoryService,
    CompanyService,
    JobService,
    EmployeeService,
  ],
})
export class AppModule {}
