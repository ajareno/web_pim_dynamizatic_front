import { AlumnoCompanyeroControllerApi, settings } from "@/app/api-nathalie";

const apiAlumnoCompanyero = new AlumnoCompanyeroControllerApi(settings);

export const getAlumnoCompanyeros = async (filtro) => {
    const { data: dataAlumnoCompanyeros } = await apiAlumnoCompanyero.alumnoCompanyeroControllerFind(filtro);
    return dataAlumnoCompanyeros;
};

export const getAlumnoCompanyerosCount = async (filtro) => {
    const { data: dataAlumnoCompanyeros } = await apiAlumnoCompanyero.alumnoCompanyeroControllerCount(filtro);
    return dataAlumnoCompanyeros;
};

export const postAlumnoCompanyero = async (objAlumnoCompanyero) => {
    const { data: dataAlumnoCompanyero } = await apiAlumnoCompanyero.alumnoCompanyeroControllerCreate(objAlumnoCompanyero);
    return dataAlumnoCompanyero;
};

export const patchAlumnoCompanyero = async (idAlumnoCompanyero, objAlumnoCompanyero) => {
    const { data: dataAlumnoCompanyero } = await apiAlumnoCompanyero.alumnoCompanyeroControllerUpdateById(idAlumnoCompanyero, objAlumnoCompanyero);
    return dataAlumnoCompanyero;
};

export const deleteAlumnoCompanyero = async (idAlumnoCompanyero) => {
    const { data: dataAlumnoCompanyero } = await apiAlumnoCompanyero.alumnoCompanyeroControllerDeleteById(idAlumnoCompanyero);
    return dataAlumnoCompanyero;
};
