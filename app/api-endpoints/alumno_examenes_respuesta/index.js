import { AlumnoExamenesRespuestaControllerApi, settings } from "@/app/api-nathalie";

const api = new AlumnoExamenesRespuestaControllerApi(settings);

export const getAlumnoExamenRespuestas = async (filtro) => {
  const { data } = await api.alumnoExamenesRespuestaControllerFind(filtro);
  return data;
};

export const postAlumnoExamenRespuesta = async (obj) => {
  const { data } = await api.alumnoExamenesRespuestaControllerCreate(obj);
  return data;
};

export const deleteAlumnoExamenRespuesta = async (id) => {
  const { data } = await api.alumnoExamenesRespuestaControllerDeleteById(id);
  return data;
};
