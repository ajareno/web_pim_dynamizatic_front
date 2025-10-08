import { ComercialControllerApi, settings } from "@/app/api-nathalie";

const apiComercial = new ComercialControllerApi(settings);

export const getComerciales = async (filtro) => {
    const { data: dataComercial } = await apiComercial.comercialControllerFind(filtro);
    return dataComercial;
};

export const postComercial = async (objComercial) => {
    const { data: dataComerciales } = await apiComercial.comercialControllerCreate(objComercial);
    return dataComerciales;
};

export const deleteComercial = async (idComercial) => {
    const { data: dataComercial } = await apiComercial.comercialControllerDeleteById(idComercial);
    return dataComercial;
};

export const patchComercial = async (idComercial, objComercial) => {
    const { data: dataComercial } = await apiComercial.comercialControllerUpdateById(idComercial, objComercial);
    return dataComercial;
};
