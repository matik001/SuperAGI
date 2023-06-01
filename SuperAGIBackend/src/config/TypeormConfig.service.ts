import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvConfigService } from './EnvConfig.service';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
	constructor(private envConfigService: EnvConfigService) {}
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			...this.envConfigService.db,
			autoLoadEntities: true
		};
	}
}
