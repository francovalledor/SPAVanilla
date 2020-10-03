import html from './index.html'
import css from './main.css'

import ctrl from './controllers';
import router from './routes'
import render from './utils/render'
import hrefListeners, { locationRequested } from './utils/listeners';
import Navbar from './templates/Navbar';
import API from './api/api';


// Agregar las rutas y sus controladores respectivos
// Cada ruta debe tener un controlador
// Cada controlador no puede manejar más de una ruta
// Los controladores deben retornar codigo html, si es necesario
// utilizar un template, es el controlador el encargado de llamar a este
router.addRoute('', ctrl.Home)
router.addRoute('/movie/<id>', ctrl.Movie)
router.addRoute('/person/<id>', ctrl.Person)
router.addRoute('/toprated', ctrl.TopRated)
router.addRoute('/popular', ctrl.Popular)
router.addRoute('/upcoming', ctrl.Upcoming)
router.addRoute('/search/<query>', ctrl.Search)


//Le decimos al render() cual es el contenedor de la app
var container = document.querySelector('#App')
render.setTarget(container)


function createNavbar() {
    document.querySelector('nav').innerHTML = Navbar()
}

async function onload() {

    createNavbar()

    //Cada vez que se dispare 'locationRequested' el router iniciará 
    document.addEventListener('locationRequested', event => {
        let html = router.router(event)
        render.render(html)
    })

    //Para poder utilizar los botones atrás y adelante
    window.onpopstate = event => {
        let html = router.router(null, true)
        render.render(html)
    }

    // Generamos un evento artificial para la carga inicial de la app
    // El router es llamado cada vez que se dispara un evento locationRequested
    // Este evento está atado a los elementos que tienen un atributo data-href
    // locationRequested.detail.location = window.location.pathname
    let html = router.router(null, true)
    render.render(html)
    hrefListeners()

    let busqueda = await API.Search.search('williams')
    debugger
}

window.addEventListener('load', event => {
    console.log('load');
    onload()
})

