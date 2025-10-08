import { ExamenRespuestaNivelControllerApi, settings } from "@/app/api-nathalie";

const apiExamenRespuestaNivel = new ExamenRespuestaNivelControllerApi(settings)

export const getExamenRespuestaNivel = async (filtro) => {
    const { data: dataExamenRespuestaNivel } = await apiExamenRespuestaNivel.examenRespuestaNivelControllerFind(filtro);
    return dataExamenRespuestaNivel
}

export const getVistaExamenRespuestaNivel = async (filtro) => {
    const { data: dataExamenRespuestaNivel } = await apiExamenRespuestaNivel.examenRespuestaNivelControllerVistaExamenNivelIdioma(filtro);
    return dataExamenRespuestaNivel
}

export const getVistaExamenRespuestaNivelCount = async (filtro) => {
    const { data: dataExamenRespuestaNivel } = await apiExamenRespuestaNivel.examenRespuestaNivelControllerVistaExamenNivelIdiomaCount(filtro);
    return dataExamenRespuestaNivel
}


export const postExamenRespuestaNivel = async (objExamenRespuestaNivel) => {
    const { data: dataExamenRespuestaNivel } = await apiExamenRespuestaNivel.examenRespuestaNivelControllerCreate(objExamenRespuestaNivel)
    return dataExamenRespuestaNivel
}

export const patchExamenRespuestaNivel = async (idExamenRespuestaNivel, objExamenRespuestaNivel) => {
    const { data: dataExamenRespuestaNivel } = await apiExamenRespuestaNivel.examenRespuestaNivelControllerUpdateById(idExamenRespuestaNivel, objExamenRespuestaNivel)
    return dataExamenRespuestaNivel
}

export const deleteExamenRespuestaNivel = async (idExamenRespuestaNivel) => {
    const { data: dataExamenRespuestaNivel } = await apiExamenRespuestaNivel.examenRespuestaNivelControllerDeleteById(idExamenRespuestaNivel)
    return dataExamenRespuestaNivel
}