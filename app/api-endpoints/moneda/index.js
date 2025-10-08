import { MonedaControllerApi, EmpresaControllerApi, settings } from "@/app/api-nathalie";

const apiMoneda = new MonedaControllerApi(settings)
const apiEmpresa = new EmpresaControllerApi(settings)


export const getMonedas = async (filtro) => {
    const { data: dataMonedas } = await apiMoneda.monedaControllerFind(filtro)
    return dataMonedas
}

export const getMonedasCount = async (filtro) => {
    const { data: dataMonedas } = await apiMoneda.monedaControllerCount(filtro)
    return dataMonedas
}

export const postMoneda = async (objMoneda) => {
    const { data: dataMoneda } = await apiMoneda.monedaControllerCreate(objMoneda)
    return dataMoneda
}

export const patchMoneda = async (idMoneda, objMoneda) => {
    const { data: dataMoneda } = await apiMoneda.monedaControllerUpdateById(idMoneda, objMoneda)
    return dataMoneda
}

export const deleteMoneda = async (idMoneda) => {
    const { data: dataMoneda } = await apiMoneda.monedaControllerDeleteById(idMoneda)
    return dataMoneda
}
// Función para filtrar mediante EmpresaControllerApi los id coincidentes con el id que le pasemos por parámetro
// Nos devolverá un array en la que cada posición contiene toda la información del objeto con cada registro coincidente que encuentre y que convertiremos a json con el método .stringify 
export const buscaEmpresaExistente = async (idMoneda) => {
    const { data: dataMoneda } = await apiEmpresa.empresaControllerFind(JSON.stringify(
        { where: { monedaId: idMoneda } }
    ));
    return dataMoneda;
};



