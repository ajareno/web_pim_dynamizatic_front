import { ProfesorAlergiaControllerApi, ProfesorControllerApi, ProfesorEnfermedadControllerApi, ProfesorHobbieControllerApi, ProfesorMascotaControllerApi, settings } from "@/app/api-nathalie";
const apiProfesor = new ProfesorControllerApi(settings)
const apiProfesorAlergia = new ProfesorAlergiaControllerApi(settings)
const apiProfesorMascota = new ProfesorMascotaControllerApi(settings)
const apiProfesorEnfermedad = new ProfesorEnfermedadControllerApi(settings)
const apiProfesorHobbie = new ProfesorHobbieControllerApi(settings)

export const getProfesores = async (filtro) => {
    const { data: dataProfesores } = await apiProfesor.profesorControllerFind(filtro)
    return dataProfesores
}

export const getProfesoresCount = async (filtro) => {
    const { data: dataProfesores } = await apiProfesor.profesorControllerCount(filtro)
    return dataProfesores
}

export const getVistaUsuarioProfesor = async (filtro) => {
    const { data: dataProfesores } = await apiProfesor.profesorControllerVistaUsuarioProfesor(filtro)
    return dataProfesores
}

export const getVistaUsuarioProfesorCount = async (filtro) => {
    const { data: dataProfesores } = await apiProfesor.profesorControllerVistaUsuarioProfesorCount(filtro)
    return dataProfesores
}

export const postProfesor = async (objProfesor) => {
    const { data: dataProfesor } = await apiProfesor.profesorControllerCreate(objProfesor)
    return dataProfesor
}

export const patchProfesor = async (idProfesor, objProfesor) => {
    const { data: dataProfesor } = await apiProfesor.profesorControllerUpdateById(idProfesor, objProfesor)
    return dataProfesor
}

export const deleteProfesor = async (idProfesor) => {
    const { data: dataProfesor } = await apiProfesor.profesorControllerDeleteById(idProfesor)
    return dataProfesor
}


export const getProfesorAlergias = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiProfesorAlergia.profesorAlergiaControllerFind(filtro)
    return dataCentrosEscolares
}

export const getProfesorMascotas = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiProfesorMascota.profesorMascotaControllerFind(filtro)
    return dataCentrosEscolares
}

export const getProfesorHobbies = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiProfesorHobbie.profesorHobbieControllerFind(filtro)
    return dataCentrosEscolares
}

export const getProfesorEnfermedades = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiProfesorEnfermedad.profesorEnfermedadControllerFind(filtro)
    return dataCentrosEscolares
}

export const postProfesorAlergia = async (objProfesorAlergia) => {
    const { data: dataProfesorAlergia } = await apiProfesorAlergia.profesorAlergiaControllerCreate(objProfesorAlergia)
    return dataProfesorAlergia
}

export const postProfesorMascota = async (objProfesorMascota) => {
    const { data: dataProfesorMascota } = await apiProfesorMascota.profesorMascotaControllerCreate(objProfesorMascota)
    return dataProfesorMascota
}

export const postProfesorHobbie = async (objProfesorHobbie) => {
    const { data: dataProfesorHobbie } = await apiProfesorHobbie.profesorHobbieControllerCreate(objProfesorHobbie)
    return dataProfesorHobbie
}

export const postProfesorEnfermedad = async (objProfesorEnfermedad) => {
    const { data: dataProfesorEnfermedad } = await apiProfesorEnfermedad.profesorEnfermedadControllerCreate(objProfesorEnfermedad)
    return dataProfesorEnfermedad
}

export const patchProfesorAlergia = async (idProfesorAlergia, objProfesorAlergia) => {
    const { data: dataProfesorAlergia } = await apiProfesorAlergia.profesorAlergiaControllerUpdateById(idProfesorAlergia, objProfesorAlergia)
    return dataProfesorAlergia
}

export const patchProfesorMascota = async (idProfesorMascota, objProfesorMascota) => {
    const { data: dataProfesorMascota } = await apiProfesorMascota.profesorMascotaControllerUpdateById(idProfesorMascota, objProfesorMascota)
    return dataProfesorMascota
}

export const patchProfesorHobbie = async (idProfesorHobbie, objProfesorHobbie) => {
    const { data: dataProfesorHobbie } = await apiProfesorHobbie.profesorHobbieControllerUpdateById(idProfesorHobbie, objProfesorHobbie)
    return dataProfesorHobbie
}

export const patchProfesorEnfermedad = async (idProfesorEnfermedad, objProfesorEnfermedad) => {
    const { data: dataProfesorEnfermedad } = await apiProfesorEnfermedad.profesorEnfermedadControllerUpdateById(idProfesorEnfermedad, objProfesorEnfermedad)
    return dataProfesorEnfermedad
}

export const deleteProfesorAlergia = async (idProfesorAlergia) => {
    const { data: dataProfesorAlergia } = await apiProfesorAlergia.profesorAlergiaControllerDeleteById(idProfesorAlergia)
    return dataProfesorAlergia
}

export const deleteProfesorMascota = async (idProfesorMascota) => {
    const { data: dataProfesorMascota } = await apiProfesorMascota.profesorMascotaControllerDeleteById(idProfesorMascota)
    return dataProfesorMascota
}

export const deleteProfesorHobbie = async (idProfesorHobbie) => {
    const { data: dataProfesorHobbie } = await apiProfesorHobbie.profesorHobbieControllerDeleteById(idProfesorHobbie)
    return dataProfesorHobbie
}

export const deleteProfesorEnfermedad = async (idProfesorEnfermedad) => {
    const { data: dataProfesorEnfermedad } = await apiProfesorEnfermedad.profesorEnfermedadControllerDeleteById(idProfesorEnfermedad)
    return dataProfesorEnfermedad
}

