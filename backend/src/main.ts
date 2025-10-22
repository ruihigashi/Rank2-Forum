import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000; // 環境変数から使用ポートを取得

  app.enableCors({
    origin: 'https://rank2-forum.onrender.com',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  })

  // console.log(`Listening on port ${port}, host 0.0.0.0`);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
