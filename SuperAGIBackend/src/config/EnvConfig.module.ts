import { Module } from '@nestjs/common';
import { EnvConfigService } from './EnvConfig.service';

@Module({
	providers: [EnvConfigService],
	exports: [EnvConfigService]
})
export class EnvConfigModule {}
