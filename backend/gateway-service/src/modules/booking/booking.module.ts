import { Global, Module } from '@nestjs/common'
import { GrpcModule } from '@teacinema/common'

import { BookingController } from './booking.controller'
import { BookingClientGrpc } from './booking.grpc'

@Global()
@Module({
	imports: [GrpcModule.register(['BOOKING_PACKAGE'])],
	controllers: [BookingController],
	providers: [BookingClientGrpc],
	exports: [BookingClientGrpc]
})
export class BookingModule {}
