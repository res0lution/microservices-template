import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import type { GetAllCategoriesResponse } from '@teacinema/contracts/gen/ts/category'

import { CategoryService } from './category.service'

@Controller()
export class CategoryController {
	public constructor(private readonly categoryService: CategoryService) {}

	@GrpcMethod('CategoryService', 'GetAllCategories')
	public async getAll(): Promise<GetAllCategoriesResponse> {
		return await this.categoryService.getAll()
	}
}
