import { ExamenPreguntaControllerApi, settings } from "@/app/api-nathalie";

const apiExamenPregunta = new ExamenPreguntaControllerApi(settings)

export const getExamenPregunta = async (filtro) => {
    const { data: dataExamenPregunta } = await apiExamenPregunta.examenPreguntaControllerFind(filtro);
    return dataExamenPregunta
}

export const postExamenPregunta = async (objExamenPregunta) => {
    const { data: dataExamenPregunta } = await apiExamenPregunta.examenPreguntaControllerCreate(objExamenPregunta)
    return dataExamenPregunta
}

export const patchExamenPregunta = async (idExamenPregunta, objExamenPregunta) => {
    const { data: dataExamenPregunta } = await apiExamenPregunta.examenPreguntaControllerUpdateById(idExamenPregunta, objExamenPregunta)
    return dataExamenPregunta
}

export const deleteExamenPregunta = async (idExamenPregunta) => {
    const { data: dataExamenPregunta } = await apiExamenPregunta.examenPreguntaControllerDeleteById(idExamenPregunta)
    return dataExamenPregunta
}