import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { skillController } from "./controller/master/skillController";
import { masterSkill } from "./entities/masterSkill.entity";
import { masterSkillService } from "./services/master/master-Skill.service";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Environment } from "../env/environment";
import { roleController } from "./controller/master/role.controller";
import { degreeController } from "./controller/master/degree.controller";
import { MasterDegreeService } from "./services/master/master-Degree.service";
import { MasterRoleService } from "./services/master/master-Role.service";
import { MasterRole } from "./entities/masterRole.entity";
import { MasterDegree } from "./entities/masterDegree.entity";
import { MasterAdmin } from "./entities/masterAdmin.entity";
import { adminController } from "./controller/master/admin.controller";
import { MasterAdminService } from "./services/master/master-Admin.service";
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
    HttpModule,
  ],
  controllers: [
    AppController,
    skillController,
    roleController,
    degreeController,
    adminController,
  ],
  providers: [
    AppService,
    masterSkillService,
    MasterDegreeService,
    MasterRoleService,
    MasterAdminService,
  ],
})
export class AppModule {}
