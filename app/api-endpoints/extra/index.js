import { ExtraControllerApi, EmpresaControllerApi, ExtraTipoControllerApi, ExtraAlumnoEventoControllerApi, settings } from "@/app/api-nathalie";

const apiExtra = new ExtraControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)
const apiExtraTipo = new ExtraTipoControllerApi(settings)
const apiExtraAlumnoEvento = new ExtraAlumnoEventoControllerApi(settings)

export const getExtras = async () => {
    const { data: dataExtras } = await apiExtra.extraControllerFind()
    return dataExtras
}

export const postExtra = async (objExtra) => {
    const { data: dataExtra } = await apiExtra.extraControllerCreate(objExtra)
    return dataExtra
}

export const patchExtra = async (idExtra, objExtra) => {
    const { data: dataExtra } = await apiExtra.extraControllerUpdateById(idExtra, objExtra)
    return dataExtra
}

export const deleteExtra = async (idExtra) => {
    const { data: dataExtra } = await apiExtra.extraControllerDeleteById(idExtra)
    return dataExtra
}

export const getVistaExtraEmpresaExtraTipo = async (filtro) => {
    const { data: dataExtras } = await apiExtra.extraControllerVistaExtraEmpresaExtraTipo(filtro)
    return dataExtras
}

export const getVistaExtraEmpresaExtraTipoCount = async (filtro) => {
    const { data: dataExtras } = await apiExtra.extraControllerVistaExtraEmpresaExtraTipoCount(filtro)
    return dataExtras
}

export const getEmpresas = async () => {
    const { data: dataExtras } = await apiEmpresa.empresaControllerFind()
    return dataExtras
}

export const getExtraTipos = async () => {
    const { data: dataExtras } = await apiExtraTipo.extraTipoControllerFind()
    return dataExtras
}

// Función para filtrar mediante ExtraAlumnoEventoController los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
export const buscaExtraAlumnoEventoExistente = async (idExtra) => {
    const { data: dataExtras } = await apiExtraAlumnoEvento.extraAlumnoEventoControllerFind(JSON.stringify(
        { where: { extraId: idExtra } }
    ));
    return dataExtras;
};
