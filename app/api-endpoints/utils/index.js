import { UtilsControllerApi, settings } from "@/app/api-nathalie";

const apiUtils = new UtilsControllerApi(settings)

export const comprobarRelacionesTabla = async (tabla, id) => {
    const { data: data } = await apiUtils.utilsControllerComprobarRelacionesTabla(tabla, id)
    return data.existeRelacion
}
