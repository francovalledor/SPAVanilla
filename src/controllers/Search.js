import API from "../api/api"

let Search = async (vars) => {
        const {query} = vars

        const busqueda = await API.Search.search(query)

        const {movies, persons} = busqueda

        console.log(movies, persons)
        
        return '<h1> SEARCH </h1>'

}

export default Search