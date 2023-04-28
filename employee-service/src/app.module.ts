import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Environment } from "../env/environment";
import { EmployeeEntity } from "./entities/employee.entity";
import { JwtModule } from "@nestjs/jwt";
import { EmployeeService } from "./services/create-employee/create-employee.service";
import { EmployeeController } from "./controller/employee/employee.controller";
import { MailerModule } from '@nestjs-modules/mailer';
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
  controllers: [AppController, EmployeeController],
  providers: [AppService, EmployeeService],
})
export class AppModule {}
