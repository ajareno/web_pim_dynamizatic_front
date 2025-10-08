import { AlergiaControllerApi, AlumnoAlergiaControllerApi, FamiliaAcogidaAlergiaControllerApi, ProfesorAlergiaControllerApi, TutorAlergiaControllerApi, settings } from "@/app/api-nathalie";

const apiAlergia = new AlergiaControllerApi(settings)
const apiAlumnoAlergia = new AlumnoAlergiaControllerApi(settings)
const apiFamiliaAcogida = new FamiliaAcogidaAlergiaControllerApi(settings)
const apiProfesorAlergiaController = new ProfesorAlergiaControllerApi(settings)
const apiTutorAlergiaController = new TutorAlergiaControllerApi(settings)

export const getAlergias = async (filtros) => {
    const { data: dataAlergias } = await apiAlergia.alergiaControllerFind(filtros)
    return dataAlergias
}

export const getAlergiasCount = async (filtros) => {
    const { data: dataAlergias } = await apiAlergia.alergiaControllerCount(filtros)
    return dataAlergias
}

export const postAlergia = async (objAlergia) => {
    const { data: dataAlergia } = await apiAlergia.alergiaControllerCreate(objAlergia)
    return dataAlergia
}

export const patchAlergia = async (idAlergia, objAlergia) => {
    const { data: dataAlergia } = await apiAlergia.alergiaControllerUpdateById(idAlergia, objAlergia)
    return dataAlergia
}

export const deleteAlergia = async (idAlergia) => {
    const { data: dataAlergia } = await apiAlergia.alergiaControllerDeleteById(idAlergia)
    return dataAlergia
}

// Función para filtrar mediante AlumnoAlergiaControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscaAlumnoAlergiaExistente = async (idAlergia) => {
    const { data: dataAlergia } = await apiAlumnoAlergia.alumnoAlergiaControllerFind(JSON.stringify(
        { where: { alergiaId: idAlergia } }
    ));
    return dataAlergia;
}

export const buscaFamiliaAcogidaAlergiaExistente = async (idAlergia) => {
    const { data: dataAlergia } = await apiFamiliaAcogida.familiaAcogidaAlergiaControllerFind(JSON.stringify(
        { where: { idAlergiaId: idAlergia } }
    ));
    return dataAlergia;
}

export const buscaProfesorAlergiaExistente = async (idAlergia) => {
    const { data: dataAlergia } = await apiProfesorAlergiaController.profesorAlergiaControllerFind(JSON.stringify(
        { where: { alergiaId: idAlergia } }
    ));
    return dataAlergia;

}

export const buscaTutorAlergiaExistente = async (idAlergia) => {
    const { data: dataAlergia } = await apiTutorAlergiaController.tutorAlergiaControllerFind(JSON.stringify(
        { where: { alergiaId: idAlergia } }
    ));
    return dataAlergia;

}



