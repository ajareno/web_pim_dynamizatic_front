"use client";
import { getLogAccesos, getLogAccesosCount, deleteLogAcceso, getEmpresasActivas, getUsuariosActivos } from "@/app/api-endpoints/log_acceso";
import EditarLogAcceso from "./editar";
import Crud from "../../../components/shared/crud";
import { useIntl } from 'react-intl'

const LogAcceso = () => {
    const intl = useIntl();

    const columnas = [
        { campo: 'nombre', header: intl.formatMessage({ id: 'Usuario' }), tipo: 'foraneo' },
        { campo: 'ipAddress', header: intl.formatMessage({ id: 'Dirección IP' }), tipo: 'string' },
        { campo: 'resultado', header: intl.formatMessage({ id: 'Resultado' }), tipo: 'string' },
        { campo: 'motivoFallo', header: intl.formatMessage({ id: 'Motivo Fallo' }), tipo: 'string' },
        { campo: 'fechaAcceso', header: intl.formatMessage({ id: 'Fecha Acceso' }), tipo: 'fechaHora' },
    ]

    const getRegistrosForaneos = {
        empresaId: getEmpresasActivas,
        usuarioId: getUsuariosActivos
    };

    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Log de Accesos' })}
                getRegistros={getLogAccesos}
                getRegistrosCount={getLogAccesosCount}
                filtradoBase={{
                    empresaId: Number(localStorage.getItem('empresa'))
                }}
                botones={['ver', 'descargarCSV']}
                controlador={"Logs de acceso"}
                editarComponente={<EditarLogAcceso />}
                columnas={columnas}
                deleteRegistro={deleteLogAcceso}
                getRegistrosForaneos={getRegistrosForaneos}
                mensajeEliminar="¿Está seguro de que desea eliminar este registro de acceso? Esta acción no se puede deshacer."
            />
        </div>
    );
};

export default LogAcceso;