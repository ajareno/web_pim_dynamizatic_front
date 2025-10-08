import { TipoEventoControllerApi, EmpresaControllerApi, EventoControllerApi, settings } from "@/app/api-nathalie";

const apiTipoEvento = new TipoEventoControllerApi(settings)
const apiEvento = new EventoControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)

export const getTipoEventos = async () => {
    const { data: dataTipoEventos } = await apiTipoEvento.tipoEventoControllerFind()
    return dataTipoEventos
}

export const postTipoEvento = async (objTipoEvento) => {
    const { data: dataTipoEvento } = await apiTipoEvento.tipoEventoControllerCreate(objTipoEvento)
    return dataTipoEvento
}

export const patchTipoEvento = async (idTipoEvento, objTipoEvento) => {
    const { data: dataTipoEvento } = await apiTipoEvento.tipoEventoControllerUpdateById(idTipoEvento, objTipoEvento)
    return dataTipoEvento
}

export const deleteTipoEvento = async (idTipoEvento) => {
    const { data: dataTipoEvento } = await apiTipoEvento.tipoEventoControllerDeleteById(idTipoEvento)
    return dataTipoEvento
}

export const getVistaTipoEventoEmpresa = async (filtro) => {
    const { data: dataTipoEventos } = await apiTipoEvento.tipoEventoControllerVistaTipoEventoEmpresa(filtro)
    return dataTipoEventos
}

export const getVistaTipoEventoEmpresaCount = async (filtro) => {
    const { data: dataTipoEventos } = await apiTipoEvento.tipoEventoControllerVistaTipoEventoEmpresaCount(filtro)
    return dataTipoEventos
}

export const getEmpresas = async () => {
    const { data: dataTipoEventos } = await apiEmpresa.empresaControllerFind()
    return dataTipoEventos
}

// Función para filtrar mediante TipoEventoControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
export const buscaEventoExistente = async (idTipoEvento) => {
    const { data: dataTipoEventos } = await apiEvento.eventoControllerFind(JSON.stringify(
        { where: { tipoEventoId: idTipoEvento } }
    ));
    return dataTipoEventos;
};
