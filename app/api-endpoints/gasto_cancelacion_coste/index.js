import { GastoCancelacionCosteControllerApi, settings } from "@/app/api-nathalie";

const apiGastoCancelacionCoste = new GastoCancelacionCosteControllerApi(settings);

export const getGastoCancelacionCostes = async (filtro) => {
    const { data: dataGastoCancelacionCostes } = await apiGastoCancelacionCoste.gastoCancelacionCosteControllerFind(filtro);
    return dataGastoCancelacionCostes;
};

export const postGastoCancelacionCoste = async (objGastoCancelacionCoste) => {
    const { data: dataGastoCancelacionCoste } = await apiGastoCancelacionCoste.gastoCancelacionCosteControllerCreate(objGastoCancelacionCoste);
    return dataGastoCancelacionCoste;
};

export const patchGastoCancelacionCoste = async (idGastoCancelacionCoste, objGastoCancelacionCoste) => {
    const { data: dataGastoCancelacionCoste } = await apiGastoCancelacionCoste.gastoCancelacionCosteControllerUpdateById(idGastoCancelacionCoste, objGastoCancelacionCoste);
    return dataGastoCancelacionCoste;
};

export const deleteGastoCancelacionCoste = async (idGastoCancelacionCoste) => {
    const { data: dataGastoCancelacionCoste } = await apiGastoCancelacionCoste.gastoCancelacionCosteControllerDeleteById(idGastoCancelacionCoste);
    return dataGastoCancelacionCoste;
};