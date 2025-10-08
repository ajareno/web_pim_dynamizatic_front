import { TipoTransporteControllerApi, EmpresaControllerApi, EmpresaTransporteControllerApi, settings } from "@/app/api-nathalie";

const apiTipoTransporte = new TipoTransporteControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)
const apiEmpresaTransporte = new EmpresaTransporteControllerApi(settings)

export const getTipoTransportes = async () => {
    const { data: dataTipoTransportes } = await apiTipoTransporte.tipoTransporteControllerFind()
    return dataTipoTransportes
}

export const postTipoTransporte = async (objTipoTransporte) => {
    const { data: dataTipoTransporte } = await apiTipoTransporte.tipoTransporteControllerCreate(objTipoTransporte)
    return dataTipoTransporte
}

export const patchTipoTransporte = async (idTipoTransporte, objTipoTransporte) => {
    const { data: dataTipoTransporte } = await apiTipoTransporte.tipoTransporteControllerUpdateById(idTipoTransporte, objTipoTransporte)
    return dataTipoTransporte
}

export const deleteTipoTransporte = async (idTipoTransporte) => {
    const { data: dataTipoTransporte } = await apiTipoTransporte.tipoTransporteControllerDeleteById(idTipoTransporte)
    return dataTipoTransporte
}

export const getVistaTipoTransporteEmpresas = async (filtro) => {
    const { data: dataTipoTransportes } = await apiTipoTransporte.tipoTransporteControllerVistaTipoTransportesEmpresas(filtro)
    return dataTipoTransportes
}

export const getVistaTipoTransporteEmpresasCount = async (filtro) => {
    const { data: dataTipoTransportes } = await apiTipoTransporte.tipoTransporteControllerVistaTipoTransportesEmpresasCount(filtro)
    return dataTipoTransportes
}

export const getEmpresas = async () => {
    const { data: dataTipoTransportes } = await apiEmpresa.empresaControllerFind()
    return dataTipoTransportes
}
// Función para filtrar mediante EmpresaTransporteControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos devolverá un array en la que cada posición contiene toda la información del objeto con cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
export const buscaEmpresaTransporteExistente = async (idTipoTransporte) => {
    const { data: dataTipoTransportes } = await apiEmpresaTransporte.empresaTransporteControllerFind(JSON.stringify(
        { where: { tipoTransporteId: idTipoTransporte } }
    ));
    return dataTipoTransportes;
};