"use client";
import { deleteEmpresa, getEmpresas, getEmpresasCount } from "@/app/api-endpoints/empresa";
import Crud from "../../components/shared/crud";
import EditarEmpresa from "./editar";
import { useIntl } from 'react-intl'
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getUsuarioSesion } from "@/app/utility/Utils";
import { useState, useEffect, useRef } from "react";

const Empresa = () => {
    const intl = useIntl();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [idEmpresa, setIdEmpresa] = useState(parseInt(searchParams.get("empresa") || "0"));

    const columnas = [
        { campo: 'codigo', header: intl.formatMessage({ id: 'Código' }), tipo: 'string' },
        { campo: 'nombre', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
        { campo: 'activoSn', header: intl.formatMessage({ id: 'Activo' }), tipo: 'booleano' },
    ]
    
    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Empresas' })}
                getRegistros={getEmpresas}
                getRegistrosCount={getEmpresasCount}
                botones={['nuevo', 'editar', 'eliminar', 'descargarCSV']}
                controlador={"Empresas"}
                registroEditar={idEmpresa}
                editarComponente={<EditarEmpresa />}
                seccion={"Empresa"}
                columnas={columnas}
                deleteRegistro={deleteEmpresa}
            />
        </div>
    );
};
export default Empresa;