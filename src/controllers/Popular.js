import MovieTemplate from '../templates/Movie';
import API from "../api/api"

let Popular = async (vars) => {
    document.title = 'Popular Movies'

    let popularMovies = await API.Movies.getPopular()

    let cards = ''

    popularMovies.forEach(movie => { cards += MovieTemplate(movie) });

    return `<div class="container mt-4">
    <h4 class="text-center">Popular Movies</h4>
    <div class="row cards-deck m-2">
    <div class="justify-content-center text-center card-group">    
    ${cards}
    </div>
    </div>
    </div>
    `
}

export default Popular