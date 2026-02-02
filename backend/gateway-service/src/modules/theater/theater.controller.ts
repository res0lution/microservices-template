import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { Protected } from 'src/shared/decorators'
import { Role } from 'src/shared/guards'

import { CreateTheaterRequest } from './dto'
import { TheaterClientGrpc } from './theater.grpc'

@Controller('theaters')
export class TheaterController {
	public constructor(private readonly theater: TheaterClientGrpc) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll() {
		const response = await this.theater.call('listTheaters', {})

		return Array.isArray(response.theaters) ? response.theaters : []
	}

	// @Protected(Role.ADMIN)
	@Post()
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() dto: CreateTheaterRequest) {
		return await this.theater.call('createTheater', dto)
	}
}
