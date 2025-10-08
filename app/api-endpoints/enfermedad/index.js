import { EnfermedadControllerApi, settings } from "@/app/api-nathalie";

const apiEnfermedad = new EnfermedadControllerApi(settings)


export const getEnfermedades = async (filtro) => {
    const { data: dataEnfermedades } = await apiEnfermedad.enfermedadControllerFind(filtro)
    return dataEnfermedades
}

export const getEnfermedadesCount = async (filtro) => {
    const { data: dataEnfermedades } = await apiEnfermedad.enfermedadControllerCount(filtro)
    return dataEnfermedades
}

export const postEnfermedad = async (objEnfermedad) => {
    const { data: dataEnfermedad } = await apiEnfermedad.enfermedadControllerCreate(objEnfermedad)
    return dataEnfermedad
}

export const patchEnfermedad = async (idEnfermedad, objEnfermedad) => {
    const { data: dataEnfermedad } = await apiEnfermedad.enfermedadControllerUpdateById(idEnfermedad, objEnfermedad)
    return dataEnfermedad
}

export const deleteEnfermedad = async (idEnfermedad) => {
    const { data: dataEnfermedad } = await apiEnfermedad.enfermedadControllerDeleteById(idEnfermedad)
    return dataEnfermedad
}



