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
  media_type: any;
}
export interface ICarousel {
  id: number;
  media_type: number;
}

export interface IModal {
  id: number;
  media_type: any;
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
  numOfPages: number;
}

export interface IGenre {
  selectedGenres: any;
  setSelectedGenres: any;
  genres: any;
  setGenres: any;
  type: string;
  setPage: any;
  name: any;
  id: number;
}
