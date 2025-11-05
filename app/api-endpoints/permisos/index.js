import { settings, PermisoControllerApi, ListaPermisosControllerApi } from "@/app/api-programa";

const apiPermisos = new PermisoControllerApi(settings)

export const getPermiso= async (filtros) => {
    const { data: dataPermisos } = await apiPermisos.permisoControllerFind(filtros)
    return dataPermisos
}

export const postPermiso = async (objPermiso) => {
    const { data: dataPermiso } = await apiPermisos.permisoControllerCreate(objPermiso)
    return dataPermiso
}

export const patchPermiso = async (idPermiso, objPermiso) => {
    const { data: dataPermiso } = await apiPermisos.permisoControllerUpdateById(idPermiso, objPermiso)   
    return dataPermiso
}

export const deletePermiso = async (idPermiso) => {
    const { data: dataPermiso } = await apiPermisos.permisoControllerDeleteById(idPermiso)
    return dataPermiso
}

export const getVistaEmpresaRolPermiso = async (filtros) => {
    try {
        const { data: dataPermiso } = await apiPermisos.permisoControllerVistaEmpresaRolPermiso(filtros)
        return dataPermiso   
    } catch (error) {
        console.log(error)
    }
}

export const compruebaPermiso = async (rolId, controlador, accion) => {
    try {
        const { data: dataPermiso } = await apiPermisos.permisoControllerBuscarPermiso(rolId, controlador, accion)
        return dataPermiso   
    } catch (error) {
        console.log(error)
    }
}