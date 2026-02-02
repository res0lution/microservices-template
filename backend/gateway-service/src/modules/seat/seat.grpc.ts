import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@teacinema/common'
import type { SeatServiceClient } from '@teacinema/contracts/gen/ts/seat'
import { AbstractGrpcClient } from 'src/shared/grpc'

@Injectable()
export class SeatClientGrpc extends AbstractGrpcClient<SeatServiceClient> {
	constructor(@InjectGrpcClient('SEAT_PACKAGE') client: ClientGrpc) {
		super(client, 'SeatService')
	}
}
