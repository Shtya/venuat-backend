import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggingValidationPipe } from 'common/translationPipe';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000
  // Get the ConfigService instance
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('ALLOWED_ORIGINS')?.split(',') || '*', // Allow specific origins or all
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
    allowedHeaders: 'Content-Type,Authorization,Accept-Language', // Allowed headers
    exposedHeaders: 'Content-Length,Content-Range', // Headers exposed to the client
  });



  app.setGlobalPrefix("api/v1")

  const loggingValidationPipe = app.get(LoggingValidationPipe);
  app.useGlobalPipes(loggingValidationPipe);
  
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages : false }))
  app.useStaticAssets(join(__dirname, '..', 'uploads'));


  Logger.log(`🚀 server is running on port ${port}`)
  
  await app.listen(port);
}
bootstrap();
