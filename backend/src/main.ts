import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // CORS Configuration
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', 'http://localhost:5173'),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  
  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  // API Prefix
  const apiPrefix = configService.get('API_PREFIX', 'api');
  app.setGlobalPrefix(apiPrefix);
  
  // Server Port
  const port = configService.get('PORT', 3000);
  await app.listen(port);
  
  console.log(`🚀 Server running on: http://localhost:${port}/${apiPrefix}`);
}
bootstrap();
