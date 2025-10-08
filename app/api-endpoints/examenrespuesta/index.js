import { ExamenRespuestaControllerApi, settings } from "@/app/api-nathalie";

const apiExamenRespuesta = new ExamenRespuestaControllerApi(settings);

export const getExamenRespuestas = async (filtro) => {
    const { data: dataRespuestas } = await apiExamenRespuesta.examenRespuestaControllerFind(filtro);
    return dataRespuestas
}

export const postExamenRespuesta = async (objRespuesta) => {
    const { data: dataRespuesta } = await apiExamenRespuesta.examenRespuestaControllerCreate(objRespuesta)
    return dataRespuesta
}

export const patchExamenRespuesta = async (idRespuesta, objRespuesta) => {
    const { data: dataRespuesta } = await apiExamenRespuesta.examenRespuestaControllerUpdateById(idRespuesta, objRespuesta)
    return dataRespuesta
}

export const deleteExamenRespuesta = async (idRespuesta) => {
    const { data: dataRespuesta } = await apiExamenRespuesta.examenRespuestaControllerDeleteById(idRespuesta)
    return dataRespuesta
}