import { TipoUsuarioControllerApi, TipoUsuarioUsuarioControllerApi, UsuariosControllerApi, settings } from "@/app/api-nathalie";

const apiUsuario = new UsuariosControllerApi(settings)
const apiTipoUsuarioUsuario = new TipoUsuarioUsuarioControllerApi(settings)
const apiTipoUsuario = new TipoUsuarioControllerApi(settings)


export const getUsuarios = async (filtro) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerFind(filtro)
    return dataUsuarios
}

export const getUsuariosCount = async (filtro) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerCount(filtro)
    return dataUsuarios
}

export const getVistaUsuarios = async (filtro) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerVistaEmpresaRolUsuario(filtro)
    return dataUsuarios
}

export const getVistaUsuariosCount = async (filtro) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerVistaEmpresaRolUsuarioCount(filtro)
    return dataUsuarios
}

export const getVistaAcompanyantes = async (filtro) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerVistaUsuarioAcompanyante(filtro)
    return dataUsuarios
}

export const getVistaAcompanyantesCount = async (filtro) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerVistaUsuarioAcompanyanteCount(filtro)
    return dataUsuarios
}

export const getVistaTutor = async (filtro) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerVistaUsuarioTutor(filtro)
    return dataUsuarios
}

export const getVistaTutorCount = async (filtro) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerVistaUsuarioTutorCount(filtro)
    return dataUsuarios
}

export const getVistaTutorAlumno = async (filtro) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerVistaUsuarioTutorAlumno(filtro)
    return dataUsuarios
}

export const getVistaTutorAlumnoCount = async (filtro) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerVistaUsuarioTutorAlumnoCount(filtro)
    return dataUsuarios
}

export const getUsuarioAvatar = async (id) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerObtenerUsuarioAvatar(id)
    return dataUsuarios
}

export const postUsuario = async (objUsuario) => {
    const { data: dataUsuario } = await apiUsuario.usuariosControllerCreate(objUsuario)
    return dataUsuario
}

export const recuperarPasswordUsuario = async (objEmail) => {
    const { data: dataUsuario } = await apiUsuario.usuariosControllerRecuperarPassword(objEmail)
    return dataUsuario
}

export const patchUsuario = async (idUsuario, objUsuario) => {
    const { data: dataUsuario } = await apiUsuario.usuariosControllerUpdateById(idUsuario, objUsuario)
    return dataUsuario
}

export const patchUsuarioCredenciales = async (idUsuario, objUsuario) => {
    const { data: dataUsuario } = await apiUsuario.usuariosControllerUpdateByIdCredenciales(idUsuario, objUsuario)
    return dataUsuario
}

export const deleteUsuario = async (idUsuario) => {
    const { data: dataUsuario } = await apiUsuario.usuariosControllerDeleteById(idUsuario)
    return dataUsuario
}

export const validarCodigoRecuperacion = async (filtro) => {
    const { data: dataUsuarios } = await apiUsuario.usuariosControllerValidarCodigoRecuperacion(filtro)
    return dataUsuarios
}

export const getUsuarioTiposUsuario = async (filtro) => {
    const { data: dataTipoUsuarioUsuarios } = await apiTipoUsuarioUsuario.tipoUsuarioUsuarioControllerFind(filtro)
    const registros = []
    for (const registro of dataTipoUsuarioUsuarios) {
        const { data: dataTipoUsuarios } = await apiTipoUsuario.tipoUsuarioControllerFindById(registro.tipoUsuarioId)
        registros.push(dataTipoUsuarios)
    }
    return registros
}

export const getTipoUsuario = async (filtro) => {
    const { data: dataUsuarios } = await apiTipoUsuario.tipoUsuarioControllerFind(filtro)
    return dataUsuarios
}