import { AlumnoAcompanyanteControllerApi, settings } from "@/app/api-nathalie";

const apiAlumnoAcompanyante = new AlumnoAcompanyanteControllerApi(settings);

export const getAlumnoAcompanyantes = async (filtro) => {
    const { data: dataAlumnoAcompanyantes } = await apiAlumnoAcompanyante.alumnoAcompanyanteControllerFind(filtro);
    return dataAlumnoAcompanyantes;
};

export const getAlumnoAcompanyantesCount = async (filtro) => {
    const { data: dataAlumnoAcompanyantes } = await apiAlumnoAcompanyante.alumnoAcompanyanteControllerCount(filtro);
    return dataAlumnoAcompanyantes;
};

export const postAlumnoAcompanyante = async (objAlumnoAcompanyante) => {
    const { data: dataAlumnoAcompanyante } = await apiAlumnoAcompanyante.alumnoAcompanyanteControllerCreate(objAlumnoAcompanyante);
    return dataAlumnoAcompanyante;
};

export const patchAlumnoAcompanyante = async (idAlumnoAcompanyante, objAlumnoAcompanyante) => {
    const { data: dataAlumnoAcompanyante } = await apiAlumnoAcompanyante.alumnoAcompanyanteControllerUpdateById(idAlumnoAcompanyante, objAlumnoAcompanyante);
    return dataAlumnoAcompanyante;
};

export const deleteAlumnoAcompanyante = async (idAlumnoAcompanyante) => {
    const { data: dataAlumnoAcompanyante } = await apiAlumnoAcompanyante.alumnoAcompanyanteControllerDeleteById(idAlumnoAcompanyante);
    return dataAlumnoAcompanyante;
};
