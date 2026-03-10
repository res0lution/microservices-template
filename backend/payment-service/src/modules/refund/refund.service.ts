import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { RpcStatus } from '@teacinema/common'
import type {
	CreateRefundRequest,
	ProcessRefundEventRequest
} from '@teacinema/contracts/gen/ts/refund'
import { CurrencyEnum, YookassaService } from 'nestjs-yookassa'
import { lastValueFrom } from 'rxjs'

import { BookingClientGrpc } from '@/clients/booking.client'

import { RefundRepository } from './refund.repository'

@Injectable()
export class RefundService {
	public constructor(
		private readonly repository: RefundRepository,
		private readonly yookassaService: YookassaService,
		private readonly bookingClient: BookingClientGrpc
	) {}

	public async createRefund(data: CreateRefundRequest) {
		const { userId, bookingId } = data

		const payment = await this.repository.findPaymentByBookingId(bookingId)

		if (!payment || payment.userId !== userId)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Payment not found'
			})

		const refund = await this.repository.createRefund({
			amount: payment.amount,
			payment: {
				connect: {
					id: payment.id
				}
			}
		})

		const yk = await this.yookassaService.refunds.create({
			// @ts-ignore
			amount: {
				value: payment.amount,
				currency: CurrencyEnum.RUB
			},
			payment_id: payment.providerId!
		})

		await this.repository.updateRefund(refund.id, {
			providerId: yk.id
		})

		return { ok: true }
	}

	public async processEvent(data: ProcessRefundEventRequest) {
		const { event, providerRefundId, status } = data

		const refund =
			await this.repository.findRefundByProviderId(providerRefundId)

		if (!refund)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Refund not found'
			})

		if (event === 'refund.succeeded') {
			try {
				await this.repository.markRefundSuccess(refund.id)
				await this.repository.markPaymentRefunded(refund.paymentId)

				await lastValueFrom(
					this.bookingClient.cancelBooking({
						bookingId: refund.payment.bookingId,
						userId: refund.payment.userId
					})
				)

				return { ok: true }
			} catch (error) {
				throw new RpcException({
					code: RpcStatus.INTERNAL,
					details: 'Failed to process refund'
				})
			}
		}
	}
}
