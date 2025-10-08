import { AcompanyanteControllerApi, settings } from "@/app/api-nathalie";
const apiAcompanyante = new AcompanyanteControllerApi(settings);

export const getAcompanyantes = async (filtro) => {
    const { data: dataAcompanyantes } = await apiAcompanyante.acompanyanteControllerFind(filtro);
    return dataAcompanyantes;
};

export const getAcompanyantesCount = async (filtro) => {
    const { data: dataAcompanyantes } = await apiAcompanyante.acompanyanteControllerCount(filtro);
    return dataAcompanyantes;
};

export const postAcompanyante = async (objAcompanyante) => {
    const { data: dataAcompanyante } = await apiAcompanyante.acompanyanteControllerCreate(objAcompanyante);
    return dataAcompanyante;
};

export const patchAcompanyante = async (idAcompanyante, objAcompanyante) => {
    const { data: dataAcompanyante } = await apiAcompanyante.acompanyanteControllerUpdateById(idAcompanyante, objAcompanyante);
    return dataAcompanyante;
};

export const deleteAcompanyante = async (idAcompanyante) => {
    const { data: dataAcompanyante } = await apiAcompanyante.acompanyanteControllerDeleteById(idAcompanyante);
    return dataAcompanyante;
};


export const getVistaAcompanyanteAlumno = async (filtro) => {
    const { data: dataAcompanyante } = await apiAcompanyante.acompanyanteControllerVistaAcompanyanteAlumno(filtro)
    return dataAcompanyante
}

export const getVistaAcompanyanteAlumnoCount = async (filtro) => {
    const { data: dataAcompanyante } = await apiAcompanyante.acompanyanteControllerVistaAcompanyanteAlumnoCount(filtro)
    return dataAcompanyante
}
