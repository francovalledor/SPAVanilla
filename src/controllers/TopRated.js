import MovieTemplate from '../templates/Movie';
import API from "../api/api"

let TopRated = async (vars) => {
    document.title = 'Top Rated Movies'
    let topRatedMovies = await API.Movies.getTopRated()

    let cards = ''

    topRatedMovies.forEach(movie => { cards += MovieTemplate(movie) });

    return `<div class="container mt-4">
    <h4 class="text-center">Top Rated Movies</h4>
    <div class="row cards-deck m-2">
    <div class="justify-content-center text-center card-group">    
    ${cards}
    </div>
    </div>
    </div>
    `
}

export default TopRated