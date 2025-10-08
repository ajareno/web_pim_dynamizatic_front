import { CodigoPostalControllerApi, AgenteControllerApi, ProfesorControllerApi, TutorControllerApi, PoblacionControllerApi, settings } from "@/app/api-nathalie";

const apiCodigoPostal = new CodigoPostalControllerApi(settings)
const apiPoblacion = new PoblacionControllerApi(settings)
const apiAgente = new AgenteControllerApi(settings)
const apiProfesor = new ProfesorControllerApi(settings)
const apiTutor = new TutorControllerApi(settings)

export const getCodigosPostales = async () => {
    const { data: dataCodigosPostales } = await apiCodigoPostal.codigoPostalControllerFind()
    return dataCodigosPostales
}

export const getCodigoPostal = async (id) => {
    const { data: dataCodigosPostales } = await apiCodigoPostal.codigoPostalControllerFindById(id)
    return dataCodigosPostales
}

export const postCodigoPostal = async (objCodigoPostal) => {
    const { data: dataCodigoPostal } = await apiCodigoPostal.codigoPostalControllerCreate(objCodigoPostal)
    return dataCodigoPostal
}

export const patchCodigoPostal = async (idCodigoPostal, objCodigoPostal) => {
    const { data: dataCodigoPostal } = await apiCodigoPostal.codigoPostalControllerUpdateById(idCodigoPostal, objCodigoPostal)
    return dataCodigoPostal
}

export const deleteCodigoPostal = async (idCodigoPostal) => {
    const { data: dataCodigoPostal } = await apiCodigoPostal.codigoPostalControllerDeleteById(idCodigoPostal)
    return dataCodigoPostal
}

export const getVistaCodigoPostalPoblacion = async (filtro) => {
    const { data: dataCodigoPostal } = await apiCodigoPostal.codigoPostalControllerVistaCodigoPostalPoblacion(filtro)
    return dataCodigoPostal
}

export const getVistaCodigoPostalPoblacionCount = async (filtro) => {
    const { data: dataCodigoPostal } = await apiCodigoPostal.codigoPostalControllerVistaCodigoPostalPoblacionCount(filtro)
    return dataCodigoPostal
}

export const getPoblacion = async () => {
    const { data: dataCodigoPostal } = await apiPoblacion.poblacionControllerFind()
    return dataCodigoPostal
}
// Función para filtrar mediante AgenteController los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscaAgenteExistente = async (idPoblacion) => {
    const { data: dataCodigoPostal } = await apiAgente.agenteControllerFind(JSON.stringify(
        { where: { codigoPostalId: idPoblacion } }
    ));
    return dataCodigoPostal;
}

export const buscaProfesorExistente = async (idPoblacion) => {
    const { data: dataCodigoPostal } = await apiProfesor.profesorControllerFind(JSON.stringify(
        { where: { codigoPostalId: idPoblacion } }
    ));
    return dataCodigoPostal;
}
export const buscaTutorExistente = async (idPoblacion) => {
    const { data: dataCodigoPostal } = await apiTutor.tutorControllerFind(JSON.stringify(
        { where: { codigoPostalId: idPoblacion } }
    ));
    return dataCodigoPostal;
}