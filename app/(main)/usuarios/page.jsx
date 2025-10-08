"use client";
import { deleteUsuario, getUsuarios, getUsuariosCount } from "@/app/api-endpoints/usuario";
import Crud from "../../components/shared/crud";
import EditarUsuario from "./editar";
import { useIntl } from 'react-intl'
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getUsuarioSesion } from "@/app/utility/Utils";
import { useState, useEffect, useRef } from "react";

const Usuario = () => {
    const intl = useIntl();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [idUsuario, setIdUsuario] = useState(parseInt(searchParams.get("usuario") || localStorage.getItem("usuarioId")));

    const columnas = [
        
        { campo: 'rol_id', header: intl.formatMessage({ id: 'Rol' }), tipo: 'string' },
        { campo: 'nombre', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
        { campo: 'mail', header: intl.formatMessage({ id: 'Email' }), tipo: 'string' },
        { campo: 'telefono', header: intl.formatMessage({ id: 'Telefono' }), tipo: 'string' },
    ]
    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Usuarios' })}
                getRegistros={getUsuarios}
                getRegistrosCount={getUsuariosCount}
                botones={['nuevo', 'editar', 'eliminar', 'descargarCSV']}
                filtradoBase={{
                    empresa_id: Number(localStorage.getItem('empresa'))
                }}
                controlador={"Usuarios"}
                registroEditar={idUsuario}
                editarComponente={<EditarUsuario />}
                seccion={"Usuario"}
                columnas={columnas}
                deleteRegistro={deleteUsuario}
            />
        </div>
    );
};
export default Usuario;