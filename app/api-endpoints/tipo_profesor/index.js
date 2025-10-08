import { TipoProfesorControllerApi, settings } from "@/app/api-nathalie";
const apiTipoProfesor = new TipoProfesorControllerApi(settings)

export const getTiposProfesores = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiTipoProfesor.tipoProfesorControllerFind(filtro)
    return dataCentrosEscolares
}

export const getTiposProfesoresCount = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiTipoProfesor.tipoProfesorControllerCount(filtro)
    return dataCentrosEscolares
}

export const postTipoProfesor = async (objTipoProfesor) => {
    const { data: dataTipoProfesor } = await apiTipoProfesor.tipoProfesorControllerCreate(objTipoProfesor)
    return dataTipoProfesor
}

export const patchTipoProfesor = async (idTipoProfesor, objTipoProfesor) => {
    const { data: dataTipoProfesor } = await apiTipoProfesor.tipoProfesorControllerUpdateById(idTipoProfesor, objTipoProfesor)
    return dataTipoProfesor
}

export const deleteTipoProfesor = async (idTipoProfesor) => {
    const { data: dataTipoProfesor } = await apiTipoProfesor.tipoProfesorControllerDeleteById(idTipoProfesor)
    return dataTipoProfesor
}