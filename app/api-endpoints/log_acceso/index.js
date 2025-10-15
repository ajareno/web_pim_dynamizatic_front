import { LogAccesoControllerApi, settings } from "@/app/api-nathalie";

const apiLogAcceso = new LogAccesoControllerApi(settings)

export const getLogAccesos = async (filtro) => {
    const { data: dataLogAccesos } = await apiLogAcceso.logAccesoControllerFind(filtro)
    return dataLogAccesos
}

export const getLogAcceso = async (filtro) => {
    const { data: dataLogAcceso } = await apiLogAcceso.logAccesoControllerFindById(filtro)
    return dataLogAcceso
}

export const getLogAccesosCount = async (filtro) => {
    const { data: dataLogAccesosCount } = await apiLogAcceso.logAccesoControllerCount(filtro)
    return dataLogAccesosCount
}

export const postLogAcceso = async (objLogAcceso) => {
    try {
        const { data: dataLogAcceso } = await apiLogAcceso.logAccesoControllerCreate(objLogAcceso)
        return dataLogAcceso
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const patchLogAcceso = async (idLogAcceso, objLogAcceso) => {
    const { data: dataLogAcceso } = await apiLogAcceso.logAccesoControllerUpdateById(idLogAcceso, objLogAcceso)
    return dataLogAcceso
}

export const deleteLogAcceso = async (idLogAcceso) => {
    const { data: dataLogAcceso } = await apiLogAcceso.logAccesoControllerDeleteById(idLogAcceso)
    return dataLogAcceso
}
