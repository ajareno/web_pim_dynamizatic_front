import { AlumnoExamenControllerApi, settings } from "@/app/api-nathalie";

const apiAlumnoExamen = new AlumnoExamenControllerApi(settings);

export const getAlumnoExamenes = async (filtro) => {
  const { data: dataAlumnoExamenes } = await apiAlumnoExamen.alumnoExamenControllerFind(filtro);
  return dataAlumnoExamenes;
};

export const getAlumnoExamenesCount = async (filtro) => {
  const { data: dataAlumnoExamenes } = await apiAlumnoExamen.alumnoExamenControllerCount(filtro);
  return dataAlumnoExamenes;
};

export const postAlumnoExamen = async (objAlumnoExamen) => {
  const { data: dataAlumnoExamen } = await apiAlumnoExamen.alumnoExamenControllerCreate(objAlumnoExamen);
  return dataAlumnoExamen;
};

export const patchAlumnoExamen = async (idAlumnoExamen, objAlumnoExamen) => {
  const { data: dataAlumnoExamen } = await apiAlumnoExamen.alumnoExamenControllerUpdateById(idAlumnoExamen, objAlumnoExamen);
  return dataAlumnoExamen;
};

export const deleteAlumnoExamen = async (idAlumnoExamen) => {
  const { data: dataAlumnoExamen } = await apiAlumnoExamen.alumnoExamenControllerDeleteById(idAlumnoExamen);
  return dataAlumnoExamen;
};
