import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Environment } from "../env/environment";
import { EmployeeEntity } from "./entities/employee/employee.entity";
import { JwtModule } from "@nestjs/jwt";
import { EmployeeService } from "./services/create-employee/create-employee.service";
import { EmployeeController } from "./controller/employee/employee.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JobPreferenceController } from "./controller/jobPreference/jobPreference.controller";
import { JobService } from "./services/company-jobpreference/company-jobpreference.service";
import { CompanyJobPreferenceEntity } from "./entities/company/company-jobpreference.entity";
import { JobApplyEntity } from "./entities/employee/jobApply.entity";
import { CompanyEntity } from "./entities/company/company.entity";
import { JobCategory } from "./entities/master/jobCategory.entity";
import { MasterRole } from "./entities/master/masterRole.entity";
import { MasterDegree } from "./entities/master/masterDegree.entity";
import { masterSkill } from "./entities/master/masterSkill.entity";
import { MasterIndustries } from "./entities/master/masterIndustries.entity";
import { CategoryController } from "./controller/master/jobCategory.controller";
import { skillController } from "./controller/master/skill.controller";
import { roleController } from "./controller/master/role.controller";
import { degreeController } from "./controller/master/degree.controller";
import { masterSkillService } from "./services/master/master-Skill.service";
import { MasterDegreeService } from "./services/master/master-Degree.service";
import { CategoryService } from "./services/master/jobCategory.service";
import { MasterRoleService } from "./services/master/master-Role.service";
import { MasterIndustriesService } from "./services/master/masterIndustries.service";
import { MasterIndustriesController } from "./controller/master/masterIndustries.controller";

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
    TypeOrmModule.forFeature([EmployeeEntity]),
    TypeOrmModule.forFeature([CompanyJobPreferenceEntity]),
    TypeOrmModule.forFeature([JobApplyEntity]),
    TypeOrmModule.forFeature([CompanyEntity]),
    TypeOrmModule.forFeature([masterSkill]),
    TypeOrmModule.forFeature([MasterDegree]),
    TypeOrmModule.forFeature([MasterRole]),
    TypeOrmModule.forFeature([JobCategory]),
    TypeOrmModule.forFeature([MasterIndustries]),
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
    EmployeeController,
    JobPreferenceController,
    CategoryController,
    skillController,
    roleController,
    MasterIndustriesController,
    degreeController,
  ],
  providers: [
    AppService,
    EmployeeService,
    JobService,
    masterSkillService,
    MasterDegreeService,
    CategoryService,
    MasterIndustriesService,
    MasterRoleService,
  ],
})
export class AppModule {}
