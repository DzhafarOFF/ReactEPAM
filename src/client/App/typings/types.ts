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
	key: number
	title: string
	genres: string[]
	releaseDate: string
	imageURL: string
	rating: number
	description: string
	runtime: number
};

export type Movie = {
	action?: (e: Movie) => void
	id?: number
	key?: number
	title: string
	genres: string[]
	releaseDate: string
	imageURL: string
	rating: number
	description?: string
	display?: string
	runtime?: number
};
export type SearchQuery = {
	input: string
	filterOption: string
};

export type FetchMoviesState = {
	movies: Movie[]
	pending: boolean
};
export type CurrentMovie = Movie | null;

export interface AppState {
	fetchMovies: FetchMoviesState
	searchQuery: SearchQuery
	showCurrentMovie: boolean
	currentMovie: CurrentMovie
}
