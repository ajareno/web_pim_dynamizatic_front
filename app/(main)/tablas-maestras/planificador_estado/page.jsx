"use client";
import { getVistaPlanificadorEstadoEmpresa, getVistaPlanificadorEstadoEmpresaCount, deletePlanificadorEstado } from "@/app/api-endpoints/planificador_estado";
import EditarPlanificadorEstado from "./editar";
import Crud from "../../../components/shared/crud";
import { useIntl } from 'react-intl'
import { getUsuarioSesion } from "@/app/utility/Utils";
const PlanificadorEstado = () => {
    const intl = useIntl();
    const columnas = [
 
        { campo: 'nombre', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
        { campo: 'activoSn', header: intl.formatMessage({ id: 'Activo' }), tipo: 'booleano' },
    ]

    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Estados del planificador' })}
                getRegistros={getVistaPlanificadorEstadoEmpresa}
                getRegistrosCount={getVistaPlanificadorEstadoEmpresaCount}
                botones={['nuevo','ver', 'editar', 'eliminar', 'descargarCSV']}
                controlador={"Estados del planificador"}
                filtradoBase={{empresaId: getUsuarioSesion()?.empresaId}}
                editarComponente={<EditarPlanificadorEstado />}
                columnas={columnas}
                deleteRegistro={deletePlanificadorEstado}
            />
        </div>
    );
};
export default PlanificadorEstado;