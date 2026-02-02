import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@teacinema/common'
import type { MovieServiceClient } from '@teacinema/contracts/gen/ts/movie'
import { AbstractGrpcClient } from 'src/shared/grpc'

@Injectable()
export class MovieClientGrpc extends AbstractGrpcClient<MovieServiceClient> {
	constructor(@InjectGrpcClient('MOVIE_PACKAGE') client: ClientGrpc) {
		super(client, 'MovieService')
	}
}
