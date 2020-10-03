import API from "../api/api"
import PersonDetailTemplate from "../templates/Person"

export default async (vars) => {
    let {id} = vars
    let person = await (new API.Person(id)).getDetails()

    document.title = person.name
    return PersonDetailTemplate(person)
}
