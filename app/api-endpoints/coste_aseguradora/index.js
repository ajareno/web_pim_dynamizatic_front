import {  CosteAseguradoraControllerApi, settings } from "@/app/api-nathalie";

const apiAseguradoraCoste = new CosteAseguradoraControllerApi(settings)

export const getAseguradoraCostes = async (filtro) => {
    const { data: dataAseguradoraCostes } = await apiAseguradoraCoste.costeAseguradoraControllerFind(filtro)
    return dataAseguradoraCostes
}

export const postAseguradoraCoste = async (objAseguradora) => {
    const { data: dataAseguradoraCoste } = await apiAseguradoraCoste.costeAseguradoraControllerCreate(objAseguradora)
    return dataAseguradoraCoste
}

export const patchAseguradoraCoste = async (idAseguradora, objAseguradora) => {
    const { data: dataAseguradoraCoste } = await apiAseguradoraCoste.costeAseguradoraControllerUpdateById(idAseguradora, objAseguradora)
    return dataAseguradoraCoste
}

export const deleteAseguradoraCoste = async (idAseguradora) => {
    const { data: dataAseguradoraCoste } = await apiAseguradoraCoste.costeAseguradoraControllerDeleteById(idAseguradora)
    return dataAseguradoraCoste
}