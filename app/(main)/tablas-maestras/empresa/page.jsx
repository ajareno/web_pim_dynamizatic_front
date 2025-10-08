"use client";
import { getVistaEmpresaMoneda, getVistaEmpresaMonedaCount, deleteEmpresa } from "@/app/api-endpoints/empresa";
import { getMonedas } from "@/app/api-endpoints/moneda";
import EditarEmpresa from "./editar";
import Crud from "../../../components/shared/crud";
import { useIntl } from 'react-intl'

const Empresa = () => {
    const intl = useIntl()
    const columnas = [
        { campo: 'codigo', header: intl.formatMessage({ id: 'Codigo' }), tipo: 'string' },
        { campo: 'nombre', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
        { campo: 'nombreMoneda', header: intl.formatMessage({ id: 'Moneda' }), tipo: 'foraneo' },
        { campo: 'descripcion', header: intl.formatMessage({ id: 'Descripcion' }), tipo: 'string' },
        { campo: 'imagen', header: intl.formatMessage({ id: 'Imagen' }), tipo: 'imagen' },
        { campo: 'logo', header: intl.formatMessage({ id: 'Logo' }), tipo: 'imagen' },
        { campo: 'activoSn', header: intl.formatMessage({ id: 'Activo' }), tipo: 'booleano' },
    ]

    // Esta función transforma los registros para su exportación en formato CSV,
    // Permite asignar nombres personalizados a las columnas existentes y agregar nuevas columnas calculadas según las necesidades.
    const procesarDatosParaCSV = (registros) => {
        return registros.map(registro => {
            return {
                [intl.formatMessage({ id: 'Codigo' })]: registro.codigo,
                [intl.formatMessage({ id: 'Nombre' })]: registro.nombre,
                [intl.formatMessage({ id: 'Moneda' })]: registro.nombreMoneda,
                [intl.formatMessage({ id: 'Descripcion' })]: registro.descripcion,
                [intl.formatMessage({ id: 'Activo' })]: registro.activoSn,
            };
        });
    };

    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Empresas' })}
                seccion={"Empresa"}
                getRegistros={getVistaEmpresaMoneda}
                getRegistrosCount={getVistaEmpresaMonedaCount}
                getRegistrosForaneos={{ 'nombreMoneda': getMonedas }}
                botones={['nuevo','ver', 'editar', 'eliminar', 'descargarCSV']}
                controlador={"Empresas"}
                empresaId={null}
                editarComponente={<EditarEmpresa />}
                columnas={columnas}
                deleteRegistro={deleteEmpresa}
                procesarDatosParaCSV={procesarDatosParaCSV}
            />
        </div>
    );
};
export default Empresa;