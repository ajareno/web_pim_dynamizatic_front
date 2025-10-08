import { IdiomaControllerApi, ExamenControllerApi, MensajePlantillaControllerApi, NivelIdiomaControllerApi, TraduccionControllerApi, settings } from "@/app/api-nathalie";

const apiIdioma = new IdiomaControllerApi(settings)
const apiMensajePlantilla = new MensajePlantillaControllerApi(settings)
const apiTraduccion = new TraduccionControllerApi(settings)

export const getIdiomas = async (filtro) => {
    const { data: dataIdiomas } = await apiIdioma.idiomaControllerFind(filtro)
    return dataIdiomas
}
export const getIdioma = async (filtro) => {
    const { data: dataIdiomas } = await apiIdioma.idiomaControllerFindById(filtro)
    return dataIdiomas
}
export const getIdiomasCount = async (filtro) => {
    const { data: dataIdiomas } = await apiIdioma.idiomaControllerCount(filtro)
    return dataIdiomas
}

export const postIdioma = async (objIdioma) => {
    try {
        const { data: dataIdioma } = await apiIdioma.idiomaControllerCreate(objIdioma)
        return dataIdioma

    } catch (error) {
        console.log(error)
    }
}

export const patchIdioma = async (idIdioma, objIdioma) => {
    const { data: dataIdioma } = await apiIdioma.idiomaControllerUpdateById(idIdioma, objIdioma)
    return dataIdioma
}

export const deleteIdioma = async (idIdioma) => {
    const { data: dataIdioma } = await apiIdioma.idiomaControllerDeleteById(idIdioma)
    return dataIdioma
}
// Función para filtrar mediante ExamenControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos devolverá un array en la que cada posición contiene toda la información del objeto con cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscarExamenExistente = async (idIdioma) => {
    const { data: dataIdioma } = await apiExamen.examenControllerFind(JSON.stringify(
        { where: { idiomaId: idIdioma } }
    ));
    return dataIdioma;
}

export const buscarMensajePlantillaExistente = async (idIdioma) => {
    const { data: dataIdioma } = await apiMensajePlantilla.mensajePlantillaControllerFind(JSON.stringify(
        { where: { idiomaId: idIdioma } }
    ));
    return dataIdioma;
}

export const buscarNivelIdiomaExistente = async (idIdioma) => {
    const { data: dataIdioma } = await apiNivelIdioma.nivelIdiomaControllerFind(JSON.stringify(
        { where: { idiomaId: idIdioma } }
    ));
    return dataIdioma;
}

export const buscarTraduccionExistente = async (idIdioma) => {
    const { data: dataIdioma } = await apiTraduccion.traduccionControllerFind(JSON.stringify(
        { where: { idiomaId: idIdioma } }
    ));
    return dataIdioma;
}
