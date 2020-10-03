import hrefListeners from "./listeners"

class Render {
    //target is the html element where the content will be rendered
    constructor(target=null) {
        this.target = target || document.body
    }

    setTarget(target){
        this.target = target
    }

    async render(html){
        this.target.innerHTML = await html
        hrefListeners()
        window.scrollTo(0,0)
    }
}

var render = new Render(document.body)

export default render