import { CalendariosDisponibilidadControllerApi, settings } from "@/app/api-nathalie";
const apiCalendariosDisponibilidad = new CalendariosDisponibilidadControllerApi(settings);

export const getCalendariosDisponibilidad = async (filtro) => {
    const { data: dataCalendariossDisponibilidad } = await apiCalendariosDisponibilidad.calendariosDisponibilidadControllerFind(filtro);
    return dataCalendariossDisponibilidad;
};

export const getCalendariosDisponibilidadCount = async (filtro) => {
    const { data: dataCalendariossDisponibilidad } = await apiCalendariosDisponibilidad.calendariosDisponibilidadControllerCount(filtro);
    return dataCalendariossDisponibilidad;
};

export const postCalendariosDisponibilidad = async (objCalendariosDisponibilidad) => {
    const { data: dataCalendariosDisponibilidad } = await apiCalendariosDisponibilidad.calendariosDisponibilidadControllerCreate(objCalendariosDisponibilidad);
    return dataCalendariosDisponibilidad;
};

export const patchCalendariosDisponibilidad = async (idCalendariosDisponibilidad, objCalendariosDisponibilidad) => {
    const { data: dataCalendariosDisponibilidad } = await apiCalendariosDisponibilidad.calendariosDisponibilidadControllerUpdateById(idCalendariosDisponibilidad, objCalendariosDisponibilidad);
    return dataCalendariosDisponibilidad;
};

export const deleteCalendariosDisponibilidad = async (idCalendariosDisponibilidad) => {
    const { data: dataCalendariosDisponibilidad } = await apiCalendariosDisponibilidad.calendariosDisponibilidadControllerDeleteById(idCalendariosDisponibilidad);
    return dataCalendariosDisponibilidad;
};