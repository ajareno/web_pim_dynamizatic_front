import { FamiliaAcogidaHabitacionControllerApi, settings } from "@/app/api-nathalie";
const apiFamiliaAcogidaHabitacion = new FamiliaAcogidaHabitacionControllerApi(settings);

export const getFamiliaAcogidaHabitaciones = async (filtro) => {
    const { data: dataFamiliaAcogidaHabitaciones } = await apiFamiliaAcogidaHabitacion.familiaAcogidaHabitacionControllerFind(filtro);
    return dataFamiliaAcogidaHabitaciones;
};

export const getFamiliaAcogidaHabitacionesCount = async (filtro) => {
    const { data: dataFamiliaAcogidaHabitaciones } = await apiFamiliaAcogidaHabitacion.familiaAcogidaHabitacionControllerCount(filtro);
    return dataFamiliaAcogidaHabitaciones;
};

export const postFamiliaAcogidaHabitacion = async (objFamiliaAcogidaHabitacion) => {
    const { data: dataFamiliaAcogidaHabitacion } = await apiFamiliaAcogidaHabitacion.familiaAcogidaHabitacionControllerCreate(objFamiliaAcogidaHabitacion);
    return dataFamiliaAcogidaHabitacion;
};

export const patchFamiliaAcogidaHabitacion = async (idFamiliaAcogidaHabitacion, objFamiliaAcogidaHabitacion) => {
    const { data: dataFamiliaAcogidaHabitacion } = await apiFamiliaAcogidaHabitacion.familiaAcogidaHabitacionControllerUpdateById(idFamiliaAcogidaHabitacion, objFamiliaAcogidaHabitacion);
    return dataFamiliaAcogidaHabitacion;
};

export const deleteFamiliaAcogidaHabitacion = async (idFamiliaAcogidaHabitacion) => {
    const { data: dataFamiliaAcogidaHabitacion } = await apiFamiliaAcogidaHabitacion.familiaAcogidaHabitacionControllerDeleteById(idFamiliaAcogidaHabitacion);
    return dataFamiliaAcogidaHabitacion;
};