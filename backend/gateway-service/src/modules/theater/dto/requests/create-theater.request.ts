import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTheaterRequest {
	@ApiProperty({
		example: 'Аврора'
	})
	@IsString()
	@IsNotEmpty()
	public name: string

	@ApiProperty({
		example: 'Ул. Белинского, д. 6'
	})
	@IsString()
	@IsNotEmpty()
	public address: string
}
