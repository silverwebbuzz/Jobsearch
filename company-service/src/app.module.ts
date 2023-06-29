import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Environment } from "../env/environment";
import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CompanyController } from "./controller/company/company.controller";
import { CompanyService } from "./services/create-company/create-company.service";
import { CompanyEntity } from "./entities/company/company.entity";
import { masterSkill } from "./entities/master/masterSkill.entity";
import { CompanyJobPreferenceEntity } from "./entities/company/company-jobpreference.entity";
import { JobPreferenceController } from "./controller/jobPreference/jobPreference.controller";
import { JobService } from "./services/company-jobpreference/company-jobpreference.service";
import { MasterRole } from "./entities/master/masterRole.entity";
import { JobCategory } from "./entities/master/jobCategory.entity";
import { BalanceTokenEntity } from "./entities/balanceToken.entity";
import { BalanceTokenService } from "./services/balanceToken/balanceToken.service";
import { BalanceTokenController } from "./controller/balanceToken/balanceToken.controller";
import { EmployeeService } from "./services/employee/employee.service";
import { EmployeeController } from "./controller/employee/employee.controller";
import { EmployeeEntity } from "./entities/employee/employee.entity";
import { JobApplyEntity } from "./entities/company/jobApply.entity";
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
    TypeOrmModule.forFeature([CompanyEntity]),
    TypeOrmModule.forFeature([masterSkill]),
    TypeOrmModule.forFeature([MasterRole]),
    TypeOrmModule.forFeature([JobCategory]),
    TypeOrmModule.forFeature([CompanyJobPreferenceEntity]),
    TypeOrmModule.forFeature([BalanceTokenEntity]),
    TypeOrmModule.forFeature([EmployeeEntity]),
    TypeOrmModule.forFeature([JobApplyEntity]),
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
    CompanyController,
    JobPreferenceController,
    BalanceTokenController,
    EmployeeController,
  ],
  providers: [
    AppService,
    CompanyService,
    JobService,
    BalanceTokenService,
    EmployeeService,
  ],
})
export class AppModule {}
