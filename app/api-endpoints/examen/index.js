import { ExamenControllerApi, settings } from "@/app/api-nathalie";

const apiExamen = new ExamenControllerApi(settings)

export const getExamenes = async () => {
    const { data: dataExamen } = await apiExamen.examenControllerFind()
    return dataExamen
}

export const getExamenById = async (idExamen) => {
    const { data: dataExamen } = await apiExamen.examenControllerFindById(idExamen);
    return dataExamen;
};

export const getExamenesCount = async (filtro) => {
    const { data: dataExamen } = await apiExamen.examenControllerCount(filtro)
    return dataExamen
}

export const getExamenesCountFiltro = async (filtro) => {
    const { data: dataExamen } = await apiExamen.examenControllerCountFiltroExamen(filtro)
    return dataExamen
}

export const getExamenesIdiomas = async (filtro) => {
    const { data: dataExamen } = await apiExamen.examenControllerVistaExamenIdioma(filtro)
    return dataExamen
}

export const postExamen = async (objExamen) => {
    const { data: dataExamen } = await apiExamen.examenControllerCreate(objExamen)
    return dataExamen
}

export const patchExamen = async (idExamen, objExamen) => {
    const { data: dataExamen } = await apiExamen.examenControllerUpdateById(idExamen, objExamen)
    return dataExamen
}

export const deleteExamen = async (idExamen) => {
    const { data: dataExamen } = await apiExamen.examenControllerDeleteById(idExamen)
    return dataExamen
}

export const getVistaExamenExamenPreguntasRespuestas = async (filter) => {
    const { data: dataExamen } = await apiExamen.examenControllerVistaExamenExamenPreguntasRespuestas(filter);
    return dataExamen;
};

export const getCountVistaExamenExamenPreguntasRespuestas = async (where) => {
    const { data: dataExamen } = await apiExamen.examenControllerCountVistaExamenExamenPreguntasRespuestas(where);
    return dataExamen; // devuelve el count directo
};
