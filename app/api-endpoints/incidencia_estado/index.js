import { IncidenciaEstadoControllerApi, settings } from "@/app/api-nathalie";

const apiIncidenciaEstado = new IncidenciaEstadoControllerApi(settings)

export const getIncidenciaEstados = async () => {
    const { data: dataIncidenciaEstados } = await apiIncidenciaEstado.incidenciaEstadoControllerFind()
    return dataIncidenciaEstados
}

export const postIncidenciaEstado = async (objIncidenciaEstado) => {
    const { data: dataIncidenciaEstado } = await apiIncidenciaEstado.incidenciaEstadoControllerCreate(objIncidenciaEstado)
    return dataIncidenciaEstado
}

export const patchIncidenciaEstado = async (idIncidenciaEstado, objIncidenciaEstado) => {
    const { data: dataIncidenciaEstado } = await apiIncidenciaEstado.incidenciaEstadoControllerUpdateById(idIncidenciaEstado, objIncidenciaEstado)
    return dataIncidenciaEstado
}

export const deleteIncidenciaEstado = async (idIncidenciaEstado) => {
    const { data: dataIncidenciaEstado } = await apiIncidenciaEstado.incidenciaEstadoControllerDeleteById(idIncidenciaEstado)
    return dataIncidenciaEstado
}
