import { TipoParentescoControllerApi, FamiliaAcogidaMiembroControllerApi, settings } from "@/app/api-nathalie";

const apiTipoParentesco = new TipoParentescoControllerApi(settings)
const apiFamiliaAcogidaMiembro = new FamiliaAcogidaMiembroControllerApi(settings)

export const getTipoParentescos = async (filtro) => {
    const { data: dataTipoParentescos } = await apiTipoParentesco.tipoParentescoControllerFind(filtro)
    return dataTipoParentescos
}

export const getTipoParentescosCount = async (filtro) => {
    const { data: dataTipoParentescos } = await apiTipoParentesco.tipoParentescoControllerCount(filtro)
    return dataTipoParentescos
}

export const postTipoParentesco = async (objTipoParentesco) => {
    const { data: dataTipoParentesco } = await apiTipoParentesco.tipoParentescoControllerCreate(objTipoParentesco)
    return dataTipoParentesco
}

export const patchTipoParentesco = async (idTipoParentesco, objTipoParentesco) => {
    const { data: dataTipoParentesco } = await apiTipoParentesco.tipoParentescoControllerUpdateById(idTipoParentesco, objTipoParentesco)
    return dataTipoParentesco
}

export const deleteTipoParentesco = async (idTipoParentesco) => {
    const { data: dataTipoParentesco } = await apiTipoParentesco.tipoParentescoControllerDeleteById(idTipoParentesco)
    return dataTipoParentesco
}
// Función para filtrar FamiliaAcogidaControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
export const buscaFamiliaAcogidaMiebroExistente = async (idTipoParentesco) => {
    const { data: dataTipoParentesco } = await apiFamiliaAcogidaMiembro.familiaAcogidaMiembroControllerFind(JSON.stringify(
        { where: { parentescoId: idTipoParentesco } }
    ));
    return dataTipoParentesco;
}
