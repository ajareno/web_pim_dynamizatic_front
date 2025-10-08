import { TipoDocumentoControllerApi, EmpresaControllerApi, AgenteControllerApi, AlumnoControllerApi, DatosParaFacturaControllerApi, FacturaEmitidaControllerApi, ProfesorControllerApi, TutorControllerApi, settings } from "@/app/api-nathalie";

const apiTipoDocumento = new TipoDocumentoControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)
const apiAgente = new AgenteControllerApi(settings)
const apiAlumno = new AlumnoControllerApi(settings)
const apiDatoParaFacturar = new DatosParaFacturaControllerApi(settings)
const apiFacturaEmitida = new FacturaEmitidaControllerApi(settings)
const apiProfesor = new ProfesorControllerApi(settings)
const apiTutor = new TutorControllerApi(settings)


export const getTipoDocumentos = async () => {
    const { data: dataTipoDocumentos } = await apiTipoDocumento.tipoDocumentoControllerFind()
    return dataTipoDocumentos
}

export const postTipoDocumento = async (objTipoDocumento) => {
    const { data: dataTipoDocumento } = await apiTipoDocumento.tipoDocumentoControllerCreate(objTipoDocumento)
    return dataTipoDocumento
}

export const patchTipoDocumento = async (idTipoDocumento, objTipoDocumento) => {
    const { data: dataTipoDocumento } = await apiTipoDocumento.tipoDocumentoControllerUpdateById(idTipoDocumento, objTipoDocumento)
    return dataTipoDocumento
}

export const deleteTipoDocumento = async (idTipoDocumento) => {
    const { data: dataTipoDocumento } = await apiTipoDocumento.tipoDocumentoControllerDeleteById(idTipoDocumento)
    return dataTipoDocumento
}

export const getVistaTipoDocumentoEmpresa = async (filtro) => {
    const { data: dataTipoDocumentos } = await apiTipoDocumento.tipoDocumentoControllerVistaTipoDocumentoEmpresa(filtro)
    return dataTipoDocumentos
}

export const getVistaTipoDocumentoEmpresaCount = async (filtro) => {
    const { data: dataTipoDocumentos } = await apiTipoDocumento.tipoDocumentoControllerVistaTipoDocumentoEmpresaCount(filtro)
    return dataTipoDocumentos
}

export const getEmpresas = async () => {
    const { data: dataTipoDocumentos } = await apiEmpresa.empresaControllerFind()
    return dataTipoDocumentos
}
// Función para filtrar mediante AgenteControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscaAgenteExistente = async (idTipoDocumento) => {
    const { data: dataTipoDocumentos } = await apiAgente.agenteControllerFind(JSON.stringify(
        { where: { tipoDocumentoId: idTipoDocumento } }
    ));
    return dataTipoDocumentos;
};

export const buscaAlumnoExistente = async (idTipoDocumento) => {
    const { data: dataTipoDocumentos } = await apiAlumno.alumnoControllerFind(JSON.stringify(
        { where: { tipoDocumentoId: idTipoDocumento } }
    ));
    return dataTipoDocumentos;
};

export const buscaDatosParaFacturarExistente = async (idTipoDocumento) => {
    const { data: dataTipoDocumentos } = await apiDatoParaFacturar.datosParaFacturaControllerFind(JSON.stringify(
        { where: { tipoDocumentoId: idTipoDocumento } }
    ));
    return dataTipoDocumentos;
};

export const buscaFacturaEmitidaExistente = async (idTipoDocumento) => {
    const { data: dataTipoDocumentos } = await apiFacturaEmitida.facturaEmitidaControllerFind(JSON.stringify(
        { where: { tipoDocumentoId: idTipoDocumento } }
    ));
    return dataTipoDocumentos;
};

export const buscaProfesorExistente = async (idTipoDocumento) => {
    const { data: dataTipoDocumentos } = await apiProfesor.profesorControllerFind(JSON.stringify(
        { where: { tipoDocumentoId: idTipoDocumento } }
    ));
    return dataTipoDocumentos;
};

export const buscaTutorExistente = async (idTipoDocumento) => {
    const { data: dataTipoDocumentos } = await apiTutor.tutorControllerFind(JSON.stringify(
        { where: { tipoDocumentoId: idTipoDocumento } }
    ));
    return dataTipoDocumentos;
};