import { ConfigService } from '@nestjs/config'
import { PassportOptions } from '@teacinema/passport'

export function getPassportConfig(
	configService: ConfigService
): PassportOptions {
	return {
		secretKey: configService.getOrThrow<string>('PASSPORT_SECRET_KEY')
	}
}
