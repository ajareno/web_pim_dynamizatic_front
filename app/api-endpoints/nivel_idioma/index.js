import { NivelIdiomaControllerApi, AlumnoControllerApi, EventoAlumnoOtrosControllerApi, IdiomaControllerApi, settings } from "@/app/api-nathalie";

const apiNivelIdioma = new NivelIdiomaControllerApi(settings)
const apiIdioma = new IdiomaControllerApi(settings)
const apiAlumno = new AlumnoControllerApi(settings)
const apiEventoAlumnoOtros = new EventoAlumnoOtrosControllerApi(settings)

export const getNivelIdiomas = async () => {
    const { data: dataNivelIdiomas } = await apiNivelIdioma.nivelIdiomaControllerFind()
    return dataNivelIdiomas
}

export const postNivelIdioma = async (objNivelIdioma) => {
    const { data: dataNivelIdioma } = await apiNivelIdioma.nivelIdiomaControllerCreate(objNivelIdioma)
    return dataNivelIdioma
}

export const patchNivelIdioma = async (idNivelIdioma, objNivelIdioma) => {
    const { data: dataNivelIdioma } = await apiNivelIdioma.nivelIdiomaControllerUpdateById(idNivelIdioma, objNivelIdioma)
    return dataNivelIdioma
}

export const deleteNivelIdioma = async (idNivelIdioma) => {
    const { data: dataNivelIdioma } = await apiNivelIdioma.nivelIdiomaControllerDeleteById(idNivelIdioma)
    return dataNivelIdioma
}

export const getVistaNivelIdiomaIdioma = async (filtro) => {
    const { data: dataNivelIdiomas } = await apiNivelIdioma.nivelIdiomaControllerVistaNivelIdiomaIdioma(filtro)
    return dataNivelIdiomas
}

export const getVistaNivelIdiomaIdiomaCount = async (filtro) => {
    const { data: dataNivelIdiomas } = await apiNivelIdioma.nivelIdiomaControllerVistaNivelIdiomaIdiomaCount(filtro)
    return dataNivelIdiomas
}

export const getIdiomas = async () => {
    const { data: dataNivelIdiomas } = await apiIdioma.idiomaControllerFind()
    return dataNivelIdiomas
}

// Función para filtrar mediante AlumnoControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscaAlumnoExistente = async (idNivelIdioma) => {
    const { data: dataNivelIdiomas } = await apiAlumno.alumnoControllerFind(JSON.stringify(
        { where: { nivelIdiomaId: idNivelIdioma } }
    ));
    return dataNivelIdiomas;
};

export const buscaEventoAlumnosOtrosExistente = async (idNivelIdioma) => {
    const { data: dataNivelIdiomas } = await apiEventoAlumnoOtros.eventoAlumnoOtrosControllerFind(JSON.stringify(
        { where: { nivelIdiomaId: idNivelIdioma } }
    ));
    return dataNivelIdiomas;
};