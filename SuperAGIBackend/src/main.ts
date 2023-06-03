import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as envConfig } from 'dotenv';
import { resolve } from 'path';
import { AppModule } from './app.module';
import { EnvConfigService } from './config/EnvConfig.service';

async function bootstrap() {
	if (process.env.NODE_ENV !== 'production') {
		envConfig({
			path: resolve('../', '.env')
		});
	}

	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Super shortener')
		.setDescription('This is api for SuperShortener')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs/api', app, document);

	// app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true
		})
	);

	const configService = app.get(EnvConfigService);
	await app.listen(configService.port, () => {
		console.log('Server started!');
	});
}
bootstrap();
