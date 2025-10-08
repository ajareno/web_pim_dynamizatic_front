import { AgenteControllerApi, settings } from "@/app/api-nathalie";
const apiAgente = new AgenteControllerApi(settings);

export const getAgentes = async (filtro) => {
    const { data: dataAgentes } = await apiAgente.agenteControllerFind(filtro);
    return dataAgentes;
};

export const getAgentesCount = async (filtro) => {
    const { data: dataAgentes } = await apiAgente.agenteControllerCount(filtro);
    return dataAgentes;
};

export const postAgente = async (objAgente) => {
    const { data: dataAgente } = await apiAgente.agenteControllerCreate(objAgente);
    return dataAgente;
};

export const patchAgente = async (idAgente, objAgente) => {
    const { data: dataAgente } = await apiAgente.agenteControllerUpdateById(idAgente, objAgente);
    return dataAgente;
};

export const deleteAgente = async (idAgente) => {
    const { data: dataAgente } = await apiAgente.agenteControllerDeleteById(idAgente);
    return dataAgente;
};
