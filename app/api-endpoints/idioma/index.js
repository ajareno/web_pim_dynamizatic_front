import { IdiomaControllerApi, MensajePlantillaControllerApi, settings } from "@/app/api-nathalie";

const apiIdioma = new IdiomaControllerApi(settings)
const apiMensajePlantilla = new MensajePlantillaControllerApi(settings)

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

export const buscarMensajePlantillaExistente = async (idIdioma) => {
    const { data: dataIdioma } = await apiMensajePlantilla.mensajePlantillaControllerFind(JSON.stringify(
        { where: { idiomaId: idIdioma } }
    ));
    return dataIdioma;
}

