import Movie from '../controllers/Movie';
import router from '../routes';
import CharacterTemplate from '../templates/Character';

const MovieTemplate = (movie) => {
  const template = `
  <div class="card m-2 movie-card" style="min-width: 15rem;">
    <img class="card-img-top" data-href="${router.urlFor(Movie, movie)}" src="${movie.poster}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">${movie.overview.slice(0,100)}...</p>
    </div>
  </div>
  `
  
  return template

}

export default MovieTemplate