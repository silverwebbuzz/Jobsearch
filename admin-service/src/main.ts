import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { Environment } from "../env/environment";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // , {
  //   logger: ["log", "error", "warn", "debug", "verbose"],
  // });
  // app.enableCors();
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.setGlobalPrefix("user");

  await app.listen(5000);
}
bootstrap();
