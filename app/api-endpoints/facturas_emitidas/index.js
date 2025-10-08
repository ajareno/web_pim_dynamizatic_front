import { FacturaEmitidaControllerApi, settings } from "@/app/api-nathalie";
const apiFacturaEmitida = new FacturaEmitidaControllerApi(settings)


export const getFacturaEmitidas = async () => {
    const { data: dataFacturaEmitidas } = await apiFacturaEmitida.facturaEmitidaControllerFind()
    return dataFacturaEmitidas
}

export const postFacturaEmitida = async (objFacturaEmitida) => {
    const { data: dataFacturaEmitida } = await apiFacturaEmitida.facturaEmitidaControllerCreate(objFacturaEmitida)
    return dataFacturaEmitida
}

export const patchFacturaEmitida = async (idFacturaEmitida, objFacturaEmitida) => {
    const { data: dataFacturaEmitida } = await apiFacturaEmitida.facturaEmitidaControllerUpdateById(idFacturaEmitida, objFacturaEmitida)
    return dataFacturaEmitida
}

export const deleteFacturaEmitida = async (idFacturaEmitida) => {
    const { data: dataFacturaEmitida } = await apiFacturaEmitida.facturaEmitidaControllerDeleteById(idFacturaEmitida)
    return dataFacturaEmitida
}

export const getVistaFacturaEmitidaEvento = async (filtro) => {
    const { data: dataFacturaEmitidas } = await apiFacturaEmitida.facturaEmitidaControllerVistaFacturaEmitidaEvento(filtro)
    return dataFacturaEmitidas
}

export const getVistaFacturaEmitidaEventoCount = async (filtro) => {
    const { data: dataFacturaEmitidas } = await apiFacturaEmitida.facturaEmitidaControllerVistaFacturaEmitidaEventoCount(filtro)
    return dataFacturaEmitidas
}
