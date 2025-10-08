import { AlumnoTutorControllerApi, settings } from "@/app/api-nathalie";

const apiAlumnoTutor = new AlumnoTutorControllerApi(settings);

export const getAlumnoTutores = async (filtro) => {
    const { data: dataAlumnoTutores } = await apiAlumnoTutor.alumnoTutorControllerFind(filtro);
    return dataAlumnoTutores;
};

export const getAlumnoTutoresCount = async (filtro) => {
    const { data: dataAlumnoTutores } = await apiAlumnoTutor.alumnoTutorControllerCount(filtro);
    return dataAlumnoTutores;
};

export const postAlumnoTutor = async (objAlumnoTutor) => {
    const { data: dataAlumnoTutor } = await apiAlumnoTutor.alumnoTutorControllerCreate(objAlumnoTutor);
    return dataAlumnoTutor;
};

export const patchAlumnoTutor = async (idAlumnoTutor, objAlumnoTutor) => {
    const { data: dataAlumnoTutor } = await apiAlumnoTutor.alumnoTutorControllerUpdateById(idAlumnoTutor, objAlumnoTutor);
    return dataAlumnoTutor;
};

export const deleteAlumnoTutor = async (idAlumnoTutor) => {
    const { data: dataAlumnoTutor } = await apiAlumnoTutor.alumnoTutorControllerDeleteById(idAlumnoTutor);
    return dataAlumnoTutor;
};
