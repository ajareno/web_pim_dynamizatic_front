"use client";
import { getVistaEmpresaRol, getVistaEmpresaRolCount, deleteRol, getPrueba, getPruebaCount } from "@/app/api-endpoints/rol";
import EditarRoles from "./editar";
import Crud from "../../../components/shared/crud";
import { useIntl } from 'react-intl'
import { getUsuarioSesion } from "@/app/utility/Utils";
const Rol = () => {
    const intl = useIntl();
    const columnas = [
 
        { campo: 'nombre', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
        { campo: 'descripcion', header: intl.formatMessage({ id: 'Descripcion' }), tipo: 'string' },
    ]

    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Roles' })}
                getRegistros={getPrueba}
                getRegistrosCount={getPruebaCount}
                botones={['nuevo','ver', 'editar', 'eliminar', 'descargarCSV']}
                controlador={"Prueba"}
                editarComponente={<EditarRoles />}
                columnas={columnas}
                deleteRegistro={deleteRol}
            />
        </div>
    );
};
export default Rol;