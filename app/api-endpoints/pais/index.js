import { PaisControllerApi, ProvinciaControllerApi, TipoIvaControllerApi, settings } from "@/app/api-nathalie";

const apiPais = new PaisControllerApi(settings)
const apiProvincia = new ProvinciaControllerApi(settings)
const apiTipoIva = new TipoIvaControllerApi(settings)


export const getPaises = async (filtro) => {
    const { data: dataPaises } = await apiPais.paisControllerFind(filtro)
    return dataPaises
}

export const getPaisesCount = async (filtro) => {
    const { data: dataPaises } = await apiPais.paisControllerCount(filtro)
    return dataPaises
}

export const getVistaPaisMonedaCount = async (filtro) => {
    const { data: dataPaises } = await apiPais.paisControllerVistaPaisMonedaCount(filtro)
    return dataPaises
}

export const getVistaPaisMoneda = async (filtro) => {
    const { data: dataPaises } = await apiPais.paisControllerVistaPaisMoneda(filtro)
    return dataPaises
}

export const postPais = async (objPais) => {
    try {
        const { data: dataPais } = await apiPais.paisControllerCreate(objPais)
        return dataPais

    } catch (error) {
        console.log(error)
    }
}

export const patchPais = async (idPais, objPais) => {
    const { data: dataPais } = await apiPais.paisControllerUpdateById(idPais, objPais)
    return dataPais
}

export const deletePais = async (idPais) => {
    const { data: dataPais } = await apiPais.paisControllerDeleteById(idPais)
    return dataPais
}
// Función para filtrar mediante ProvinciaControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscaProvinciaExistente = async (idPais) => {
    const { data: dataIdioma } = await apiProvincia.provinciaControllerFind(JSON.stringify(
        { where: { paisId: idPais } }
    ));
    return dataIdioma;
}

export const buscaTipoIvaExistente = async (idPais) => {
    const { data: dataIdioma } = await apiTipoIva.tipoIvaControllerFind(JSON.stringify(
        { where: { paisId: idPais } }
    ));
    return dataIdioma;
}
