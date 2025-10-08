import { DietaControllerApi, settings } from "@/app/api-nathalie";

const apiDieta = new DietaControllerApi(settings);

export const getDietas = async (filtro) => {
    const { data: dataDietas } = await apiDieta.dietaControllerFind(filtro);
    return dataDietas;
};
export const getDieta = async (filtro) => {
    const { data: dataDietas } = await apiDieta.dietaControllerFindById(filtro);
    return dataDietas;
};
export const getDietasCount = async (filtro) => {
    const { data: dataDietas } = await apiDieta.dietaControllerCount(filtro);
    return dataDietas;
};

export const postDieta = async (objDieta) => {

    const { data: dataDieta } = await apiDieta.dietaControllerCreate(objDieta);
    return dataDieta;

};

export const patchDieta = async (idDieta, objDieta) => {
    const { data: dataDieta } = await apiDieta.dietaControllerUpdateById(idDieta, objDieta);
    return dataDieta;
};

export const deleteDieta = async (idDieta) => {
    const { data: dataDieta } = await apiDieta.dietaControllerDeleteById(idDieta);
    return dataDieta;
};
