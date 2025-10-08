"use client";
import { getVistaPlanificadorCategoriaEmpresas, getVistaPlanificadorCategoriaEmpresasCount, deletePlanificadorCategoria } from "@/app/api-endpoints/planificador_categoria";
import EditarPlanificadorCategoria from "./editar";
import Crud from "../../../components/shared/crud";
import { useIntl } from 'react-intl'
import { getUsuarioSesion } from "@/app/utility/Utils";
const PlanificadorCategoria = () => {
    const intl = useIntl();
    const columnas = [
        { campo: 'nombre', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
        { campo: 'descripcion', header: intl.formatMessage({ id: 'Descripcion' }), tipo: 'string' },
    ]

    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Categoría del Planificador' })}
                getRegistros={getVistaPlanificadorCategoriaEmpresas}
                getRegistrosCount={getVistaPlanificadorCategoriaEmpresasCount}
                botones={['nuevo','ver', 'editar', 'eliminar', 'descargarCSV']}
                controlador={"Categorias del planificador"}
                filtradoBase={{empresaId: getUsuarioSesion()?.empresaId}}
                editarComponente={<EditarPlanificadorCategoria />}
                columnas={columnas}
                deleteRegistro={deletePlanificadorCategoria}
            />
        </div>
    );
};
export default PlanificadorCategoria;