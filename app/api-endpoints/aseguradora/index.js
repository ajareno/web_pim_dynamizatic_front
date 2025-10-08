import { AseguradoraControllerApi, AseguradoraCosteControllerApi, ProgramaControllerApi, EmpresaControllerApi, settings } from "@/app/api-nathalie";

const apiAseguradora = new AseguradoraControllerApi(settings)
const apiAseguradoraCoste = new AseguradoraCosteControllerApi(settings)
const apiPrograma = new ProgramaControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)

export const getAseguradoras = async () => {
    const { data: dataAseguradoras } = await apiAseguradora.aseguradoraControllerFind()
    return dataAseguradoras
}

export const postAseguradora = async (objAseguradora) => {
    const { data: dataAseguradora } = await apiAseguradora.aseguradoraControllerCreate(objAseguradora)
    return dataAseguradora
}

export const patchAseguradora = async (idAseguradora, objAseguradora) => {
    const { data: dataAseguradora } = await apiAseguradora.aseguradoraControllerUpdateById(idAseguradora, objAseguradora)
    return dataAseguradora
}

export const deleteAseguradora = async (idAseguradora) => {
    const { data: dataAseguradora } = await apiAseguradora.aseguradoraControllerDeleteById(idAseguradora)
    return dataAseguradora
}

export const getVistaAseguradoraEmpresa = async (idAseguradora) => {
    const { data: dataAseguradora } = await apiAseguradora.aseguradoraControllerVistaAseguradoraEmpresa(idAseguradora)
    return dataAseguradora
}

export const getVistaAseguradoraEmpresaCount = async (idAseguradora) => {
    const { data: dataAseguradora } = await apiAseguradora.aseguradoraControllerVistaAseguradoraEmpresaCount(idAseguradora)
    return dataAseguradora
}

export const getEmpresas = async () => {
    const { data: dataAseguradora } = await apiEmpresa.empresaControllerFind()
    return dataAseguradora
}
// Función para filtrar mediante AseguradoraCosteControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscaAseguradoraCosteExistente = async (idAseguradora) => {
    const { data: dataAseguradora } = await apiAseguradoraCoste.aseguradoraCosteControllerFind(JSON.stringify(
        { where: { aseguradoraId: idAseguradora } }
    ));
    return dataAseguradora;
}

export const buscaProgramaExistente = async (idAseguradora) => {
    const { data: dataAseguradora } = await apiPrograma.programaControllerFind(JSON.stringify(
        { where: { aseguradoraId: idAseguradora } }
    ));
    return dataAseguradora;
}
