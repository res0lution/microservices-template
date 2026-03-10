import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PROTO_PATHS } from '@teacinema/contracts'

import { BookingClientGrpc } from '@/clients/booking.client'

import { RefundController } from './refund.controller'
import { RefundRepository } from './refund.repository'
import { RefundService } from './refund.service'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'BOOKING_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'booking.v1',
						protoPath: PROTO_PATHS.BOOKING,
						url: configService.getOrThrow<string>(
							'BOOKING_GRPC_URL'
						)
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	controllers: [RefundController],
	providers: [RefundService, RefundRepository, BookingClientGrpc]
})
export class RefundModule {}
