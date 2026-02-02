import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { CurrentUser, Protected } from 'src/shared/decorators'

import { CreateRefundRequest } from './dto'
import { RefundClientGrpc } from './refund.grpc'

@Controller('refunds')
export class RefundController {
	public constructor(private readonly refund: RefundClientGrpc) {}

	@ApiBearerAuth()
	@Protected()
	@Post()
	@HttpCode(HttpStatus.CREATED)
	public createRefund(
		@Body() dto: CreateRefundRequest,
		@CurrentUser() userId: string
	) {
		return this.refund.call('createRefund', {
			userId,
			...dto
		})
	}
}
