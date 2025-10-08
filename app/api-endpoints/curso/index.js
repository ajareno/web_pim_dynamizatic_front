import { CursoControllerApi, UsuariosControllerApi, settings } from "@/app/api-nathalie";

const apiCurso = new CursoControllerApi(settings)
const apiUsuarios = new UsuariosControllerApi(settings)


export const getCursos = async (filtro) => {
    const {data: dataCursos} = await apiCurso.cursoControllerFind(filtro)
    return dataCursos
}

export const getCursosCount = async (filtro) => {
    const {data: dataCursos} = await apiCurso.cursoControllerCount(filtro)
    return dataCursos
}

export const postCurso = async (objCurso) => {
    const {data: dataCurso} = await apiCurso.cursoControllerCreate(objCurso)
    return dataCurso
}

export const patchCurso = async (idCurso, objCurso) => {
    const {data: dataCurso} = await apiCurso.cursoControllerUpdateById(idCurso, objCurso)
    return dataCurso
}

export const deleteCurso = async (idCurso) => {
    const {data: dataCurso} = await apiCurso.cursoControllerDeleteById(idCurso)
    return dataCurso
}

export const consultarEndpointUsuarios = async () => {
    const {data: dataUsuarios} = await apiUsuarios.usuariosControllerFind()
    console.log('Get Usuarios: ', dataUsuarios)
    return dataUsuarios
}