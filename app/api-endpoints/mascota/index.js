import { MascotaControllerApi, AlumnoMascotaControllerApi, FamiliaAcogidaMascotaControllerApi, ProfesorMascotaControllerApi, TutorMascotaControllerApi, settings } from "@/app/api-nathalie";

const apiMascota = new MascotaControllerApi(settings)
const apiAlumnoMascota = new AlumnoMascotaControllerApi(settings)
const apiFamiliaAcogida = new FamiliaAcogidaMascotaControllerApi(settings)
const apiProfesorMascotaController = new ProfesorMascotaControllerApi(settings)
const apiTutorMascotaController = new TutorMascotaControllerApi(settings)

export const getMascotas = async (filtro) => {
    const { data: dataMascotas } = await apiMascota.mascotaControllerFind(filtro)
    return dataMascotas
}

export const getMascotasCount = async (filtro) => {
    const { data: dataMascotas } = await apiMascota.mascotaControllerCount(filtro)
    return dataMascotas
}

export const postMascota = async (objMascota) => {
    const { data: dataMascota } = await apiMascota.mascotaControllerCreate(objMascota)
    return dataMascota
}

export const patchMascota = async (idMascota, objMascota) => {
    const { data: dataMascota } = await apiMascota.mascotaControllerUpdateById(idMascota, objMascota)
    return dataMascota
}

export const deleteMascota = async (idMascota) => {
    const { data: dataMascota } = await apiMascota.mascotaControllerDeleteById(idMascota)
    return dataMascota
}

// Función para filtrar mediante AlumnoMascotaControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos sacará un array con una posición con toda su información por cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
// Este método funciona exactamente igual para el resto que hay más abajo pero con sus respectivas apis
export const buscaAlumnoMascotaExistente = async (idMascota) => {
    const { data: dataMascota } = await apiAlumnoMascota.alumnoMascotaControllerFind(JSON.stringify(
        { where: { mascotaId: idMascota } }
    ));
    return dataMascota;
}

export const buscaFamiliaAcogidaMascotaExistente = async (idMascota) => {
    const { data: dataMascota } = await apiFamiliaAcogida.familiaAcogidaMascotaControllerFind(JSON.stringify(
        { where: { idMascotaId: idMascota } }
    ));
    return dataMascota;
}

export const buscaProfesorMascotaExistente = async (idMascota) => {
    const { data: dataMascota } = await apiProfesorMascotaController.profesorMascotaControllerFind(JSON.stringify(
        { where: { mascotaId: idMascota } }
    ));
    return dataMascota;

}

export const buscaTutorMascotaExistente = async (idMascota) => {
    const { data: dataMascota } = await apiTutorMascotaController.tutorMascotaControllerFind(JSON.stringify(
        { where: { mascotaId: idMascota } }
    ));
    return dataMascota;

}
