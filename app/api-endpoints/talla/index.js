import { TallaControllerApi, settings } from "@/app/api-nathalie";

const apiTalla = new TallaControllerApi(settings);

export const getTallas = async (filtro) => {
    const { data: dataTallas } = await apiTalla.tallaControllerFind(filtro);
    return dataTallas;
};
export const getTalla = async (filtro) => {
    const { data: dataTallas } = await apiTalla.tallaControllerFindById(filtro);
    return dataTallas;
};
export const getTallasCount = async (filtro) => {
    const { data: dataTallas } = await apiTalla.tallaControllerCount(filtro);
    return dataTallas;
};

export const postTalla = async (objTalla) => {
    const { data: dataTalla } = await apiTalla.tallaControllerCreate(objTalla);
    return dataTalla;
};

export const patchTalla = async (idTalla, objTalla) => {
    const { data: dataTalla } = await apiTalla.tallaControllerUpdateById(idTalla, objTalla);
    return dataTalla;
};

export const deleteTalla = async (idTalla) => {
    const { data: dataTalla } = await apiTalla.tallaControllerDeleteById(idTalla);
    return dataTalla;
};
