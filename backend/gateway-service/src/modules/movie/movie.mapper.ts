import { timestampToISO } from '@teacinema/common'

export class MovieMapper {
	public static toMovie(entity: any) {
		if (!entity.releaseDate) return entity

		return {
			...entity,
			releaseDate: timestampToISO(entity.releaseDate)
		}
	}
}
