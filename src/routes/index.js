import ctrls from '../controllers';
import { Movie, Person } from '../api/api';

const regExpVariableNameGlobal = /(<[a-zA-Z\_][a-zA-Z0-9\_]*>)/g
const regExpRoutePart = /([a-zA-Z0-9\-\_]+)/


class Route {
    /**
     * A single route for router
     */
    constructor(route) {
        if (! this.__validate(route)) {
            throw new Error('invalid Route')
        }
        if (route && route.endsWith('/')) {
            route = route.slice(0, -1)
        }

        this.route = route
        this.variableNames = []

        let matchs = this.route.match(regExpVariableNameGlobal);
        if (matchs) {
            matchs.forEach(match => {
                let varName = match.slice(1, -1)
                this.variableNames.push(varName)
            })
        }

        this.createRegex()
    }

    createRegex() {
        //create a regex for the route
        this.regex = this.route
        this.variableNames.forEach(varname => this.regex = this.regex.replace(`<${varname}>`, regExpRoutePart.source))
        this.regex = `^${this.regex}/?$`
        this.regex = RegExp(this.regex)
    }

    match(requestedRoute) {
        if (requestedRoute) {
            if (requestedRoute.endsWith('/')) {
                requestedRoute = requestedRoute.slice(0, -1)
            }
            return this.regex.test(requestedRoute)
        }
        return null
    }

    getVars(requestedRoute) {
        let vars = {}
        if (this.match(requestedRoute)) {

            let values = this.regex.exec(requestedRoute)

            for (let i = 0; i < this.variableNames.length; i++) {
                vars[this.variableNames[i]] = values[i + 1];
            }
        }

        return vars
    }

    urlFor(vars){
        /**
         * generate a route for the given vars
         * eg. 
         *      vars {var1 : 'foo', var2 : 'bar'}
         *      this.route = '/user/<var1>/post/<var2>'
         *      return '/user/foo/post/bar'
         */

         let result = this.route

        this.variableNames.forEach(
            varName => {
                result = result.replace(`<${varName}>`, vars[varName])
            })

        return result
    }

    __validate(route) {
        const re = /^(\/[a-zA-Z0-9\-\_]+|\/<[a-zA-Z\_][a-zA-Z0-9\_]*>)*\/?$/

        return re.test(route)
    }
}

class Router {
    /**
     * Class for handling routes
     * -------------------------------------------------
     * - order matters:
     *      e.g. 
     *          rt.addRoute('/user/<userID>', ctrlr) //will match first
     *          rt.addRoute('/user/add', ctrlr2)  //ctrl2 never will never be called
     *
     *  - route first char must be a slash
     * - variable routes must be: 
     *      /fixed/<variablename>/otherfixed
     *      /fixed/<variablename>/otherfixed/<variablename2>
     *      e.g.: /user/<username>/posts/<postID>
     * 
     * -variableName must be a valid js variable name
     * 
     * -variable must fill all route piece:
     *      valid: /user/<username>/posts/<postID>
     *      not valid:  /user/ID<username>/
     * 
     * -variable content can be "_" , "-" and any alphanumeric char 
     * 
     * -variable content can't include slashes:
     *      Route: /user/<username>/posts/<postID>
     *      Does not match: /user/John/FK/posts/131
     *      Match: /user/John/posts/131     
     *      Match: /user/John-FK/posts/131
     *      Match: /user/John_FK/posts/131
     * 
     *  - routes '/user' and '/user/' are the same route
     * 
     *  - controller must be unique for each route
     * 
     *  validation regex: "^(\/[a-zA-Z0-9\-\_]+|\/<[a-zA-Z\_][a-zA-Z0-9\_]*>)*\/?$"
     */

    
    constructor(mountPath) {
        this.mountPath = mountPath || ''
        if (this.mountPath.endsWith('/')) {
            this.mountPath = this.mountPath.slice(0,-1)
        }
        
        this.routes = []
    }

    router(event, popstate=false){
        /**
         * callback for location change
         */
        let newLocation;
        if (popstate) {
            newLocation = window.location.pathname     
         } else {
             newLocation = event.detail.location
             const state = {newLocation}
             const title = newLocation
             const url = newLocation
             window.history.pushState(state, title, url)
         }

        let response = this.resolveRoute(newLocation) || this.notFound()
        return response
    }

    addRoute(route, controller) {
        this.checkForDuplicates(controller)

        this.routes.push({
            route: new Route(route),
            controller: controller
        })
    }

    checkForDuplicates(controller){
        this.routes.forEach(
            route => {
                if (route.controller === controller) {
                    throw new Error('Duplicate controller')
                }
            }
        )
    }

    resolveRoute(requestedRoute) {
        const regex = RegExp(`^${this.mountPath}`)
        requestedRoute = requestedRoute.replace(regex,'')

        let existsRoute = false
        let i = 0
        while ((!existsRoute) && ( i < this.routes.length)){
            let currentRoute = this.routes[i]
            if (currentRoute.route.match(requestedRoute)) {
                let vars = currentRoute.route.getVars(requestedRoute)
                return currentRoute.controller(vars)

            }
            i++
        }

        return null
    }

    urlFor(controller, vars={}) {
        let existsController = false
        let resultUrl = ''
        let i = 0
        while (!existsController && (i < this.routes.length)) {
            let currentRoute = this.routes[i]
            if (currentRoute.controller === controller) {
                existsController = true
                resultUrl = currentRoute.route.urlFor(vars)
            }
            i++
        }

        if (!existsController) {
            throw new Error('this controller was not found in routes')
        }
        return this.mountPath + resultUrl + '/'
    }

    notFound(){
        return 'The page you are looking for was not found'
    }
}

var router = new Router('/movies')

export default router