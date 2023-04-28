import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Environment } from '../env/environment';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
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
      // logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
