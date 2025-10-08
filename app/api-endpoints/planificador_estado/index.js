import { PlanificadorEstadoControllerApi, EmpresaControllerApi, PlanificadorDetalleControllerApi, settings } from "@/app/api-nathalie";

const apiPlanificadorEstado = new PlanificadorEstadoControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)
const apiPlanificadorDetalle = new PlanificadorDetalleControllerApi(settings)

export const getPlanificadorEstados = async () => {
    const { data: dataPlanificadorEstados } = await apiPlanificadorEstado.planificadorEstadoControllerFind()
    return dataPlanificadorEstados
}

export const postPlanificadorEstado = async (objPlanificadorEstado) => {
    const { data: dataPlanificadorEstado } = await apiPlanificadorEstado.planificadorEstadoControllerCreate(objPlanificadorEstado)
    return dataPlanificadorEstado
}

export const patchPlanificadorEstado = async (idPlanificadorEstado, objPlanificadorEstado) => {
    const { data: dataPlanificadorEstado } = await apiPlanificadorEstado.planificadorEstadoControllerUpdateById(idPlanificadorEstado, objPlanificadorEstado)
    return dataPlanificadorEstado
}

export const deletePlanificadorEstado = async (idPlanificadorEstado) => {
    const { data: dataPlanificadorEstado } = await apiPlanificadorEstado.planificadorEstadoControllerDeleteById(idPlanificadorEstado)
    return dataPlanificadorEstado
}

export const getVistaPlanificadorEstadoEmpresa = async (filtro) => {
    const { data: dataPlanificadorEstados } = await apiPlanificadorEstado.planificadorEstadoControllerVistaPlanificadorEstadoEmpresa(filtro)
    return dataPlanificadorEstados
}

export const getVistaPlanificadorEstadoEmpresaCount = async (filtro) => {
    const { data: dataPlanificadorEstados } = await apiPlanificadorEstado.planificadorEstadoControllerVistaPlanificadorEstadoEmpresaCount(filtro)
    return dataPlanificadorEstados
}

export const getEmpresas = async () => {
    const { data: dataPlanificadorEstados } = await apiEmpresa.empresaControllerFind()
    return dataPlanificadorEstados
}
// Función para filtrar mediante PlanificadorDetalleControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
export const buscaPlanificadorDetalleExistente = async (idPlanificadorEstado) => {
    const { data: dataPlanificadorEstados } = await apiPlanificadorDetalle.planificadorDetalleControllerFind(JSON.stringify(
        { where: { planificadorEstadoId: idPlanificadorEstado } }
    ));
    return dataPlanificadorEstados;
};
