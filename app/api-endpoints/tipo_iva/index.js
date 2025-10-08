import { TipoIvaControllerApi, PaisControllerApi, CobroControllerApi, FacturaEmitidaControllerApi, GastoControllerApi, UsuariosControllerApi, settings } from "@/app/api-nathalie";

const apiTipoIva = new TipoIvaControllerApi(settings)
const apiPais = new PaisControllerApi(settings)
const apiCobro = new CobroControllerApi(settings)
const apiFacturaEmitida = new FacturaEmitidaControllerApi(settings)
const apiGasto = new GastoControllerApi(settings)
const apiUsuarios = new UsuariosControllerApi(settings)


export const getTiposIva = async () => {
    const { data: dataTiposIva } = await apiTipoIva.tipoIvaControllerFind()
    return dataTiposIva
}

export const postTipoIva = async (objTipoIva) => {
    const { data: dataTipoIva } = await apiTipoIva.tipoIvaControllerCreate(objTipoIva)
    return dataTipoIva
}

export const patchTipoIva = async (idTipoIva, objTipoIva) => {
    const { data: dataTipoIva } = await apiTipoIva.tipoIvaControllerUpdateById(idTipoIva, objTipoIva)
    return dataTipoIva
}

export const deleteTipoIva = async (idTipoIva) => {
    const { data: dataTipoIva } = await apiTipoIva.tipoIvaControllerDeleteById(idTipoIva)
    return dataTipoIva
}

export const deleteTiposIvaRelacionados = async (idTipoIva) => {
    const { data: dataTipoIva } = await apiTipoIva.tipoIvaControllerBorrarTodosIvasRelacionados(idTipoIva)
    return dataTipoIva
}

export const getVistaTipoIvaPais = async (filtro) => {
    const { data: dataTipoIva } = await apiTipoIva.tipoIvaControllerVistaTipoIvaPais(filtro)
    return dataTipoIva
}
export const getVistaTipoIvaPaisCount = async (filtro) => {
    const { data: dataTipoIva } = await apiTipoIva.tipoIvaControllerVistaTipoIvaPaisCount(filtro)
    return dataTipoIva
}


export const getPais = async () => {
    const { data: dataTipoIva } = await apiPais.paisControllerFind()
    return dataTipoIva
}
// Función para filtrar mediante CobroControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscaCobroExistente = async (idTipoIva) => {
    const { data: dataTipoIva } = await apiCobro.cobroControllerFind(JSON.stringify(
        { where: { tiposIvaId: idTipoIva } }
    ));
    return dataTipoIva;
}
export const buscaFacturaEmitidaExistente = async (idTipoIva) => {
    const { data: dataTipoIva } = await apiFacturaEmitida.facturaEmitidaControllerFind(JSON.stringify(
        { where: { tipoivaId: idTipoIva } }
    ));
    return dataTipoIva;
}
export const buscaGastoExistente = async (idTipoIva) => {
    const { data: dataTipoIva } = await apiGasto.gastoControllerFind(JSON.stringify(
        { where: { tipoIvaId: idTipoIva } }
    ));
    return dataTipoIva;
}
export const buscaUsuarioExistente = async (idTipoIva) => {
    const { data: dataTipoIva } = await apiUsuarios.usuariosControllerFind(JSON.stringify(
        { where: { tipoIvaId: idTipoIva } }
    ));
    return dataTipoIva;
}