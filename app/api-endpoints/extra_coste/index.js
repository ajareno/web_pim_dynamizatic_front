import {  ExtraCosteControllerApi, settings } from "@/app/api-nathalie";

const apiExtraCoste = new ExtraCosteControllerApi(settings);

export const getExtraCostes = async (filtro) => {
    const { data: dataExtraCostes } = await apiExtraCoste.extraCosteControllerFind(filtro);
    return dataExtraCostes;
};

export const postExtraCoste = async (objExtraCoste) => {
    const { data: dataExtraCoste } = await apiExtraCoste.extraCosteControllerCreate(objExtraCoste);
    return dataExtraCoste;
};

export const patchExtraCoste = async (idExtraCoste, objExtraCoste) => {
    const { data: dataExtraCoste } = await apiExtraCoste.extraCosteControllerUpdateById(idExtraCoste, objExtraCoste);
    return dataExtraCoste;
};

export const deleteExtraCoste = async (idExtraCoste) => {
    const { data: dataExtraCoste } = await apiExtraCoste.extraCosteControllerDeleteById(idExtraCoste);
    return dataExtraCoste;
};