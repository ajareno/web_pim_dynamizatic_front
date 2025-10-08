import { CuentaBancariaControllerApi, settings } from "@/app/api-nathalie";
const apiCuentaBancaria = new CuentaBancariaControllerApi(settings)

export const getCuentaBancarias = async (filtro) => {
    const { data: dataCuentaBancarias } = await apiCuentaBancaria.cuentaBancariaControllerFind(filtro)
    return dataCuentaBancarias
}

export const getCuentaBancariasCount = async (filtro) => {
    const { data: dataCuentaBancarias } = await apiCuentaBancaria.cuentaBancariaControllerCount(filtro)
    return dataCuentaBancarias
}

export const postCuentaBancaria = async (objCuentaBancaria) => {
    const { data: dataCuentaBancaria } = await apiCuentaBancaria.cuentaBancariaControllerCreate(objCuentaBancaria)
    return dataCuentaBancaria
}

export const patchCuentaBancaria = async (idCuentaBancaria, objCuentaBancaria) => {
    const { data: dataCuentaBancaria } = await apiCuentaBancaria.cuentaBancariaControllerUpdateById(idCuentaBancaria, objCuentaBancaria)
    return dataCuentaBancaria
}

export const deleteCuentaBancaria = async (idCuentaBancaria) => {
    const { data: dataCuentaBancaria } = await apiCuentaBancaria.cuentaBancariaControllerDeleteById(idCuentaBancaria)
    return dataCuentaBancaria
}