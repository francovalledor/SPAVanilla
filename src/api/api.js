import { API_KEY } from './key'
import { fetchJSON } from '../utils/utils'

const API_BASE_URL = 'https://api.themoviedb.org/3'


export class Movie {
    constructor(movie) {
        this.scraped = false
        this.id = movie.id
        this.title = movie.title
        this.overview = movie.overview
        this.vote = movie.vote_average
        this.date = movie.release_date
        this.original_language = movie.original_language
        this.original_title = movie.original_title
        this.popularity = movie.popularity
        this.poster = Picture.getURL(movie.poster_path)
        this.backdrop = Picture.getURL(movie.backdrop_path)
    }

    toString(){
        return this.title
    }

    static async get(id) {
        /**
         * Get a movie with details
         */
            const endPoint = `/movie/${id}?api_key=${API_KEY}&language=en&append_to_response=credits%2Cimages`

            let movie = await fetchJSON(API_BASE_URL + endPoint)
            let newMovie = new Movie(movie)
            newMovie.runtime = movie.runtime
            newMovie.genres = movie.genres.map(({name}) => name)
            newMovie.cast = movie.credits.cast.map(character => new Character(character))
            newMovie.crew = movie.credits.crew.map(crew => new Crew(crew))

            newMovie.images= {
                backdrops : movie.images.backdrops.map(image => Picture.getURL(image)),
                posters : movie.images.posters.map(image => Picture.getURL(image))
            }
            
            newMovie.scraped = true

            return newMovie
    }

    async getDetails() {
        /**
         * Get all movie details
         */

        if (!this.scraped)
        {
            const endPoint = `/movie/${this.id}?api_key=${API_KEY}&language=en&append_to_response=credits%2Cimages`
            
            let details = await fetchJSON(API_BASE_URL + endPoint)
            
            this.runtime = details.runtime
            this.genres = details.genres.map(({name}) => name)
            this.cast = details.credits.cast.map(character => new Character(character))
            this.crew = details.credits.crew.map(crew => new Crew(crew))

            this.images= {
                backdrops : details.images.backdrops.map(image => Picture.getURL(image)),

                posters : details.images.posters.map(image => Picture.getURL(image))
            }
            
            this.scraped = true
        }

        return this
    }
    
    async getCast() {
        /**
         * get movie cast
         * DEPRECATED: now included in getDetails() 
         */

        const endPoint = `/movie/${this.id}/credits?api_key=${API_KEY}`
        
        let cast = await fetchJSON(API_BASE_URL + endPoint)
        
        cast = cast.cast
        
        return cast
    }
    
    async getImages() {
        /**
         * get movie images
         * DEPRECATED: now included in getDetails()
         */
        const endPoint = `/movie/${this.id}/credits?api_key=${API_KEY}`
        
        let cast = await fetchJSON(API_BASE_URL + endPoint)
        
        cast = cast.cast
        
        return cast
    }
}

class Movies {
      
    static async search(query, page=1){
        const endPoint = `/search/movie?api_key=${API_KEY}&language=en&query=${query}&page=${page}&include_adult=false`
    
        let resultados = await fetchJSON(API_BASE_URL + endPoint)
        resultados = resultados.results.map(movie => new Movie(movie))
        return resultados
    }

    static async getUpcoming(page=1) {
        const endPoint = `/movie/upcoming?api_key=${API_KEY}&language=en&page=${page}`
    
        let upcomingMovies = await fetchJSON(API_BASE_URL + endPoint)
        upcomingMovies = upcomingMovies.results.map(movie => new Movie(movie))
        return upcomingMovies
    }
    
    static async getTopRated(page=1) {
        const endPoint = `/movie/top_rated?api_key=${API_KEY}&language=en&page=${page}`
    
        let topRatedMovies = await fetchJSON(API_BASE_URL + endPoint)
        topRatedMovies = topRatedMovies.results.map(movie => new Movie(movie))
        return topRatedMovies
    }

    static async getPopular(page=1) {
        const endPoint = `/movie/popular?api_key=${API_KEY}&language=en&page=${page}`
    
        let popularMovies = await fetchJSON(API_BASE_URL + endPoint)
        popularMovies = popularMovies.results.map(movie => new Movie(movie))
        return popularMovies
    }
}

class Search {
    static async search(query, page=1){
        let endPoint = `/search/movie?api_key=${API_KEY}&language=en&query=${query}&page=${page}&include_adult=false`
        let movies = await fetchJSON(API_BASE_URL + endPoint)
        movies = movies.results.map(movie => new Movie(movie))

        endPoint = `/search/person?api_key=${API_KEY}&language=en&query=${query}&page=${page}&include_adult=false`
        let persons = await fetchJSON(API_BASE_URL + endPoint)
        persons = persons.results.map(person => new Person(person))
        return {movies, persons}
    }
}

class Character {
    constructor(character) {
        this.name = character.name
        this.character = character.character
        this.profile = Picture.getURL(character.profile_path)
        this.personID = character.id
    }
}

class Crew{
    constructor(crew) {
        this.name = crew.name
        this.job = crew.job
        this.profile = Picture.getURL(crew.profile_path)
        this.personID = crew.id
        this.department = crew.department
    }
}

export class Person {
    /**
     * Person, cast or crew
     * to obtain all data must call getDetails()
     */

    constructor(ID) {
        this.id = ID
        this.scraped = false
    }
    async getDetails() {
        /**
         * Get all person details (character or crew)
         */
        if (!this.scraped) {
            const endPoint = `/person/${this.id}?api_key=${API_KEY}&language=en&append_to_response=images%2Cmovie_credits`
        
            let person = await fetchJSON(API_BASE_URL + endPoint)
            
            this.name = person.name
            this.birthday = person.birthday
            this.deathday = person.deathday
            this.profile = Picture.getURL(person.profile_path)
            this.place_of_birth = person.place_of_birth
            this.popularity = person.popularity
            this.biography = person.biography
    
            if (person.gender === 1) {
                this.gender = 'F'
            }
    
            if (person.gender === 2) {
                this.gender = 'M'
            }

            this.images = {
                profiles : person.images.profiles.map(image => Picture.getURL(image.file_path))
            }
            
            this.movies = {
                cast : person.movie_credits.cast.map(movie => new Movie(movie)),
                crew : person.movie_credits.crew.map(movie => new Movie(movie)),    
            }

            this.scraped = true
        }

        return this
    }
    
    async getMovies() {
        /**
         * get person movies
         * DEPRECATED: included in getDetails()
         */

        const endPoint = `/person/${this.id}/movie_credits?api_key=${API_KEY}&language=en`
    
        let person = await fetchJSON(API_BASE_URL + endPoint)
    
        return person
    }
}

export class Picture {
    static getURL (imageName) {
        let imageURL
        if (imageName){
            imageURL =  `https://image.tmdb.org/t/p/original${imageName}`
        } else {
            imageURL = 'http://lorempixel.com/g/626/939/abstract/'
        }
        return imageURL
    } 
}

let API = { Movies, Movie, Person, Character, Picture, Search }

export default API