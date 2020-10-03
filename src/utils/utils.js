export const fetchJSON = async URL => {
    let datos = await fetch(URL)
    datos = await datos.json()
    return datos
}