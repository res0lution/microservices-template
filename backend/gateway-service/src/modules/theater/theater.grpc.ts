import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@teacinema/common'
import type { TheaterServiceClient } from '@teacinema/contracts/gen/ts/theater'
import { AbstractGrpcClient } from 'src/shared/grpc'

@Injectable()
export class TheaterClientGrpc extends AbstractGrpcClient<TheaterServiceClient> {
	constructor(@InjectGrpcClient('THEATER_PACKAGE') client: ClientGrpc) {
		super(client, 'TheaterService')
	}
}
