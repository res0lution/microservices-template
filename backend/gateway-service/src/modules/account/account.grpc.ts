import { Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'
import { InjectGrpcClient } from '@teacinema/common'
import type { AccountServiceClient } from '@teacinema/contracts/gen/ts/account'
import { AbstractGrpcClient } from 'src/shared/grpc'

@Injectable()
export class AccountClientGrpc extends AbstractGrpcClient<AccountServiceClient> {
	constructor(@InjectGrpcClient('ACCOUNT_PACKAGE') client: ClientGrpc) {
		super(client, 'AccountService')
	}
}
