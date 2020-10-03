import MovieTemplate from '../templates/Movie';
import API from "../api/api"
import Popular from './Popular';

let Home = async (vars) => {
    document.title = 'Home'
    let popularMovies = await API.Movies.getPopular()

    let cards = ''

    popularMovies.forEach(movie => { cards += MovieTemplate(movie) });

    return await Popular(vars)
}

export default Home