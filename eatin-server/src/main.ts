import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const VerifyToken = require("./middleware/VerifyToken");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Todo: fix verify
  // app.use(VerifyToken);
  await app.listen(3001);
}

bootstrap();
