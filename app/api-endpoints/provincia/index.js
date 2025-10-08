import { ProvinciaControllerApi, PaisControllerApi, PoblacionControllerApi, settings } from "@/app/api-nathalie";

const apiProvincia = new ProvinciaControllerApi(settings)
const apiPais = new PaisControllerApi(settings)
const apiPoblacion = new PoblacionControllerApi(settings)


export const getProvincias = async () => {
    const { data: dataProvincias } = await apiProvincia.provinciaControllerFind()
    return dataProvincias
}

export const getProvincia = async (filtro) => {
    const { data: dataProvincias } = await apiProvincia.provinciaControllerFindById(filtro)
    return dataProvincias
}

export const postProvincia = async (objProvincia) => {
    const { data: dataProvincia } = await apiProvincia.provinciaControllerCreate(objProvincia)
    return dataProvincia
}

export const patchProvincia = async (idProvincia, objProvincia) => {
    const { data: dataProvincia } = await apiProvincia.provinciaControllerUpdateById(idProvincia, objProvincia)
    return dataProvincia
}

export const deleteProvincia = async (idProvincia) => {
    const { data: dataProvincia } = await apiProvincia.provinciaControllerDeleteById(idProvincia)
    return dataProvincia
}

export const getVistaProvinciaPais = async (filtro) => {
    const { data: dataProvincia } = await apiProvincia.provinciaControllerVistaProvinciaPais(filtro)
    return dataProvincia
}

export const getVistaProvinciaPaisCount = async (filtro) => {
    const { data: dataProvincia } = await apiProvincia.provinciaControllerVistaProvinciaPaisCount(filtro)
    return dataProvincia
}

export const getPais = async () => {
    const { data: dataProvincia } = await apiPais.paisControllerFind()
    return dataProvincia
}
// Función para filtrar mediante PoblacionControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
export const buscaPoblacionExistente = async (idProvincia) => {
    const { data: dataProvincia } = await apiPoblacion.poblacionControllerFind(JSON.stringify(
        { where: { provinciaId: idProvincia } }
    ));
    return dataProvincia;
}
