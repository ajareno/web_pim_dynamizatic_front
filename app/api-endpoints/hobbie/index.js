import { HobbieControllerApi, AlumnoHobbieControllerApi, FamiliaAcogidaHobbieControllerApi, ProfesorHobbieControllerApi, TutorHobbieControllerApi, settings } from "@/app/api-nathalie";

const apiHobbie = new HobbieControllerApi(settings)
const apiAlumnoHobbie = new AlumnoHobbieControllerApi(settings)
const apiFamiliaAcogida = new FamiliaAcogidaHobbieControllerApi(settings)
const apiProfesorHobbieController = new ProfesorHobbieControllerApi(settings)
const apiTutorHobbieController = new TutorHobbieControllerApi(settings)

export const getHobbies = async (filtro) => {
    const { data: dataHobbies } = await apiHobbie.hobbieControllerFind(filtro)
    return dataHobbies
}

export const getHobbiesCount = async (filtro) => {
    const { data: dataHobbies } = await apiHobbie.hobbieControllerCount(filtro)
    return dataHobbies
}

export const postHobbie = async (objHobbie) => {
    const { data: dataHobbie } = await apiHobbie.hobbieControllerCreate(objHobbie)
    return dataHobbie
}

export const patchHobbie = async (idHobbie, objHobbie) => {
    const { data: dataHobbie } = await apiHobbie.hobbieControllerUpdateById(idHobbie, objHobbie)
    return dataHobbie
}

export const deleteHobbie = async (idHobbie) => {
    const { data: dataHobbie } = await apiHobbie.hobbieControllerDeleteById(idHobbie)
    return dataHobbie
}

// Función para filtrar mediante AlumnoHobbieController los id coincidentes que le pasemos por parámetro
// Nos devolverá un array en la que cada posición contiene toda la información del objeto con cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscarAlumnoHobbieExistente = async (idHobbie) => {
    const { data: dataHobbie } = await apiAlumnoHobbie.alumnoHobbieControllerFind(JSON.stringify(
        { where: { hobbieId: idHobbie } }
    ));
    return dataHobbie;
}

export const buscarFamiliaAcogidaHobbieExistente = async (idHobbie) => {
    const { data: dataHobbie } = await apiFamiliaAcogida.familiaAcogidaHobbieControllerFind(JSON.stringify(
        { where: { idHobbieId: idHobbie } }
    ));
    return dataHobbie;
}

export const buscarProfesorHobbieExistente = async (idHobbie) => {
    const { data: dataHobbie } = await apiProfesorHobbieController.profesorHobbieControllerFind(JSON.stringify(
        { where: { hobbieId: idHobbie } }
    ));
    return dataHobbie;

}

export const buscarTutorHobbieExistente = async (idHobbie) => {
    const { data: dataHobbie } = await apiTutorHobbieController.tutorHobbieControllerFind(JSON.stringify(
        { where: { hobbieId: idHobbie } }
    ));
    return dataHobbie;

}



