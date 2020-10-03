import MovieTemplate from '../templates/Movie';
import API from "../api/api"

let Upcoming = async (vars) => {
    document.title = 'Upcoming Movies'
    let upcomingMovies = await API.Movies.getUpcoming()

    let cards = ''

    upcomingMovies.forEach(movie => { cards += MovieTemplate(movie) });

    return `<div class="container mt-4">
    <h4 class="text-center">Upcoming Movies</h4>
    <div class="row cards-deck m-2">
    <div class="justify-content-center text-center card-group">    
    ${cards}
    </div>
    </div>
    </div>
    `
}

export default Upcoming