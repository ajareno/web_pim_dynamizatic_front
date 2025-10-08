"use client";
import { getSecciones, getSeccionesCount, deleteSeccion } from "@/app/api-endpoints/seccion";
import EditarSeccion from "./editar";
import Crud from "../../../components/shared/crud";
import { useIntl } from 'react-intl'
const Seccion = () => {
    const intl = useIntl();
    const columnas = [
        { campo: 'nombre', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
    ]

    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Secciones' })}
                getRegistros={getSecciones}
                getRegistrosCount={getSeccionesCount}
                botones={['nuevo','ver', 'editar', 'eliminar', 'descargarCSV']}
                controlador={"Secciones"}
                filtradoBase={{empresa_id: Number(localStorage.getItem('empresa'))}}
                editarComponente={<EditarSeccion />}
                columnas={columnas}
                deleteRegistro={deleteSeccion}
            />
        </div>
    );
};
export default Seccion;