// A cada elemento que tenga un atributo data-href se le agrega un
// onclick listener, se debe llamar cada vez que se renderiza contenido

export let locationRequested = new CustomEvent('locationRequested', {
    bubbles: true,
    'detail': { location: '/' }
});

const hrefListeners = () => {
    let links = document.querySelectorAll('[data-href]')

    links.forEach(link => {
        link.style.cursor = 'pointer'
        link.addEventListener('click', event => {
            locationRequested.detail.location = event.target.dataset.href
            link.dispatchEvent(locationRequested)
        })

        link.addEventListener('touchend', event => {
            if (touchmoved != true) {
                locationRequested.detail.location = event.target.dataset.href
                link.dispatchEvent(locationRequested)
            }
        })
    })

    document.addEventListener('touchmove', e => window.touchmoved = true)
    document.addEventListener('touchstart', e => window.touchmoved = false)
}



export default hrefListeners