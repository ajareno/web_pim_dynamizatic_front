import { CentroEscolarControllerApi, settings } from "@/app/api-nathalie";
const apiCentroEscolar = new CentroEscolarControllerApi(settings)

export const getCentrosEscolares = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiCentroEscolar.centroEscolarControllerFind(filtro)
    return dataCentrosEscolares
}

export const getCentrosEscolaresCount = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiCentroEscolar.centroEscolarControllerCount(filtro)
    return dataCentrosEscolares
}

export const getVistaUsuarioCentroEscolar = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiCentroEscolar.centroEscolarControllerVistaCentroEscolarUsuario(filtro)
    return dataCentrosEscolares
}

export const getVistaUsuarioCentroEscolarCount = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiCentroEscolar.centroEscolarControllerVistaCentroEscolarUsuarioCount(filtro)
    return dataCentrosEscolares
}

export const postCentroEscolar = async (objCentroEscolar) => {
    const { data: dataCentroEscolar } = await apiCentroEscolar.centroEscolarControllerCreate(objCentroEscolar)
    return dataCentroEscolar
}

export const patchCentroEscolar = async (idCentroEscolar, objCentroEscolar) => {
    const { data: dataCentroEscolar } = await apiCentroEscolar.centroEscolarControllerUpdateById(idCentroEscolar, objCentroEscolar)
    return dataCentroEscolar
}

export const deleteCentroEscolar = async (idCentroEscolar) => {
    const { data: dataCentroEscolar } = await apiCentroEscolar.centroEscolarControllerDeleteById(idCentroEscolar)
    return dataCentroEscolar
}