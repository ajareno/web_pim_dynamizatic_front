import { ExtraControllerApi, EmpresaControllerApi, ExtraTipoControllerApi, settings } from "@/app/api-nathalie";

const apiExtra = new ExtraControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)
const apiExtraTipo = new ExtraTipoControllerApi(settings)

export const getExtraTipos = async (filtro) => {
    const { data: dataExtraTipos } = await apiExtraTipo.extraTipoControllerFind(filtro)
    return dataExtraTipos
}

export const postExtraTipo = async (objExtraTipo) => {
    const { data: dataExtraTipo } = await apiExtraTipo.extraTipoControllerCreate(objExtraTipo)
    return dataExtraTipo
}

export const patchExtraTipo = async (idExtraTipo, objExtraTipo) => {
    const { data: dataExtraTipo } = await apiExtraTipo.extraTipoControllerUpdateById(idExtraTipo, objExtraTipo)
    return dataExtraTipo
}

export const deleteExtraTipo = async (idExtraTipo) => {
    const { data: dataExtraTipo } = await apiExtraTipo.extraTipoControllerDeleteById(idExtraTipo)
    return dataExtraTipo
}

export const getVistaExtraTipoEmpresa = async (filtro) => {
    const { data: dataExtraTipos } = await apiExtraTipo.extraTipoControllerVistaExtraTipoEmpresa(filtro)
    return dataExtraTipos
}

export const getVistaExtraTipoEmpresaCount = async (filtro) => {
    const { data: dataExtraTipos } = await apiExtraTipo.extraTipoControllerVistaExtraTipoEmpresaCount(filtro)
    return dataExtraTipos
}

export const getEmpresas = async () => {
    const { data: dataExtraTipos } = await apiEmpresa.empresaControllerFind()
    return dataExtraTipos
}

// Función para filtrar mediante ExtraControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
export const buscaExtraExistente = async (idExtraTipo) => {
    const { data: dataExtraTipos } = await apiExtra.extraControllerFind(JSON.stringify(
        { where: { extraTipoId: idExtraTipo } }
    ));
    return dataExtraTipos;
};
