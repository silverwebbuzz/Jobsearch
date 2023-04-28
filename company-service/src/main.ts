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

  await app.listen(5001);
}
bootstrap();

// import { ValidationPipe } from "@nestjs/common";
// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";

// import { Environment } from "../env/environment";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   // , {
//   //   logger: ["log", "error", "warn", "debug", "verbose"],
//   // });
//   // app.enableCors();
//   // app.useGlobalPipes(new ValidationPipe({ transform: true }));
//   // app.setGlobalPrefix("user");

//   await app.listen(5500);
// }
// bootstrap();
