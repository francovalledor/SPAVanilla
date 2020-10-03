import MovieTemplate from "./Movie"

const PersonTemplate = (person) => {
  let movies = ''
  person.movies.cast.forEach(movie => movies += MovieTemplate(movie))
  person.movies.crew.forEach(movie => movies += MovieTemplate(movie))


  const template = `
  <div class="row justify-content-center text-center m-2 p-2">
  <div class="card person-card mb-3">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="${person.profile}" class="card-img">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${person.name}</h5>
        <p class="card-text">${person.biography}</p>
        <p class="card-text">Birth: ${person.birthday} ${person.place_of_birth}</p>
      </div>
    </div>
  </div>
</div>
</div>
<div class="container">
    <h4 class="text-center">${person.name}'s movies</h4>
    <div class="row cards-deck m-2">
    <div class="justify-content-center text-center card-group">    
   ${movies}
    </div>
    </div>
    </div>
  `

  return template
}

export default PersonTemplate