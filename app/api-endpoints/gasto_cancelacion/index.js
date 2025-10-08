import { GastoCancelacionControllerApi, EmpresaControllerApi, AlumnoEventoCanceladoControllerApi, settings } from "@/app/api-nathalie";

const apiGastoCancelacion = new GastoCancelacionControllerApi(settings)
const apiAlumnoEventoCancelado = new AlumnoEventoCanceladoControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)

export const getGastosCancelacion = async () => {
    const { data: dataGastosCancelacion } = await apiGastoCancelacion.gastoCancelacionControllerFind()
    return dataGastosCancelacion
}

export const postGastoCancelacion = async (objGastoCancelacion) => {
    const { data: dataGastoCancelacion } = await apiGastoCancelacion.gastoCancelacionControllerCreate(objGastoCancelacion)
    return dataGastoCancelacion
}

export const patchGastoCancelacion = async (idGastoCancelacion, objGastoCancelacion) => {
    const { data: dataGastoCancelacion } = await apiGastoCancelacion.gastoCancelacionControllerUpdateById(idGastoCancelacion, objGastoCancelacion)
    return dataGastoCancelacion
}

export const deleteGastoCancelacion = async (idGastoCancelacion) => {
    const { data: dataGastoCancelacion } = await apiGastoCancelacion.gastoCancelacionControllerDeleteById(idGastoCancelacion)
    return dataGastoCancelacion
}

export const getVistaGastoCancelacionEmpresa = async (filtro) => {
    const { data: dataGastoCancelacion } = await apiGastoCancelacion.gastoCancelacionControllerVistaGastoCancelacionEmpresa(filtro)
    return dataGastoCancelacion
}

export const getVistaGastoCancelacionEmpresaCount = async (filtro) => {
    const { data: dataGastoCancelacion } = await apiGastoCancelacion.gastoCancelacionControllerVistaGastoCancelacionEmpresaCount(filtro)
    return dataGastoCancelacion
}

export const getEmpresas = async () => {
    const { data: dataGastoCancelacion } = await apiEmpresa.empresaControllerFind()
    return dataGastoCancelacion
}
// Función para filtrar mediante AlumnoEventoCanceladoControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
export const buscaAlumnoEventoCanceladoExistente = async (idGastoCancelacion) => {
    const { data: dataGastoCancelacion } = await apiAlumnoEventoCancelado.alumnoEventoCanceladoControllerFind(JSON.stringify(
        { where: { gastoCancelacionId: idGastoCancelacion } }
    ));
    return dataGastoCancelacion;
}
