import { Module } from '@nestjs/common'
import { GrpcModule } from '@teacinema/common'

import { ScreeningController } from './screening.controller'
import { ScreeningClientGrpc } from './screening.grpc'

@Module({
	imports: [GrpcModule.register(['SCREENING_PACKAGE'])],
	controllers: [ScreeningController],
	providers: [ScreeningClientGrpc]
})
export class ScreeningModule {}
