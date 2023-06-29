import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Environment } from "../env/environment";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //   {
  //   logger: ["log", "error", "warn", "debug", "verbose"],
  // });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix("company");

  const config = new DocumentBuilder()
    .setTitle("job-search-company")
    .setDescription("job-search-company - API Swagger")
    .setVersion("1.0.0")
    .addBearerAuth()
    // .setContact(
    //   "Simbiotik Technologies Sdn Bhd",
    //   "https://simbiotiktech.com",
    //   "parth.patel@simbiotiktech.com"
    // )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("company", app, document);

  app.listen(5001, "192.168.1.113", function () {
    console.log("Server running at http://192.168.1.116:5001/");
  });

  // app.listen(5001, "192.168.1.116", function () {
  //   console.log("Server running at http://192.168.1.116:5001/");
  // });
}
bootstrap();
