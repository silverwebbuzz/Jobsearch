import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Environment } from "../env/environment";
import * as bodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.enableCors({ allowedHeaders: "*", origin: "*" });
  //   {
  //   logger: ["log", "error", "warn", "debug", "verbose"],
  // });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix("employee");

  const config = new DocumentBuilder()
    .setTitle("job-search-employee")
    .setDescription("job-search-employee - API Swagger")
    .setVersion("1.0.0")
    .addBearerAuth()
    // .setContact(
    //   "Simbiotik Technologies Sdn Bhd",
    //   "https://simbiotiktech.com",
    //   "parth.patel@simbiotiktech.com"
    // )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("employee", app, document);
  app.listen(5002, "192.168.1.113", function () {
    console.log("Server running at http://192.168.1.116:5001/");
  });
  // await app.listen(5002);
}
bootstrap();
