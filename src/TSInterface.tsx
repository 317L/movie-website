export interface IModalss {
  name: string;
  title: string;
  overview: string;
  tagline: JSX.Element;
  backdrop_path: string;
  poster_path: string;
  first_air_date: number;
  release_date: any;
  children: object;
  id: number;
  content: object;
  media_type: string;
}
export interface ICarousel {
  id: number;
  media_type: string;
}
export interface ICarouselo {
  id: number;
  media_type: string;
  profile_path: object;
  name: string;
}
export interface IModal {
  id: number;
  media_type: string;
  children: object;
}
export interface ISinglePage {
  title: string;
  poster: string;
  date: number;
  id: number;
  media_type: string;
  vote_average: number;
}
export interface IMovies {
  title: string;
  poster: string | number;
  date: number;
  media_type: string;
  vote_average: number;
  poster_path: string;
  first_air_date: number;
  release_date: number;
  id: number;
  name: string;
  imdb_id: number;
}

export interface ISearch {
  title: string;
  poster: string | number;
  date: number;
  id: number;
  media_type: string;
  vote_average: number;
  movies: object;
  poster_path: string;
  first_air_date: number;
  name: string;
  release_date: number;
  arr: number | string;
  idmb_id: number;
}

export interface IGenre {
  selectedGenres: any;
  setSelectedGenres: any;
  genres: any;
  setGenres: any;
  type: string;
  setPage: any;
}
export interface IfilterGenre {
  id: number;
  name: string;
  genre: any;
}
