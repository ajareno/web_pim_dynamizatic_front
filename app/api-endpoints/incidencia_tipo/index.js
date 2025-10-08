import { IncidenciaTipoControllerApi, EmpresaControllerApi, EventoIncidenciaControllerApi, settings } from "@/app/api-nathalie";

const apiIncidenciaTipo = new IncidenciaTipoControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)
const apiEventoIncidencia = new EventoIncidenciaControllerApi(settings)

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

export const getVistaIncidenciaTipoEmpresa = async (filtro) => {
    const { data: dataIncidenciaTipos } = await apiIncidenciaTipo.incidenciaTipoControllerVistaIncidenciaTipoEmpresa(filtro)
    return dataIncidenciaTipos
}

export const getVistaIncidenciaTipoEmpresaCount = async (filtro) => {
    const { data: dataIncidenciaTipos } = await apiIncidenciaTipo.incidenciaTipoControllerVistaIncidenciaTipoEmpresaCount(filtro)
    return dataIncidenciaTipos
}

export const getEmpresas = async () => {
    const { data: dataIncidenciaTipos } = await apiEmpresa.empresaControllerFind()
    return dataIncidenciaTipos
}
// Función para filtrar mediante EventoIncidenciaControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos devolverá un array en la que cada posición contiene toda la información del objeto con cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
export const buscaEventoIncidenciaExistente = async (idIncidenciaTipo) => {
    const { data: dataIncidenciaTipos } = await apiEventoIncidencia.eventoIncidenciaControllerFind(JSON.stringify(
        { where: { incidenciaTipoId: idIncidenciaTipo } }
    ));
    return dataIncidenciaTipos;
};
