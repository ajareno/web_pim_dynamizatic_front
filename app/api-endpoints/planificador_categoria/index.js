import { PlanificadorCategoriaControllerApi, EmpresaControllerApi, PlanificadorDetalleControllerApi, settings } from "@/app/api-nathalie";

const apiPlanificadorCategoria = new PlanificadorCategoriaControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)
const apiPlanificadorDetalle = new PlanificadorDetalleControllerApi(settings)

export const getPlanificadorCategorias = async () => {
    const { data: dataPlanificadorCategorias } = await apiPlanificadorCategoria.planificadorCategoriaControllerFind()
    return dataPlanificadorCategorias
}

export const postPlanificadorCategoria = async (objPlanificadorCategoria) => {
    const { data: dataPlanificadorCategoria } = await apiPlanificadorCategoria.planificadorCategoriaControllerCreate(objPlanificadorCategoria)
    return dataPlanificadorCategoria
}

export const patchPlanificadorCategoria = async (idPlanificadorCategoria, objPlanificadorCategoria) => {
    const { data: dataPlanificadorCategoria } = await apiPlanificadorCategoria.planificadorCategoriaControllerUpdateById(idPlanificadorCategoria, objPlanificadorCategoria)
    return dataPlanificadorCategoria
}

export const deletePlanificadorCategoria = async (idPlanificadorCategoria) => {
    const { data: dataPlanificadorCategoria } = await apiPlanificadorCategoria.planificadorCategoriaControllerDeleteById(idPlanificadorCategoria)
    return dataPlanificadorCategoria
}

export const getVistaPlanificadorCategoriaEmpresas = async (filtro) => {
    const { data: dataPlanificadorCategorias } = await apiPlanificadorCategoria.planificadorCategoriaControllerVistaPlanificadorCategoriaEmpresa(filtro)
    return dataPlanificadorCategorias
}

export const getVistaPlanificadorCategoriaEmpresasCount = async (filtro) => {
    const { data: dataPlanificadorCategorias } = await apiPlanificadorCategoria.planificadorCategoriaControllerVistaPlanificadorCategoriaEmpresaCount(filtro)
    return dataPlanificadorCategorias
}

export const getEmpresas = async () => {
    const { data: dataPlanificadorCategorias } = await apiEmpresa.empresaControllerFind()
    return dataPlanificadorCategorias
}
// Función para filtrar mediante PlanificadorDetalleApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscaPlanificadorDetalleExistente = async (idPlanificadorCategoria) => {
    const { data: dataPlanificadorCategorias } = await apiPlanificadorDetalle.planificadorDetalleControllerFind(JSON.stringify(
        { where: { planificadorCategoriaId: idPlanificadorCategoria } }
    ));
    return dataPlanificadorCategorias;
};