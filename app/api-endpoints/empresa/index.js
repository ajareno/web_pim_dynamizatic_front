import { EmpresaControllerApi, settings } from "@/app/api-nathalie";

const apiEmpresa = new EmpresaControllerApi(settings)

export const getEmpresas = async (filtro) => {
    const { data: dataEmpresas } = await apiEmpresa.empresaControllerFind(filtro)
    return dataEmpresas
}

export const getEmpresasCount = async (filtro) => {
    const { data: dataEmpresas } = await apiEmpresa.empresaControllerCount(filtro)
    return dataEmpresas
}

export const getEmpresa = async (id) => {
    const { data: dataEmpresas } = await apiEmpresa.empresaControllerFindById(id)
    return dataEmpresas
}

export const postEmpresa = async (objEmpresa) => {
    const { data: dataEmpresa } = await apiEmpresa.empresaControllerCreate(objEmpresa)
    return dataEmpresa
}

export const deleteEmpresa = async (idEmpresa) => {
    const { data: dataEmpresa } = await apiEmpresa.empresaControllerDeleteById(idEmpresa)
    return dataEmpresa
}

export const patchEmpresa = async (idEmpresa, objEmpresa) => {
    const { data: dataEmpresa } = await apiEmpresa.empresaControllerUpdateById(idEmpresa, objEmpresa)
    return dataEmpresa
}
