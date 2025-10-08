import { EventoIncidenciaControllerApi, settings } from "@/app/api-nathalie";

const apiIncidencias = new EventoIncidenciaControllerApi(settings)

export const getEventoIncidencias = async () => {
    const { data: dataEventoIncidencia } = await apiIncidencias.eventoIncidenciaControllerFind()
    return dataEventoIncidencia
}

export const getVistaEventoIncidencia = async (filtro) => {
    const { data: dataEventoIncidencias } = await apiIncidencias.eventoIncidenciaControllerVistaEventoIncidencia(filtro)
    return dataEventoIncidencias
}

export const getVistaEventoIncidenciaCount = async (filtro) => {
    const { data: dataEventoIncidencias } = await apiIncidencias.eventoIncidenciaControllerVistaEventoIncidenciaCount(filtro)
    return dataEventoIncidencias
}

export const postEventoIncidencia = async (objEventoIncidencia) => {
    const { data: dataEventoIncidencias } = await apiIncidencias.eventoIncidenciaControllerCreate(objEventoIncidencia)
    return dataEventoIncidencias
}

export const deleteEventoIncidencia = async (idEventoIncidencia) => {
    const { data: dataEventoIncidencia } = await apiIncidencias.eventoIncidenciaControllerDeleteById(idEventoIncidencia)
    return dataEventoIncidencia
}

export const patchEventoIncidencia = async (idEventoIncidencia, objEventoIncidencia) => {
    const { data: dataEventoIncidencia } = await apiIncidencias.eventoIncidenciaControllerUpdateById(idEventoIncidencia, objEventoIncidencia)
    return dataEventoIncidencia
}
