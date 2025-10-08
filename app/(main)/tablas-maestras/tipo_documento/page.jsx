"use client";
import { getVistaTipoDocumentoEmpresa, getVistaTipoDocumentoEmpresaCount, deleteTipoDocumento } from "@/app/api-endpoints/tipo_documento";
import EditarTipoDocumentos from "./editar";
import Crud from "../../../components/shared/crud";
import { useIntl } from 'react-intl'
import { getUsuarioSesion } from "@/app/utility/Utils";
const TipoDocumento = () => {
    const intl = useIntl()

    const columnas = [
 
        { campo: 'nombre', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
        //{ campo: 'codigo', header: intl.formatMessage({ id: 'Codigo' }), tipo: 'string' },
        { campo: 'activoSn', header: intl.formatMessage({ id: 'Activo' }), tipo: 'booleano' },
    ]

    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Tipos de documento' })}
                getRegistros={getVistaTipoDocumentoEmpresa}
                getRegistrosCount={getVistaTipoDocumentoEmpresaCount}
                botones={['nuevo','ver', 'editar', 'eliminar', 'descargarCSV']}
                controlador={"Tipos de documento"}
                filtradoBase={{empresaId: getUsuarioSesion()?.empresaId}}
                editarComponente={<EditarTipoDocumentos />}
                columnas={columnas}
                deleteRegistro={deleteTipoDocumento}
            />
        </div>
    );
};
export default TipoDocumento;