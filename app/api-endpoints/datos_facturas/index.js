import { DatosParaFacturaControllerApi, settings } from "@/app/api-nathalie";

const apiDatosParaFactura = new DatosParaFacturaControllerApi(settings)

export const getDatosFacturas = async () => {
    const { data: dataDatosFactura } = await apiDatosParaFactura.datosParaFacturaControllerFind()
    return dataDatosFactura
}

export const getVistaDatosFacturaDocumento = async (filtro) => {
    const { data: dataDatosFacturas } = await apiDatosParaFactura.datosParaFacturaControllerVistaTipoDocumentoDatosFactura(filtro)
    return dataDatosFacturas
}

export const getVistaDatosFacturaDocumentoCount = async (filtro) => {
    const { data: dataDatosFacturas } = await apiDatosParaFactura.datosParaFacturaControllerVistaTipoDocumentoDatosFacturaCount(filtro)
    return dataDatosFacturas
}

export const postDatosFactura = async (objDatosFactura) => {
    const { data: dataDatosFacturas } = await apiDatosParaFactura.datosParaFacturaControllerCreate(objDatosFactura)
    return dataDatosFacturas
}

export const deleteDatosFactura = async (idDatosFactura) => {
    const { data: dataDatosFactura } = await apiDatosParaFactura.datosParaFacturaControllerDeleteById(idDatosFactura)
    return dataDatosFactura
}

export const patchDatosFactura = async (idDatosFactura, objDatosFactura) => {
    const { data: dataDatosFactura } = await apiDatosParaFactura.datosParaFacturaControllerUpdateById(idDatosFactura, objDatosFactura)
    return dataDatosFactura
}
