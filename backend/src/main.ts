import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Security & performance middlewares
  app.use(helmet());
  app.use(compression());

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

  app.useGlobalFilters(new HttpExceptionFilter());
  
  // API Prefix
  const apiPrefix = configService.get('API_PREFIX', 'api');
  app.setGlobalPrefix(apiPrefix);
  
  // Swagger (dev only)
  if (configService.get('NODE_ENV', 'development') !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('UserPost API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document);
  }

  // Server Port
  const port = configService.get('PORT', 3000);
  await app.listen(port);
  
  console.log(`🚀 Server running on: http://localhost:${port}/${apiPrefix}`);
}
bootstrap();
