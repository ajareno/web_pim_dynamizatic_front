import { IncidenciaTipoControllerApi, settings } from "@/app/api-nathalie";

const apiIncidenciaTipo = new IncidenciaTipoControllerApi(settings)

export const getIncidenciaTipos = async () => {
    const { data: dataIncidenciaTipos } = await apiIncidenciaTipo.incidenciaTipoControllerFind()
    return dataIncidenciaTipos
}

export const postIncidenciaTipo = async (objIncidenciaTipo) => {
    const { data: dataIncidenciaTipo } = await apiIncidenciaTipo.incidenciaTipoControllerCreate(objIncidenciaTipo)
    return dataIncidenciaTipo
}

export const patchIncidenciaTipo = async (idIncidenciaTipo, objIncidenciaTipo) => {
    const { data: dataIncidenciaTipo } = await apiIncidenciaTipo.incidenciaTipoControllerUpdateById(idIncidenciaTipo, objIncidenciaTipo)
    return dataIncidenciaTipo
}

export const deleteIncidenciaTipo = async (idIncidenciaTipo) => {
    const { data: dataIncidenciaTipo } = await apiIncidenciaTipo.incidenciaTipoControllerDeleteById(idIncidenciaTipo)
    return dataIncidenciaTipo
}
