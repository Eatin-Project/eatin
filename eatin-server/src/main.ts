import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const VerifyToken = require("./middleware/VerifyToken");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Todo: fix verify
  // app.use(VerifyToken);
  const port = 3001;
  await app.listen(port);
  console.log("Eatin server started listening on port " + port);
}

bootstrap();
