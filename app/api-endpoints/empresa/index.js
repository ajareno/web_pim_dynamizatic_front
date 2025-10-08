import { EmpresaControllerApi, settings } from "@/app/api-nathalie";

const apiEmpresa = new EmpresaControllerApi(settings)

export const getEmpresas = async () => {
    const { data: dataEmpresaMonedas } = await apiEmpresa.empresaControllerFind()
    return dataEmpresaMonedas
}

export const getEmpresa = async (id) => {
    const { data: dataEmpresaMonedas } = await apiEmpresa.empresaControllerFindById(id)
    return dataEmpresaMonedas
}

export const getVistaEmpresaMoneda = async (filtro) => {
    const { data: dataEmpresaMonedas } = await apiEmpresa.empresaControllerVistaEmpresaMoneda(filtro)
    return dataEmpresaMonedas
}

export const getVistaEmpresaMonedaCount = async (filtro) => {
    const { data: dataEmpresaMonedas } = await apiEmpresa.empresaControllerVistaEmpresaMonedaCount(filtro)
    return dataEmpresaMonedas
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
