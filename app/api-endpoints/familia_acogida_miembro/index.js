import { FamiliaAcogidaMiembroControllerApi, settings } from "@/app/api-nathalie";
const apiFamiliaAcogidaMiembro = new FamiliaAcogidaMiembroControllerApi(settings)

export const getFamiliaAcogidaMiembros = async (filtro) => {
    const { data: dataFamiliaAcogidaMiembros } = await apiFamiliaAcogidaMiembro.familiaAcogidaMiembroControllerFind(filtro)
    return dataFamiliaAcogidaMiembros
}

export const getFamiliaAcogidaMiembrosCount = async (filtro) => {
    const { data: dataFamiliaAcogidaMiembros } = await apiFamiliaAcogidaMiembro.familiaAcogidaMiembroControllerCount(filtro)
    return dataFamiliaAcogidaMiembros
}

export const postFamiliaAcogidaMiembro = async (objFamiliaAcogidaMiembro) => {
    const { data: dataFamiliaAcogidaMiembro } = await apiFamiliaAcogidaMiembro.familiaAcogidaMiembroControllerCreate(objFamiliaAcogidaMiembro)
    return dataFamiliaAcogidaMiembro
}

export const patchFamiliaAcogidaMiembro = async (idFamiliaAcogidaMiembro, objFamiliaAcogidaMiembro) => {
    const { data: dataFamiliaAcogidaMiembro } = await apiFamiliaAcogidaMiembro.familiaAcogidaMiembroControllerUpdateById(idFamiliaAcogidaMiembro, objFamiliaAcogidaMiembro)
    return dataFamiliaAcogidaMiembro
}

export const deleteFamiliaAcogidaMiembro = async (idFamiliaAcogidaMiembro) => {
    const { data: dataFamiliaAcogidaMiembro } = await apiFamiliaAcogidaMiembro.familiaAcogidaMiembroControllerDeleteById(idFamiliaAcogidaMiembro)
    return dataFamiliaAcogidaMiembro
}

export const getVistaFamiliaAcogidaMiembroParentescoCount = async (filtro) => {
    const { data: dataFamiliaAcogidaMiembros } = await apiFamiliaAcogidaMiembro.familiaAcogidaMiembroControllerVistaFamiliaAcogidaMiembroParentescoCount(filtro)
    return dataFamiliaAcogidaMiembros
}

export const getVistaFamiliaAcogidaMiembroParentesco = async (filtro) => {
    const { data: dataFamiliaAcogidaMiembros } = await apiFamiliaAcogidaMiembro.familiaAcogidaMiembroControllerVistaFamiliaAcogidaMiembroParentesco(filtro)
    return dataFamiliaAcogidaMiembros
}