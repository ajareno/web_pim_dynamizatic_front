import { TipoTransporteControllerApi, EmpresaControllerApi, EmpresaTransporteControllerApi, ItinerarioControllerApi, ProgramaActividadControllerApi, settings } from "@/app/api-nathalie";

const apiTipoTransporte = new TipoTransporteControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)
const apiEmpresaTransporte = new EmpresaTransporteControllerApi(settings)
const apiItinerario = new ItinerarioControllerApi(settings)
const apiProgramaActividad = new ProgramaActividadControllerApi(settings)

export const getEmpresaTransportes = async () => {
    const { data: dataEmpresaTransportes } = await apiEmpresaTransporte.empresaTransporteControllerFind()
    return dataEmpresaTransportes
}

export const postEmpresaTransporte = async (objEmpresaTransporte) => {
    const { data: dataEmpresaTransporte } = await apiEmpresaTransporte.empresaTransporteControllerCreate(objEmpresaTransporte)
    return dataEmpresaTransporte
}

export const patchEmpresaTransporte = async (idEmpresaTransporte, objEmpresaTransporte) => {
    const { data: dataEmpresaTransporte } = await apiEmpresaTransporte.empresaTransporteControllerUpdateById(idEmpresaTransporte, objEmpresaTransporte)
    return dataEmpresaTransporte
}

export const deleteEmpresaTransporte = async (idEmpresaTransporte) => {
    const { data: dataEmpresaTransporte } = await apiEmpresaTransporte.empresaTransporteControllerDeleteById(idEmpresaTransporte)
    return dataEmpresaTransporte
}

export const getVistaEmpresaTransporteTipoTransporteEmpresas = async (filtro) => {
    const { data: dataEmpresaTransportes } = await apiEmpresaTransporte.empresaTransporteControllerVistaEmpresaTransporte(filtro)
    return dataEmpresaTransportes
}

export const getVistaEmpresaTransporteTipoTransporteEmpresasCount = async (filtro) => {
    const { data: dataEmpresaTransportes } = await apiEmpresaTransporte.empresaTransporteControllerVistaEmpresaTransporteCount(filtro)
    return dataEmpresaTransportes
}

export const getEmpresas = async () => {
    const { data: dataEmpresaTransportes } = await apiEmpresa.empresaControllerFind()
    return dataEmpresaTransportes
}

export const getTipoTransportes = async () => {
    const { data: dataEmpresaTransportes } = await apiTipoTransporte.tipoTransporteControllerFind()
    return dataEmpresaTransportes
}

// Función para filtrar mediante ItinerarioController los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscaItinerarioExistente = async (idEmpresaTransporte) => {
    const { data: dataEmpresaTransportes } = await apiItinerario.itinerarioControllerFind(JSON.stringify(
        { where: { empresaTransporteId: idEmpresaTransporte } }
    ));
    return dataEmpresaTransportes;
};

export const buscaProgramaActividadController = async (idEmpresaTransporte) => {
    const { data: dataEmpresaTransportes } = await apiProgramaActividad.programaActividadControllerFind(JSON.stringify(
        { where: { transporteId: idEmpresaTransporte } }
    ));
    return dataEmpresaTransportes;
};