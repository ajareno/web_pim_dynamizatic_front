import { ProvinciaControllerApi, PoblacionControllerApi, CodigoPostalControllerApi, settings } from "@/app/api-nathalie";

const apiProvincia = new ProvinciaControllerApi(settings)
const apiPoblacion = new PoblacionControllerApi(settings)
const apiCodigoPostal = new CodigoPostalControllerApi(settings)

export const getPoblaciones = async () => {
    const { data: dataPoblaciones } = await apiPoblacion.poblacionControllerFind()
    return dataPoblaciones
}

export const getPoblacion = async (id) => {
    const { data: dataPoblaciones } = await apiPoblacion.poblacionControllerFindById(id)
    return dataPoblaciones
}

export const postPoblacion = async (objPoblacion) => {
    const { data: dataPoblacion } = await apiPoblacion.poblacionControllerCreate(objPoblacion)
    return dataPoblacion
}

export const patchPoblacion = async (idPoblacion, objPoblacion) => {
    const { data: dataPoblacion } = await apiPoblacion.poblacionControllerUpdateById(idPoblacion, objPoblacion)
    return dataPoblacion
}

export const deletePoblacion = async (idPoblacion) => {
    const { data: dataPoblacion } = await apiPoblacion.poblacionControllerDeleteById(idPoblacion)
    return dataPoblacion
}

export const getVistaPoblacionProvincia = async (filtro) => {
    const { data: dataPoblacion } = await apiPoblacion.poblacionControllerVistaPoblacionProvincia(filtro)
    return dataPoblacion
}

export const getVistaPoblacionProvinciaCount = async (filtro) => {
    const { data: dataPoblacion } = await apiPoblacion.poblacionControllerVistaPoblacionProvinciaCount(filtro)
    return dataPoblacion
}

export const getProvincia = async () => {
    const { data: dataPoblacion } = await apiProvincia.provinciaControllerFind()
    return dataPoblacion
}
// Función para filtrar mediante CodigoPostalControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
export const buscaCodigoPostalExistente = async (idPoblacion) => {
    const { data: dataPoblacion } = await apiCodigoPostal.codigoPostalControllerFind(JSON.stringify(
        { where: { poblacionId: idPoblacion } }
    ));
    return dataPoblacion;
}