import router from "../routes"
import Person from '../controllers/PersonDetail';

const CharacterTemplate = (character) => {
  const template = `
  <!-- Card -->
  <div class="card promoting-card m-2 shadow-sm character-card"  style="min-width: 15rem;">
  <!-- Card content -->
  <div class="card-body d-flex flex-row text-center">
    <!-- Content -->
    <div>
      <!-- Title -->
      <h4 class="card-title font-weight-bold mb-2" data-href=${router.urlFor(Person, {id: character.personID})}>${character.name}</h4>
      <!-- Subtitle -->
      <p class="card-text">${character.character?('como '+ character.character):''}</p>
    </div>
  </div>

  <!-- Card image -->
  <div class="view overlay">
    <img data-href="${router.urlFor(Person, {id: character.personID})}"
      class="card-img-top rounded-0"
      src="${character.profile}"
      alt="is ${character.character}"
    />
  </div>
</div>
<!-- Card -->
  `

  return template
}

export default CharacterTemplate