import Home from "../controllers/Home"
import router from "../routes"
import ctrl from '../controllers';

const NavbarTemplate = () => {
    const template = `
    <a class="navbar-brand" data-href="${router.urlFor(Home)}">Home</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" data-href="${router.urlFor(ctrl.TopRated)}">Top Rated</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-href="${router.urlFor(ctrl.Upcoming)}">Upcoming</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" data-href="${router.urlFor(ctrl.Popular)}">Popular</a>
      </li>
      </ul>
    </div>
  `
  
    return template
  }
  
  export default NavbarTemplate