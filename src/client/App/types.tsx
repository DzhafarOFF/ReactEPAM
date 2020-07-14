export type MoviesApiData = {
	id: number
	title: string
	tagline: string
	vote_average: number
	vote_count: number
	release_date: string
	poster_path: string
	overview: string
	budget: number
	revenue: number
	genres: string[]
	runtime: number
};

export type MappedMoviesData = {
	id: number
	key: number
	title: string
	genres: string[]
	releaseDate: string
	imageURL: string
	rating: number
	description: string
	runtime: number
};
