import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { Environment } from "../env/environment";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix("master");

  const config = new DocumentBuilder()
    .setTitle("job-search-master")
    .setDescription("job-search-master - API Swagger")
    .setVersion("1.0.0")
    .addBearerAuth()
    // .setContact(
    //   "Simbiotik Technologies Sdn Bhd",
    //   "https://simbiotiktech.com",
    //   "parth.patel@simbiotiktech.com"
    // )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("master", app, document);

  await app.listen(5003);
}
bootstrap();
