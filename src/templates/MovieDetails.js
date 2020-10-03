import CharacterTemplate from "./Character";

const MovieDetailsTemplate = (movie) => {
  let characters = ''
  movie.cast.forEach(character => { 
    characters += CharacterTemplate(character)
  });

  let genres = ''
  let director = movie.crew.filter(crew => crew.job==='Director')[0].name
  movie.genres.forEach(genre => { genres += `  ${genre}  `})
  const template = `
  <div class="row justify-content-center text-center m-2 p-2">
  <div class="card mb-3 movie-details-card">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${movie.poster}" class="card-img">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">${movie.overview}</p>
        <p class="card-text">Genres: ${genres} </p>
        <p class="card-text">Director: ${director} </p>
      </div>
    </div>
  </div>
</div>
</div>
<div class="container">
<h4 class="text-center">Cast</h4>

    <div class="row cards-deck m-2">
    <div class="justify-content-center text-center card-group">    
    ${characters}
    </div>
    </div>
</div>
  `

  return template
}

export default MovieDetailsTemplate