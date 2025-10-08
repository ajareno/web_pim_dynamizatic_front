import { FamiliaAcogidaAlergiaControllerApi, FamiliaAcogidaControllerApi, FamiliaAcogidaEnfermedadControllerApi, FamiliaAcogidaHobbieControllerApi, FamiliaAcogidaMascotaControllerApi, FamiliaAcogidaBonusControllerApi, settings } from "@/app/api-nathalie";
const apiFamiliaAcogida = new FamiliaAcogidaControllerApi(settings)
const apiFamiliaAcogidaAlergia = new FamiliaAcogidaAlergiaControllerApi(settings)
const apiFamiliaAcogidaMascota = new FamiliaAcogidaMascotaControllerApi(settings)
const apiFamiliaAcogidaEnfermedad = new FamiliaAcogidaEnfermedadControllerApi(settings)
const apiFamiliaAcogidaHobbie = new FamiliaAcogidaHobbieControllerApi(settings)
const apiFamiliaAcogidaBonus = new FamiliaAcogidaBonusControllerApi(settings)

export const getFamiliasAcogida = async (filtro) => {
    const { data: dataFamiliasAcogida } = await apiFamiliaAcogida.familiaAcogidaControllerFind(filtro)
    return dataFamiliasAcogida
}

export const getFamiliasAcogidaCount = async (filtro) => {
    const { data: dataFamiliasAcogida } = await apiFamiliaAcogida.familiaAcogidaControllerCount(filtro)
    return dataFamiliasAcogida
}

export const getVistaFamiliasAcogidaUsuario = async (filtro) => {
    const { data: dataFamiliasAcogida } = await apiFamiliaAcogida.familiaAcogidaControllerVistaFamiliaAcogidaUsuario(filtro)
    return dataFamiliasAcogida
}

export const getVistaFamiliasAcogidaUsuarioCount = async (filtro) => {
    const { data: dataFamiliasAcogida } = await apiFamiliaAcogida.familiaAcogidaControllerVistaFamiliaAcogidaUsuarioCount(filtro)
    return dataFamiliasAcogida
}

export const postFamiliaAcogida = async (objFamiliaAcogida) => {
    const { data: dataFamiliaAcogida } = await apiFamiliaAcogida.familiaAcogidaControllerCreate(objFamiliaAcogida)
    return dataFamiliaAcogida
}

export const patchFamiliaAcogida = async (idFamiliaAcogida, objFamiliaAcogida) => {
    const { data: dataFamiliaAcogida } = await apiFamiliaAcogida.familiaAcogidaControllerUpdateById(idFamiliaAcogida, objFamiliaAcogida)
    return dataFamiliaAcogida
}

export const deleteFamiliaAcogida = async (idFamiliaAcogida) => {
    const { data: dataFamiliaAcogida } = await apiFamiliaAcogida.familiaAcogidaControllerDeleteById(idFamiliaAcogida)
    return dataFamiliaAcogida
}

export const getFamiliaAcogidaAlergias = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiFamiliaAcogidaAlergia.familiaAcogidaAlergiaControllerFind(filtro)
    return dataCentrosEscolares
}

export const getFamiliaAcogidaMascotas = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiFamiliaAcogidaMascota.familiaAcogidaMascotaControllerFind(filtro)
    return dataCentrosEscolares
}

export const getFamiliaAcogidaHobbies = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiFamiliaAcogidaHobbie.familiaAcogidaHobbieControllerFind(filtro)
    return dataCentrosEscolares
}

export const getFamiliaAcogidaEnfermedades = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiFamiliaAcogidaEnfermedad.familiaAcogidaEnfermedadControllerFind(filtro)
    return dataCentrosEscolares
}

export const postFamiliaAcogidaAlergia = async (objFamiliaAcogidaAlergia) => {
    const { data: dataFamiliaAcogidaAlergia } = await apiFamiliaAcogidaAlergia.familiaAcogidaAlergiaControllerCreate(objFamiliaAcogidaAlergia)
    return dataFamiliaAcogidaAlergia
}

export const postFamiliaAcogidaMascota = async (objFamiliaAcogidaMascota) => {
    const { data: dataFamiliaAcogidaMascota } = await apiFamiliaAcogidaMascota.familiaAcogidaMascotaControllerCreate(objFamiliaAcogidaMascota)
    return dataFamiliaAcogidaMascota
}

export const postFamiliaAcogidaHobbie = async (objFamiliaAcogidaHobbie) => {
    const { data: dataFamiliaAcogidaHobbie } = await apiFamiliaAcogidaHobbie.familiaAcogidaHobbieControllerCreate(objFamiliaAcogidaHobbie)
    return dataFamiliaAcogidaHobbie
}

export const postFamiliaAcogidaEnfermedad = async (objFamiliaAcogidaEnfermedad) => {
    const { data: dataFamiliaAcogidaEnfermedad } = await apiFamiliaAcogidaEnfermedad.familiaAcogidaEnfermedadControllerCreate(objFamiliaAcogidaEnfermedad)
    return dataFamiliaAcogidaEnfermedad
}

export const patchFamiliaAcogidaAlergia = async (idFamiliaAcogidaAlergia, objFamiliaAcogidaAlergia) => {
    const { data: dataFamiliaAcogidaAlergia } = await apiFamiliaAcogidaAlergia.familiaAcogidaAlergiaControllerUpdateById(idFamiliaAcogidaAlergia, objFamiliaAcogidaAlergia)
    return dataFamiliaAcogidaAlergia
}

export const patchFamiliaAcogidaMascota = async (idFamiliaAcogidaMascota, objFamiliaAcogidaMascota) => {
    const { data: dataFamiliaAcogidaMascota } = await apiFamiliaAcogidaMascota.familiaAcogidaMascotaControllerUpdateById(idFamiliaAcogidaMascota, objFamiliaAcogidaMascota)
    return dataFamiliaAcogidaMascota
}

export const patchFamiliaAcogidaHobbie = async (idFamiliaAcogidaHobbie, objFamiliaAcogidaHobbie) => {
    const { data: dataFamiliaAcogidaHobbie } = await apiFamiliaAcogidaHobbie.familiaAcogidaHobbieControllerUpdateById(idFamiliaAcogidaHobbie, objFamiliaAcogidaHobbie)
    return dataFamiliaAcogidaHobbie
}

export const patchFamiliaAcogidaEnfermedad = async (idFamiliaAcogidaEnfermedad, objFamiliaAcogidaEnfermedad) => {
    const { data: dataFamiliaAcogidaEnfermedad } = await apiFamiliaAcogidaEnfermedad.familiaAcogidaEnfermedadControllerUpdateById(idFamiliaAcogidaEnfermedad, objFamiliaAcogidaEnfermedad)
    return dataFamiliaAcogidaEnfermedad
}

export const deleteFamiliaAcogidaAlergia = async (idFamiliaAcogidaAlergia) => {
    const { data: dataFamiliaAcogidaAlergia } = await apiFamiliaAcogidaAlergia.familiaAcogidaAlergiaControllerDeleteById(idFamiliaAcogidaAlergia)
    return dataFamiliaAcogidaAlergia
}

export const deleteFamiliaAcogidaMascota = async (idFamiliaAcogidaMascota) => {
    const { data: dataFamiliaAcogidaMascota } = await apiFamiliaAcogidaMascota.familiaAcogidaMascotaControllerDeleteById(idFamiliaAcogidaMascota)
    return dataFamiliaAcogidaMascota
}

export const deleteFamiliaAcogidaHobbie = async (idFamiliaAcogidaHobbie) => {
    const { data: dataFamiliaAcogidaHobbie } = await apiFamiliaAcogidaHobbie.familiaAcogidaHobbieControllerDeleteById(idFamiliaAcogidaHobbie)
    return dataFamiliaAcogidaHobbie
}

export const deleteFamiliaAcogidaEnfermedad = async (idFamiliaAcogidaEnfermedad) => {
    const { data: dataFamiliaAcogidaEnfermedad } = await apiFamiliaAcogidaEnfermedad.familiaAcogidaEnfermedadControllerDeleteById(idFamiliaAcogidaEnfermedad)
    return dataFamiliaAcogidaEnfermedad
}

export const getFamiliaAcogidaBonuses = async (filtro) => {
    const { data: dataFamiliaAcogidaBonuses } = await apiFamiliaAcogidaBonus.familiaAcogidaBonusControllerFind(filtro)
    return dataFamiliaAcogidaBonuses
}

export const getFamiliaAcogidaBonusesCount = async (filtro) => {
    const { data: dataFamiliaAcogidaBonuses } = await apiFamiliaAcogidaBonus.familiaAcogidaBonusControllerCount(filtro)
    return dataFamiliaAcogidaBonuses
}

export const postFamiliaAcogidaBonus = async (objFamiliaAcogidaBonus) => {
    const { data: dataFamiliaAcogidaBonus } = await apiFamiliaAcogidaBonus.familiaAcogidaBonusControllerCreate(objFamiliaAcogidaBonus)
    return dataFamiliaAcogidaBonus
}

export const patchFamiliaAcogidaBonus = async (idFamiliaAcogidaBonus, objFamiliaAcogidaBonus) => {
    const { data: dataFamiliaAcogidaBonus } = await apiFamiliaAcogidaBonus.familiaAcogidaBonusControllerUpdateById(idFamiliaAcogidaBonus, objFamiliaAcogidaBonus)
    return dataFamiliaAcogidaBonus
}

export const deleteFamiliaAcogidaBonus = async (idFamiliaAcogidaBonus) => {
    const { data: dataFamiliaAcogidaBonus } = await apiFamiliaAcogidaBonus.familiaAcogidaBonusControllerDeleteById(idFamiliaAcogidaBonus)
    return dataFamiliaAcogidaBonus
}