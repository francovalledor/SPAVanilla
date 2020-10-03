import {Movie} from '../api/api';
import MovieDetailsTemplate from '../templates/MovieDetails';

export default async (vars) => {
    let {id} = vars
    let movie  = await Movie.get(id)
    document.title = movie.title
    return MovieDetailsTemplate(movie)
}