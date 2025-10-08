import { CobroControllerApi, settings } from "@/app/api-nathalie";

const apiCobros = new CobroControllerApi(settings)

export const getCobros = async () => {
    const { data: dataCobro } = await apiCobros.cobroControllerFind()
    return dataCobro
}

export const getVistaCobroUsuarioIva = async (filtro) => {
    const { data: dataCobros } = await apiCobros.cobroControllerVistaCobroUsuarioIva(filtro)
    return dataCobros
}

export const getVistaCobroUsuarioIvaCount = async (filtro) => {
    const { data: dataCobros } = await apiCobros.cobroControllerVistaCobroUsuarioIvaCount(filtro)
    return dataCobros
}

export const postCobro = async (objCobro) => {
    const { data: dataCobros } = await apiCobros.cobroControllerCreate(objCobro)
    return dataCobros
}

export const deleteCobro = async (idCobro) => {
    const { data: dataCobro } = await apiCobros.cobroControllerDeleteById(idCobro)
    return dataCobro
}

export const patchCobro = async (idCobro, objCobro) => {
    const { data: dataCobro } = await apiCobros.cobroControllerUpdateById(idCobro, objCobro)
    return dataCobro
}
